"use client"

import AdminSideBar from "@components/AdminSideBarLink";

export default function MainLayout({
    children,
}: {
    children: React.ReactElement
}) {
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
                            <AdminSideBar href="/admin/login">
                                Logout
                            </AdminSideBar>
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