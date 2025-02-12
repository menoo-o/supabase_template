import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client with the Service Role Key
const supabaseAdmin = await createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Create the user with the admin role
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: "matisse@Mbk18", // You can generate a secure password or send a reset link
      email_confirm: true, // Automatically confirm the email
      user_metadata: { role: "admin" }, // Assign the 'admin' role
    });

    if (error) {
      console.error("Error creating admin user:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Admin user created successfully", data }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}