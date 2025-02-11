

import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface Order {
  id: string;
  client_id: string;
  items: { name: string; quantity: number; price: number }[];
  status: string;
  delivery_date: string;
  total_amount: number;
  paid_amount: number;
  remaining_amount: number;
  urgent: boolean;
  notes: string;
}

export default async function Dashboard() {
  const supabase = await createClient()

  try {
    // Fetch all orders from the database
    const { data: orders, error } = await supabase
      .from("orders")
      .select("*")
      .order("delivery_date", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return (
      <div>
        <h1>Orders Dashboard</h1>
        {orders?.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map((order: Order) => (
              <li key={order.id} className="order-card">
                <h2>Order ID: {order.id}</h2>
                <p><strong>Client ID:</strong> {order.client_id}</p>
                <p><strong>Status:</strong> {order.status}</p>
                
                <p><strong>Total Amount:</strong> £{order.total_amount}</p>
                <p><strong>Paid Amount:</strong> £{order.paid_amount}</p>
                <p><strong>Remaining Amount:</strong> £{order.remaining_amount}</p>
                <p><strong>Urgent:</strong> {order.urgent ? "Yes" : "No"}</p>
                <p><strong>Notes:</strong> {order.notes || "No notes provided"}</p>
                <div>
                  <h3>Items:</h3>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - Quantity: {item.quantity}, Price: £{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return <p>Error loading orders. Please try again later.</p>;
  }
}

