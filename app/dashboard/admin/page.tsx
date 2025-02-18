// app/(dashboard)/admin/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';


export default async function AdminDashboard() {
  const supabase = await createClient();

 
  // Fetch the authenticated user
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user || error) {
    console.error('Admin Dashboard: User not authenticated:', error);
    redirect('/login');
  }

  console.log('Authenticated User ID:', user.id);

  const emailAdmin= user.email

  
  return (
    <div>
      <h1>Admin Dashboard</h1>
  
      <p>hello {emailAdmin}</p>

      <Link href='/api/logout'>logout</Link>
    </div>
  );
}