'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });    
    router.push('/admin');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleGitHubSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <div className="space-y-4">
          <input
            className="w-full px-3 py-2 border rounded"
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            className="w-full px-3 py-2 border rounded"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-green-500 rounded hover:bg-green-700"
            onClick={handleSignIn}
          >
            Sign In
          </button>
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-gray-800 rounded hover:bg-gray-900"
            onClick={handleGitHubSignIn}
          >
            Sign In with GitHub
          </button>
          <button
            className="w-full px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-700"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
