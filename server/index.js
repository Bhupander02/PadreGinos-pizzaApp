
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pizzaapp';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Auth config
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('⚠️  JWT_SECRET is not set. Set it in your environment for production use.');
}
const EFFECTIVE_JWT_SECRET = JWT_SECRET || 'dev-only-insecure-secret-change-me';
const JWT_EXPIRES_IN = '7d';

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

function signToken(user) {
  return jwt.sign({ userId: user._id }, EFFECTIVE_JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email };
}

// Auth middleware — attaches req.user if a valid token is present, else 401
async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    const decoded = jwt.verify(token, EFFECTIVE_JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired session' });
  }
}

// Order Schema
const orderSchema = new mongoose.Schema({
  cart: [{
    pizza: {
      id: String,
      name: String,
      description: String,
      image: String,
      sizes: Object
    },
    size: String,
    price: String
  }],
  total: Number,
  date: {
    type: Date,
    default: Date.now
  },
  orderNumber: String
});

const Order = mongoose.model('Order', orderSchema);

// Pizza Data (In production, this could also be in MongoDB)
const pizzas = [
  {
    id: "pepperoni",
    name: "The Pepperoni Pizza",
    description: "Mozzarella Cheese, Pepperoni",
    image: "/pizzas/pepperoni.jpg",
    sizes: { S: 250, M: 350, L: 450 }
  },
  {
    id: "hawaiian",
    name: "The Hawaiian Pizza",
    description: "Sliced Ham, Pineapple, Mozzarella Cheese",
    image: "/pizzas/hawaiian.jpg",
    sizes: { S: 280, M: 380, L: 480 }
  },
  {
    id: "veggie",
    name: "The Veggie Pizza",
    description: "Mushrooms, Bell Peppers, Onions, Olives",
    image: "/pizzas/veggie.jpg",
    sizes: { S: 230, M: 330, L: 430 }
  },
  {
    id: "margherita",
    name: "The Margherita Pizza",
    description: "Tomato Sauce, Mozzarella, Fresh Basil",
    image: "/pizzas/margherita.jpg",
    sizes: { S: 220, M: 320, L: 420 }
  },
  {
    id: "bbq_chicken",
    name: "BBQ Chicken Pizza",
    description: "BBQ Sauce, Chicken, Red Onions, Cilantro",
    image: "/pizzas/bbq_chicken.jpg",
    sizes: { S: 300, M: 400, L: 500 }
  },
  {
    id: "meat_lovers",
    name: "Meat Lovers Pizza",
    description: "Pepperoni, Sausage, Bacon, Ham",
    image: "/pizzas/meat_lovers.jpg",
    sizes: { S: 320, M: 420, L: 520 }
  }
];

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'A valid email is required' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name: name.trim(), email: email.toLowerCase().trim(), passwordHash });
    await user.save();

    const token = signToken(user);
    res.status(201).json({ success: true, token, user: publicUser(user) });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Failed to create account' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = signToken(user);
    res.json({ success: true, token, user: publicUser(user) });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Failed to log in' });
  }
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  res.json({ success: true, user: publicUser(req.user) });
});

// Routes
app.get('/api/pizzas', (req, res) => {
  res.json(pizzas);
});

app.post('/api/order', async (req, res) => {
  try {
    const { cart } = req.body;
    
    // Calculate total
    const total = cart.reduce((sum, item) => {
      return sum + (item.pizza.sizes[item.size] || 0);
    }, 0);

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const order = new Order({
      cart,
      total,
      orderNumber
    });

    await order.save();

    res.json({
      success: true,
      message: 'Order placed successfully!',
      orderNumber,
      total
    });
  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to place order'
    });
  }
});

app.get('/api/past-orders', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const formattedOrders = orders.map(order => ({
      order_id: order.orderNumber,
      date: new Date(order.date).toLocaleDateString('en-IN'),
      time: new Date(order.date).toLocaleTimeString('en-IN'),
      total: order.total,
      items: order.cart.length
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error('Past orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', mongodb: mongoose.connection.readyState === 1 });
});

app.listen(PORT, () => {
  console.log(`🍕 Pizza API running on http://localhost:${PORT}`);
});
