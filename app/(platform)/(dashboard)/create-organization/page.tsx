'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useOrganization } from '@/hooks/use-organization';
import { z } from 'zod';
import { Label } from '@/components/ui/label';

const organizationSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
});

export default function CreateOrganization() {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { fetchOrganizations } = useOrganization();

  const validateTitle = (value: string) => {
    const result = organizationSchema.safeParse({ title: value.trim() });
    if (!result.success) {
      setError(result.error.errors[0]?.message || 'Validation error');
    } else {
      setError(null);
    }
  };

  const handleCreateOrganization = async () => {

    const validationResult = organizationSchema.safeParse({ title });
    
    if (!validationResult.success) {
      setError(validationResult.error.errors[0]?.message || 'Validation error');
      return;
    }

    setError(null);

    const res = await fetch('/api/organization/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });

    if (res.ok) {
      const { id } = await res.json();
      fetchOrganizations();
      router.push(`/organization/${id}`);
    } else {
      toast.error('Failed to create organization');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90vw] max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Organization</h1>
        <div className="mb-4">
          <Label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Organization Title
          </Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              validateTitle(value);
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Organization Title"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
