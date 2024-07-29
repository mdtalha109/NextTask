"use client"
import { Button } from "@/components/ui/button"

import { FaSignOutAlt } from "react-icons/fa"
import { OrganizationSelector } from "./organization-selector"
import { useRouter } from "next/navigation"


export const Navbar = () => {

    const router = useRouter();
    

    const handleLogout = async () => {

        const res = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (res.ok) {
            window.location.href = '/sign-in';
        } else {
          console.error('Failed to logout');
        }
      };


    return (
        <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    NextTask
                </div>

                <div className=" md:hidden">
                    NT
                </div>
            </div>

            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSelector/>
                
                <Button onClick={handleLogout}><FaSignOutAlt/></Button>
            </div>
        </nav>
    )
}