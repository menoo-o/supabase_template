import Link from "next/link"
export default async function Home() {



  return(
      <>
          <p>Hello homepage</p>
          <br /><br />
          
        

          <Link href='/login'>login</Link>
      </>
  ) 

}