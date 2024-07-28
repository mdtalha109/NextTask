'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput } from '@/components/form/form-input';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export default function CreateOrganization() {
  const [title, setTitle] = useState('');
  const router = useRouter();

  const handleCreateOrganization = async () => {

    if(!title){
      toast('Title is required');
      return;
    }

    const res = await fetch('/api/organization/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      const { id } = await res.json();
      router.push(`/organization/${id}`);
    } else {
      alert('Failed to create organization');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Organization</h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Organization Title
          </label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Organization Title"
          />
        </div>
        <Button
          onClick={handleCreateOrganization}
          className="w-full"
        >
          Create Organization
        </Button>
      </div>
    </div>
  );
}
