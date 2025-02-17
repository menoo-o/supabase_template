// lib/types.ts
export interface User {
    id: string;
    email: string;
    role: 'client' | 'admin';
  }
  
  export interface Client {
    id: string;
    name: string;
    email: string;
    user_id: string; // Links to the user in the auth table
  }
  
  export interface Admin {
    id: string;
    name: string;
    email: string;
    user_id: string; // Links to the user in the auth table
  }