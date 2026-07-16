import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Pizza, History, Flame, Truck, Leaf, Star } from 'lucide-react';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

const gallery = [
  { name: "Margherita", image: "/pizzas/margherita.jpg" },
  { name: "Pepperoni", image: "/pizzas/pepperoni.jpg" },
  { name: "BBQ Chicken", image: "/pizzas/bbq_chicken.jpg" },
  { name: "Hawaiian", image: "/pizzas/hawaiian.jpg" },
  { name: "Meat Lovers", image: "/pizzas/meat_lovers.jpg" },
  { name: "Veggie Supreme", image: "/pizzas/veggie.jpg" },
];

function Index() {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-text">
          <div className="index-brand">
            <h1>Padre Gino's</h1>
            <p>Artisan Pizza Delivered Fresh</p>
          </div>
          <ul>
            <li>
              <Link to="/order">
                <Pizza size={24} style={{ marginRight: '0.5rem', display: 'inline' }} />
                Order Now
              </Link>
            </li>
            <li>
              <Link to="/past">
                <History size={24} style={{ marginRight: '0.5rem', display: 'inline' }} />
                Order History
              </Link>
            </li>
          </ul>
        </div>

        <div className="hero-collage">
          <img className="collage-img collage-1" src="/pizzas/meat_lovers.jpg" alt="Meat Lovers Pizza" />
          <img className="collage-img collage-2" src="/pizzas/margherita.jpg" alt="Margherita Pizza" />
          <img className="collage-img collage-3" src="/pizzas/pepperoni.jpg" alt="Pepperoni Pizza" />
        </div>
      </div>

      <section className="home-features">
        <div className="feature-item">
          <Flame size={28} />
          <div>
            <h4>Wood-Fired</h4>
            <p>Baked fresh in a real wood oven</p>
          </div>
        </div>
        <div className="feature-item">
          <Leaf size={28} />
          <div>
            <h4>Fresh Ingredients</h4>
            <p>Sourced daily, never frozen</p>
          </div>
        </div>
        <div className="feature-item">
          <Truck size={28} />
          <div>
            <h4>Fast Delivery</h4>
            <p>Hot at your door, every time</p>
          </div>
        </div>
        <div className="feature-item">
          <Star size={28} />
          <div>
            <h4>Top Rated</h4>
            <p>Loved by pizza lovers everywhere</p>
          </div>
        </div>
      </section>

      <section className="home-gallery">
        <h2>Crowd Favorites</h2>
        <div className="gallery-grid">
          {gallery.map((item) => (
            <Link to="/order" key={item.name} className="gallery-card">
              <img src={item.image} alt={item.name} loading="lazy" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
