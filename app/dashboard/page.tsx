import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {data.user.email}!</h1>
      
      
      <Link href='/api/logout'>sign out</Link>
    </div>
  );
}