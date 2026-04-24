
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

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
