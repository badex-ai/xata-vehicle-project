"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Cross2Icon} from '@radix-ui/react-icons';


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  sqlForm: z
    .string()
   
})

 const TextareaForm=({closeTextBox,submitSQLQuery})=> {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data,'this is the data')
    submitSQLQuery(data)
  }

  

  return (
    <Form {...form}>
        <div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[90%] space-y-6">
        <FormField
          control={form.control}
          name="sqlForm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type your SQL query in the text box</FormLabel>
              <FormControl>
                <div className="relative border">
                <button  onClick={closeTextBox} className='absolute top-[-1rem] right-[-1rem] align-middle flex items-center justify-center rounded-full w-6 h-6 bg-[#dcdde0] hover:bg-[#334155] hover:text-white 'type='button' title='Button to close sql query'><Cross2Icon/></button>
                <Textarea
                  placeholder="eg `SELECT * FROM collisions`"
                  className="resize-none border-0 w-[90%]"
                  {...field}
                />
        <Button className="bg-[#334155] text-white absolute bottom-2 right-2" type="submit">Run</Button>

                </div>
                
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
            <div></div>
        </div>
        
      </form>
        </div>
      
    </Form>
  )
}

export default TextareaForm