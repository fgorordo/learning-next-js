"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";


export default function ProfilePage() {
    
    const { data: session } = useSession();
    
    useEffect(() => {
      console.log('Rendering from Client Side');
    }, [])
    

    return (
        <div>
            <h1>Profile Page</h1>
            <hr />
            <div className="flex flex-col">
                <span>{session?.user?.name ?? 'No Name'}</span>
                <span>{session?.user?.email ?? 'No Email'}</span>
                <span>{session?.user?.image ?? 'No Image'}</span>
                <span>{session?.user?.roles ?? 'No Roles'}</span>
                <span>{session?.user?.id ?? 'No uuid'}</span>
                <span>{session?.user?.isActive ?? 'Unknown'}</span>
            </div>
        </div>
    );
};