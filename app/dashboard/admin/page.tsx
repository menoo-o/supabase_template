// app/(dashboard)/admin/page.tsx
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';


export default async function AdminDashboard() {
  const supabase = await createClient(); //supabase/server

 
  const { data: userTypeData, error } = await supabase
  .from('admin_info')
  .select('user_id')
  .eq('user_id', 'ca4ea4e8-2b12-4a59-b17f-1233d323b8d9')
  .maybeSingle();

console.log('Supabase User Type Data:', userTypeData);
console.error('Supabase User Type Error:', error);


  
  return (
    <div>
      <h3>Admin Dashboard</h3> <br /><br />
      <h1>this is  the {userTypeData?.user_id} </h1>
      
      <br />
      

      <Link href='/api/logout'>logout</Link>
    </div>
  );
}