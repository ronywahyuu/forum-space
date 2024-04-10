
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
import { useLoginMutation } from "./authApiSlice"
import type { LoginResponse } from "@/types/global"
import { Link, useNavigate } from "react-router-dom"

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters."
  }),
})

export default function Login() {
  const navigate = useNavigate()
  const [login] = useLoginMutation()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmitLogin(data: z.infer<typeof FormSchema>) {
    const res = await login(data) as unknown as LoginResponse

    if (res.error) {
      alert(res.error.data.message)
      return
    }

    const token = res.data.data.token

    localStorage.setItem("token", token)

    navigate("/")

    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitLogin)} className="">
        <section className="w-96 px-5 md:px-0">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Sign in</CardTitle>
              <CardDescription>Let's get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
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
            </CardContent>
            <CardFooter className="w-full flex flex-col gap-3">
              <Button variant="primary" type="submit" className="w-full">
                Sign in
              </Button>

              <CardDescription className="text-center">
                Don't have an account?{" "}
                <Link to="/register" className="underline">
                  Sign up
                </Link>
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
