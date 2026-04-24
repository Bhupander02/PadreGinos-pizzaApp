import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default async function getPastOrder(page) {
  try {
    const response = await axios.get(`${API_URL}/api/past-orders?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch past orders:', error);
    throw error;
  }
}
