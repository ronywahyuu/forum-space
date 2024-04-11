"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useParams } from "react-router-dom"
import type { CommentResponse } from "@/types/global"
import { useAddCommentMutation } from "../threadsApiSlice"

const FormSchema = z.object({
  content: z.string().min(2, {
    message: "Comment must be at least 2 characters.",
  }),
})

export default function CommmentForm({ commentLength }: {
  commentLength: number
}) {
  const { id: threadId } = useParams()
  const [addComment] = useAddCommentMutation()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
    },
  })


  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await addComment({ threadId: threadId, content: data.content }) as unknown as CommentResponse
    if (res.error) {
      alert('Failed to add comment. Please try again.')
      return
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment
                {commentLength > 0 && <span className="text-gray-500 ml-2">({commentLength} comments)</span>}
              </FormLabel>
              <FormControl>
                <textarea
                  className="bg-white dark:bg-gray-800 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your comment here..."

                  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className=""
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >Comment</Button>
      </form>
    </Form>
  )
}
