import Link from "next/link"
import { createClient } from "@/utils/supabase/server";

export default async function Home() {



  return(
      <>
          <p>Hello homepage</p>
          <br /><br />
          
        

          <Link href='/login'>login</Link>
      </>
  ) 

}