"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'


import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {  useRegisterMutation } from "./authApiSlice"
import type {  RegisterResponse } from "@/types/global"
import { Link, useNavigate } from "react-router-dom"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters."
  }),
  confirmPassword: z.string().min(2, {
    message: "Password must be at least 2 characters."
  })
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: [ "password"]
})


export default function Register() {
  const [register] = useRegisterMutation()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmitRegister(data: z.infer<typeof FormSchema>) {
    const res = await register(data) as unknown as RegisterResponse

    if (res.error) {
      alert(res.error.data.message)
      return
    }

    navigate("/login")


  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitRegister)} className="">
        <section className="w-96 px-5 md:px-0">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Register</CardTitle>
              <CardDescription>Fill in the form to create an account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-ceter gap-2">

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Confirm Password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


              </div>
            </CardContent>
            <CardFooter className="w-full flex flex-col gap-3">
              <Button variant="primary" type="submit" className="w-full">
                Sign Up
              </Button>

              <CardDescription className="text-center">
                Already have an account? <Link to="/login" className='underline'>Sign in</Link>

              </CardDescription>

              <a href="/" className="text-center text-blue-500">
                Go back home
              </a>
            </CardFooter>
          </Card>
        </section>


        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  )
}
