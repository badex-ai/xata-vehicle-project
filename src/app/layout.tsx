import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Dialog from "@/app/ui/dialog"
import Drawer from "@/app/ui/drawer"
import Nav from "@/app/ui/nav"
import { Toaster } from "@/components/ui/toaster"
import Image from 'next/image';
import myImage from '../../public/xataLogo.svg'



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    
    <html lang="en">
      <body className={inter.className}>
      <main className="min-h-screen">
      <header className="flex justify-between p-6 border-b-2">
      
          
 
        <div>XATA PROJECT</div> 
        <a href="#"> link to github</a>
     
      </header>
      <div className="p-2">
      <h1 className="text-xl text-bold uppercase">Statistics showing metrics of motor vehicle collision </h1>

      <div className="flex justify-between w-[100%] items-center">
        <div className=" flex w-[40%]">
          <Nav/>
          </div>
        
        <div> <Drawer/></div>
        
      </div>
      </div>
        {children} </main>
        <Toaster />
        </body>
    </html>
  );
}
