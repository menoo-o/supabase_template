// app/(dashboard)/admin/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  client_id: string;
  items: { name: string; quantity: number; price: number }[];
  status: string;
  delivery_date: string;
  total_amount: number;
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  console.log(user?.role);
  
  return(
    <>
      <h1>user</h1>
    </>
  )

//   if (role !== 'authenticated') {
//     redirect('/unauthorized'); // Redirect if the user is not an admin
//   }

//   // Fetch all clients
//   const { data: clients, error: clientsError } = await supabase
//     .from('clients')
//     .select('*');

//   if (clientsError) {
//     console.error('Error fetching clients:', clientsError);
//     return <p>Error loading clients</p>;
//   }

//   // Fetch all orders
//   const { data: orders, error: ordersError } = await supabase
//     .from('orders')
//     .select('*');

//   if (ordersError) {
//     console.error('Error fetching orders:', ordersError);
//     return <p>Error loading orders</p>;
//   }

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <h2>Clients</h2>
//       <ul>
//         {clients?.map((client: Client) => (
//           <li key={client.id}>
//             {client.name} - {client.phone} - {client.address}
//           </li>
//         ))}
//       </ul>
//       <h2>Orders</h2>
//       <ul>
//         {orders?.map((order: Order) => (
//           <li key={order.id}>
//             {JSON.stringify(order.items)} - Total: £{order.total_amount} - Status:{' '}
//             {order.status}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
}