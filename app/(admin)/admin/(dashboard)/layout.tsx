"use client"

import AdminSideBar from "@components/AdminSideBarLink";
import { getProviders, signOut, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"
export default function MainLayout({
    children,
}: {
    children: React.ReactElement
}) {

    const router = useRouter();
    const [providers, setProviders] = useState<any[]>();

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

        <main className="grid grid-rows-1 grid-cols-11 bg-gray-100 h-screen w-screen">
            <aside className="col-span-1 bg-gray-600">
                <nav className="text-white text-center text-xl pt-[150px]">
                    <div>Hi Admin!</div>
                    <ul className="flex flex-col gap-4 mt-[100px] cursor-pointer">
                        <li>
                            <AdminSideBar href="/admin">
                                Dashboard
                            </AdminSideBar>
                        </li>
                        <li>
                            <AdminSideBar href="/admin/products">
                                Products
                            </AdminSideBar>
                        </li>
                        <li>
                            <AdminSideBar href="/admin/orders">
                                Orders
                            </AdminSideBar>
                        </li>
                        <li>
                            <button className="hover:bg-gray-100 hover:text-black p-2 rounded block text-sm text-white w-full"
                                onClick={() => signOut({
                                    callbackUrl: `/admin`
                                })}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
            <section className="col-span-10 bg-blue-100">
                <div className='flex items-center h-full bg-gray-200'>
                    <div className="h-5/6 w-full">
                        {children}
                    </div>
                </div>
            </section>
        </main>
    );
}