// components/OrganizationSelector.tsx

'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

import { useOrganization } from '@/hooks/use-organization';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { FaPlus } from 'react-icons/fa';
import { Organization } from '@prisma/client';

export const OrganizationSelector = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const {organizations, selectedOrganization, selectOrganization, loading} = useOrganization()

  const changeOrganizationHandler = (orgId:string) => {
    selectOrganization(orgId)
    router.push(`/organization/${orgId}`)
  }

  if(!selectedOrganization) return;

  if(loading){
    return (
        <>
         <Skeleton className="w-48 h-12" />
        </>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-x-4">
        <Select onValueChange={(value)=>changeOrganizationHandler(value)}>
        <SelectTrigger className="w-[60vw] md:w-[280px]">
            <SelectValue placeholder={selectedOrganization?.title } />
        </SelectTrigger>
        <SelectContent>
            {organizations.map((org) => (
               <>
                <SelectItem key={org?.title} value={org?.id}>
                    {org?.title}
                </SelectItem>
               </>
            ))}
        </SelectContent>
        </Select>

        <Button onClick={() => router.push('/create-organization')}><FaPlus/></Button>
        
      </div>

      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent>
          <div className="text-sm font-medium text-center text-neutral-600 pb-4">
            Create New Organization
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
        
          }} className="space-y-4">
            <FormInput id="name" placeholder="Enter organization name..." />
            <FormSubmit>Create Organization</FormSubmit>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
