"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {searchTable} from '@/app/server/dataFunction'


function Search({getSearch}) {
  // const [first, setfirst] = useState(second)

  const FormSchema = z.object({
    searchString: z.string()})

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          searchString: "",
        },
      })
     
      async function  onSubmit(data: z.infer<typeof FormSchema>) {
        const result = getSearch(data)
       
       
      
       
      }
  return (
    <div className='w-[18rem]  '>  <Form {...form}>
    <form    onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-around">
      <FormField
        name="searchString" 
        control={form.control}
        
        render={({ field }) => (
          <FormItem>
            
            <FormControl>
              <Input placeholder="Enter search here" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type="submit"><MagnifyingGlassIcon/></Button>
    </form>
  </Form>
</div>
  )
}

export default Search