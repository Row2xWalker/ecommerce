"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminSideBar = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const pathname = usePathname();
  const active = href === pathname;

  return (
    <Link
      href={href}
      className={`hover:bg-gray-100 hover:text-black p-2 rounded block text-sm ${active ? 'text-black font-semibold bg-gray-100 p-2' : 'text-white'
        }`}
    >
      {children}
    </Link>

  )
}

export default AdminSideBar