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


  const FormSchema = z.object({
    searchString: z.string()})

type GetSearchFunction = (formData: z.infer<typeof FormSchema>)=> void
const Search: React.FC<{ getSearch: GetSearchFunction }> = ({getSearch})=> {
  // const [first, setfirst] = useState(second)

 

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          searchString: "",
        },
      })
     
      async function  onSubmit(data: z.infer<typeof FormSchema>) {
         getSearch(data)
       
       
      
       
      }
  return (
    <div className='md:w-[15rem] w-[11rem]  '>  <Form {...form}>
    <form    onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-around">
      <FormField
        name="searchString" 
        control={form.control}
        render={({ field }) => (
          <FormItem >
            
            <FormControl >
              <Input className="h-[30px] w-[125px] md:w-[12rem]" placeholder="Enter search here" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Button className='className="w-[30px] h-[30px] p-2' variant="default" type="submit"><MagnifyingGlassIcon className='w-3'/></Button>
    </form>
  </Form>
</div>
  )
}

export default Search