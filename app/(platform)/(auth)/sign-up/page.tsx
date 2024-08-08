
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';
import BeatLoader from 'react-spinners/BeatLoader';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {

    try {
      setLoading(true)
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
    
      const result = await response.json();
      if (result) {
        toast.success('Account created successfully. Please Login to continue.')
        router.push('/sign-in');
      } else {
        toast.error(result.error || 'Something went wrong, Please try again later.');
      }
    } catch (err) {
      console.error("Error during sign-up:", err);
      toast.error('An unexpected error occurred. Please try again later.');
    }
    setLoading(false)
     
  };

  return (
    <div className="min-h-screen  w-[90vw] sm:min-w-full flex items-center justify-center ">
      <div className="bg-white flex flex-col gap-4 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold  text-center">Create your account</h1>
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
          onClick={handleSignUp}
          className="w-full"
        >
          {loading ? (
           <BeatLoader color='white'/>
          ) : (
            'Sign Up'
          )}
        </Button>


        <div className='text-center'>
          <Link href={`/sign-in`}>Already have an account? Sign in</Link>
        </div>

      </div>
    </div>
  );
}
