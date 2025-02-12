

import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';


export default async function Dashboard() {
  const supabase = await createClient()
  const {data:clients, error:authError} = await supabase.auth.getUser();

  if (authError || !clients?.user){
    redirect('/login')
  }
    try {
    // Fetch all clients from the database
    const { data: clients, error } = await supabase
      .from("clients")
      .select("*")
      
    if (error) {
      throw new Error(error.message);
    }

    return (
      <div>
        <h1>clients Dashboard</h1>
        {clients?.length === 0 ? (
          <p>No clients found.</p>
        ) : (
          <ul>
            {clients.map((order: any) => (
              <li key={order.id} className="order-card">
                <h2>Order ID: {order.id}</h2>
                <h3>NameL: {order.name}</h3>
                <div>
                  <h3>Items:</h3>
              
                </div>
              </li>
            ))}
          </ul>
          
        )}
        <Link href='/api/logout'>logout</Link>
      </div>
    );
  } catch (error) {
    console.error("Error fetching clients:", error);
    return <p>Error loading orders. Please try again later.</p>;
  }
}

