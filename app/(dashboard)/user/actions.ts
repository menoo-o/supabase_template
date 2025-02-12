'use server';

import { createClient } from '@/utils/supabase/server';

export async function addCountry(formData: FormData) {
  const supabase = await createClient();

  // Extract data from form
  const id = formData.get('id');
  const name = formData.get('name');
  const phone = formData.get('phone');
  const orders = formData.get('orders');

  console.log("Received Data:", { id, name, phone, orders });

  // Convert orders string to JSON
  let ordersJson;
  try {
    ordersJson = JSON.parse(orders);
  } catch (error) {
    return { error: "Invalid JSON format in orders field" };
  }

  // Insert into Supabase `countries` table
  const { error } = await supabase
    .from('clients')
    .insert([{ id, name, phone, orders: ordersJson }]);

  if (error) {
    console.error("Error inserting data:", error);
    return { error: "Database error: " + error.message };
  }

  return { message: "Country added successfully!" };
}
