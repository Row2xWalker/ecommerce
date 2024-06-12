import React from 'react'
import { signOut } from 'next-auth/react'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '@/lib/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classNames from 'classnames'
import { HiOutlineLogout } from 'react-icons/hi'
import { FcBullish } from 'react-icons/fc'

const linkClass ='flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

export default function Sidebar() {
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col">
        <div className="flex items-center gap-2 px-1 py-3">
            <FcBullish fontSize={24} />
            <div className="text-white text-lg">JnP Store</div>
        </div>
        <div className="py-8 flex flex-1 flex-col gap-0.5">
            {DASHBOARD_SIDEBAR_LINKS.map((link)=>(
                <SidebarLink key={link.key} href={link} />
            ))}
        </div>
        <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
            {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link)=>(
                <SidebarLink key={link.key} href={link} />
            ))}
            <button onClick={() => signOut()} className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                <span className="text-xl">
                    <HiOutlineLogout />
                </span>
                Logout
            </button>
        </div>
    </div>
  )
}



function SidebarLink({ href }) {
	const pathname = usePathname();
    const active = href.path === pathname;
	return (
		<Link href={href.path} className={classNames(active ? 'bg-neutral-700 text-white' : 'text-neutral-400', linkClass)}>
			<span className="text-xl">{href.icon}</span> 
			{href.label}
		</Link>
	)
}