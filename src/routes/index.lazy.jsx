import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Pizza, History } from 'lucide-react';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='index'>
      <div className='index-brand'>
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
  );
}
