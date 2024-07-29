
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/slice/userSlice';
import { setOrganizations, setSelectedOrganization } from '@/redux/slice/organizationSlice';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignIn = async (event:any) => {
    event.preventDefault();

    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    dispatch(setUser(data.user))
    dispatch(setSelectedOrganization(data.selectedOrganization))
    dispatch(setOrganizations(data.organizations))

    if (response.ok) {
      const redirectUrl = response.headers.get('X-Redirect-URL');
      if (redirectUrl) {
        router.push(redirectUrl);
      }
    } else {
      toast(data.error || 'Please try again');
    }
  };

  return (
    <div className="min-h-screen w-[90vw] sm:min-w-full  flex items-center justify-center">
    <div className="bg-white flex flex-col gap-4 p-6 rounded-lg shadow-lg w-full max-w-sm">
      <h1 className="text-2xl font-bold  text-center">Sign In</h1>
      <div >
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Email"
        />
      </div>
      <div >
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Password"
        />
      </div>

     
      <Button
        onClick={handleSignIn}
        className="w-full"
      >
        Sign In
      </Button>
      
     
      <div className='text-center'>
      <Link href={`/sign-up`}>Don&apos;t have an account? Sign up</Link>
      </div>
      
    </div>
  </div>
  );
}
