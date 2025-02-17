'use client';

import { useState } from 'react';
import { addCountry } from './actions';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

export default function CountryForm() {
  const [state, setState] = useState({ message: '', error: '' });

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await addCountry(formData);

    if (response.error) {
      setState({ error: response.error, message: '' });
    } else {
      setState({ message: response.message, error: '' });
      event.target.reset(); // Clear form after successful submission
    }
  }

  return (
    <div>
      <h1>Add Country</h1>
      <form onSubmit={handleSubmit}>
        {/* Hidden ID Field (UUID) */}
        <input type="hidden" name="id" value={uuidv4()} />

        {/* Name Input */}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" name="phone" required />
        </div>

        {/* Orders JSON Input */}
        <div>
          <label htmlFor="orders">Orders (JSON)</label>
          <textarea id="orders" name="orders" required placeholder='[{"name": "brownies"}]'></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit">Add Country</button>

        <Link href='/api/logout'></Link>

        <br />

        {/* Success/Error Messages */}
        {state.message && <p className="text-green-500">{state.message}</p>}
        {state.error && <p className="text-red-500">{state.error}</p>}
      </form>

      

      <br />
    </div>
  );
}
