import React from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server';

export default async function Userpage() {
  const supabase = await createClient();

  const { data: userTypeData, error } = await supabase
  .from('user_roles')
  .select('role_post')
  .eq('user_id', '2e0b722c-3ce7-4d96-b901-8583240e3373')
  .maybeSingle();

console.log('Supabase User Type Data:', userTypeData);
console.error('Supabase User Type Error:', error);


  return (
    <div>
      <h1>this is user page</h1>
      <p>{userTypeData?.role_post}</p>
      <br />

      



      <Link href='/api/logout'>logout</Link>
    </div>
  )
}

