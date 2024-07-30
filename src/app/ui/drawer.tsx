"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import CollisionReportForm from '@/app/ui/collisionReportFrom'  
import {addNewCollision} from '@/app/server/dataFunction'
import { useToast } from "@/components/ui/use-toast"
import {FormData} from '@/lib/types'




function CollisionReportDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()

  const  handleSubmit = async(data : FormData) => {
    
    const result = await addNewCollision(data)
    if(result.id){
      toast({
        title: "Collision Added",
        description: "The new collision has been added successfully ",
      })
      setIsOpen(false)
    }
    
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className='bg-[#334155] text-white hover:bg-[#495e7b] hover:text-white'>Add Collision</Button>
      </DrawerTrigger>
      <DrawerContent className="w-[400px] sm:w-[540px] h-full">
        <DrawerHeader>
          <DrawerTitle>Collision Report Form</DrawerTitle>
          <DrawerDescription>Please fill out the collision report details.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto">
          <CollisionReportForm onSubmit={handleSubmit} />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CollisionReportDrawer