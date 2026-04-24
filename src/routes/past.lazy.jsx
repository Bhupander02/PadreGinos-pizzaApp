import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getPastOrder from '../api/getPastOrder';
import { ChevronLeft, ChevronRight, Receipt } from 'lucide-react';

export const Route = createLazyFileRoute('/past')({
  component: PastOrderRoute,
});

function PastOrderRoute() {
  const [page, setPage] = useState(1);
  const { isLoading, data, isError } = useQuery({
    queryKey: ['past-orders', page],
    queryFn: () => getPastOrder(page),
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <h3>Loading your orders...</h3>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='past-orders'>
        <h2>Order History</h2>
        <div className="empty-cart">
          <Receipt size={64} style={{ opacity: 0.3, margin: '0 auto' }} />
          <p>Failed to load orders</p>
          <p style={{ fontSize: '0.9rem' }}>Please try again later</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className='past-orders'>
        <h2>Order History</h2>
        <div className="empty-cart">
          <Receipt size={64} style={{ opacity: 0.3, margin: '0 auto' }} />
          <p>No orders yet</p>
          <p style={{ fontSize: '0.9rem' }}>Start ordering some delicious pizzas!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="past-orders">
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Items</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td style={{ fontWeight: 600, color: 'var(--primary)' }}>
                {order.order_id}
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
              <td>{order.items}</td>
              <td style={{ fontWeight: 600, color: 'var(--accent)' }}>
                ₹{order.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button 
          disabled={page <= 1} 
          onClick={() => setPage(page - 1)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <ChevronLeft size={20} />
          Previous
        </button>
        <div>{page}</div>
        <button 
          disabled={data.length < 10} 
          onClick={() => setPage(page + 1)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          Next
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
