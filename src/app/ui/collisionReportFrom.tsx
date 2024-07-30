"use client"
import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import DatePicker from 'react-datepicker';
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {states, causes,vehicleTypes} from '@/lib/utils'
import "react-datepicker/dist/react-datepicker.css";
import {FormData,FormSchema} from '@/lib/types'


const CollisionReportForm:React.FC<{ onSubmit: (data: z.infer<typeof FormSchema>) => void }> =({ onSubmit })=> {
 
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      causeOfCollision: "Distracted driving",
      driversExperience: 0,
      sex: "Male",
      location: "",
      state: "",
      time: new Date().toISOString(),
      plateNumber: "",
      vehicleBrand: "",
      vehicleModel: "",
      vehicleType: "Car"
    },
  })

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    
    onSubmit(data)
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="causeOfCollision"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cause of Collision</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cause" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {causes.map((cause,i) => (
                    <SelectItem key={`${cause}-${i}`} value={cause}>
                      {cause}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="driversExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver&apos;s Experience (years)</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sex" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {states.map((state,i) => (
                    <SelectItem key={`${state.code}-${i}`} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='pr-1'>Time</FormLabel>
              <FormControl>
              <DatePicker
          selected={field.value ? new Date(field.value) : null}
          onChange={(date: Date | null) => field.onChange(date ? date.toISOString() : null)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className=" w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  disabled:cursor-not-allowed disabled:opacity-50"
        />               
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="plateNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plate Number</FormLabel>
              <FormControl>
                <Input {...field} maxLength={7} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleBrand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Brand</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Model</FormLabel>
              <FormControl>
                <Input placeholder='add the car model and the year of manufacture' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vehicleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehicleTypes.map((type,i) => (
                    <SelectItem key={`${type}-${i}`} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default CollisionReportForm