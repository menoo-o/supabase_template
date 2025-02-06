import Link from "next/link";

export default function ConfirmPage() {
    return (
      <div>
        <h1>Check Your Email</h1>
        <p>
          We have sent you an email with a confirmation link. Please check your inbox
          and click the link to verify your email address.
        </p>

        <br /> 

        <Link href='/account'>Login Now</Link>
      </div>
    );
  }