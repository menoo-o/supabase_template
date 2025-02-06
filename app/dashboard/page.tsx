import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/account/login')
  }

  return (
    <div>
      <h1>Welcome to the Dashboard, {data.user.email}!</h1>
      
      <form action="/account/logout" method="POST">

        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}