import { Button } from "@/components/ui/button"

import { FaSignOutAlt } from "react-icons/fa"
import { OrganizationSelector } from "./organization-selector"


export const Navbar = () => {
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
                
                <Button><FaSignOutAlt/></Button>
            </div>
        </nav>
    )
}