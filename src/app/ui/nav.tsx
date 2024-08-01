"use client"
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


function Nav() {
    const pathname = usePathname();

    // const links: string[] = {}
  return (
    <nav className='overflow-hidden'>
      <ul className='flex md:w-[40%]'>
        <li><Link className={pathname === '/' ? 'navActiveLink px-2 py-[2px]' : 'navLink px-2 py-[2px] hover:bg-[#dcdde0]  hover:rounded-sm'}  href="/" >All </Link></li>
        <li><Link className={pathname === '/car' ? 'navActiveLink px-2 py-[2px]' : 'navLink px-2 py-[2px] hover:bg-[#dcdde0]  hover:rounded-sm '}   href="car" >Cars </Link></li>
        <li>
        <Link className={pathname === '/bus' ? 'navActiveLink px-2 py-[2px]' : 'navLink px-2 py-[2px] hover:bg-[#dcdde0]  hover:rounded-sm '}   href="bus">Bus</Link>
        </li>
        <li>
        <Link className={pathname === '/motorcycle' ? 'navActiveLink px-2 py-[2px]' : 'navLink px-2 py-[2px] hover:bg-[#dcdde0] hover:rounded-sm '}  href="motorcycle">Motorcycles</Link>
        </li>
        <li>
        <Link className={pathname === '/truck' ? 'navActiveLink px-2 py-[2px]' : 'navLink px-2 py-[2px] hover:bg-[#dcdde0] hover:rounded-sm '}  href="truck">Trucks</Link>
        </li>    
      </ul>
   
    </nav>
  )
}

export default Nav