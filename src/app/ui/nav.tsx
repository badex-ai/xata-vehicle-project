"use client"
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


function Nav() {
    const pathname = usePathname();
  return (
    <>
    <Link className={pathname === '/' ? 'navActiveLink' : 'navLink '}  href="/" >All </Link>
    <Link className={pathname === '/car' ? 'navActiveLink' : 'navLink '}   href="car" >Cars </Link>
    <Link className={pathname === '/bus' ? 'navActiveLink' : 'navLink '}   href="bus">Bus</Link>
    <Link className={pathname === '/motorcycle' ? 'navActiveLink' : 'navLink '}  href="motorcycle">Motorcycles</Link>
    <Link className={pathname === '/truck' ? 'navActiveLink' : 'navLink '}  href="truck">Trucks</Link></>
  )
}

export default Nav