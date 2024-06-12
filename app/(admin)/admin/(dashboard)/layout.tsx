"use client"

import AdminSideBar from "@/components/AdminSideBarLink";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { getProviders, signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
export default function MainLayout({
    children,
}: {
    children: React.ReactElement
}) {

    const router = useRouter();
    const [providers, setProviders] = useState<any>();

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            if (providers) signIn(providers.google.id)
        }
    });

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);


    if (!session) {
        return (<></>)
    }
    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <div className="flex-1 p-4 min-h-0 overflow-auto">
					{children}
				</div>
            </div>
        </div>
    );
}