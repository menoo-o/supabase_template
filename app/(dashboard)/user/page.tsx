// app/(dashboard)/client/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
interface Client {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export default async function ClientDashboard() {
  const supabase = await createClient();

  // Fetch the authenticated user
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user || error) {
    redirect('/login'); // Redirect to login if not authenticated
  }

  // Fetch the user's role from the `user_roles` table
  const { data: userRoleData, error: userRoleError } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();

  if (userRoleError || userRoleData?.role !== 'client') {
    redirect('/unauthorized'); // Redirect if the user is not a client
  }

  // Fetch the client's own data
  const { data: clientData, error: clientError } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (clientError) {
    console.error('Error fetching client data:', clientError);
    return <p>Error loading data</p>;
  }

  return (
    <div>
      <h1>Client Dashboard</h1>
      <p>Name: {clientData.name}</p>
      <p>Phone: {clientData.phone}</p>
      <p>Address: {clientData.address}</p>
    </div>
  );
}