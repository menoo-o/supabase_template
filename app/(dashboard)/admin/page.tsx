// app/(dashboard)/admin/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';



export default async function AdminDashboard() {
  const supabase = await createClient();

 
  // Fetch the authenticated user
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user || error) {
    console.error('Admin Dashboard: User not authenticated:', error);
    redirect('/login');
  }

  console.log('Authenticated User ID:', user.id);

  const { data: userRoleData, error: userRoleError } = await supabase
  .from('user_roles')
  .select('user_role') // Updated column name
  .eq('user_id', user.id)
  .maybeSingle(); // Use .maybeSingle() to handle missing rows

console.log('User Role Data:', userRoleData);
console.error('User Role Error:', userRoleError);

if (userRoleError || !userRoleData?.user_role) {
  console.error('Admin Dashboard: User role not found or invalid');
  redirect('/unauthorized');
}

const role = userRoleData.user_role; // Updated variable name

  if (role !== 'admin') {
    console.error('Admin Dashboard: User is not an admin');
    redirect('/unauthorized');
  }

  // Fetch all clients
  const { data: clients, error: clientsError } = await supabase
    .from('clients')
    .select('*');

  if (clientsError) {
    console.error('Error fetching clients:', clientsError);
    return <p>Error loading clients</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Clients</h2>
      <ul>
        {clients?.map((client) => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
    </div>
  );
}