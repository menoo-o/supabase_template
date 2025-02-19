// app/(dashboard)/admin/page.tsx
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';


export default async function AdminDashboard() {
  const supabase = await createClient(); //supabase/server

 
  const { data: userTypeData, } = await supabase
  .from('admin_info')
  .select('name')
  .eq('user_id', 'ca4ea4e8-2b12-4a59-b17f-1233d323b8d9')
  .maybeSingle();



  
  return (
    <div>
      <h3>Admin Dashboard</h3> <br /><br />
      <h1>this is  the {userTypeData?.name} </h1>
      
      <br />
      

      <Link href='/api/logout'>logout</Link>
    </div>
  );
}