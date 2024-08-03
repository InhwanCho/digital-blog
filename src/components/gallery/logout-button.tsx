'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <button onClick={handleSignOut} className="ml-5 p-2 border rounded-full bg-red-500 text-white">
      로그아웃
    </button>
  );
}
