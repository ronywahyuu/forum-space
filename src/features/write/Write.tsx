import { Button } from "@/components/ui/button";
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddThreadMutation } from "../threads/threadsApiSlice";
import { useNavigate } from "react-router-dom";
import type { ThreadResponse } from "@/types/global";

type Props = {}
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  body: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
})
const Write: React.FC<Props> = (props) => {
  const [addThread] = useAddThreadMutation()
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      category: "",
      body: "",
    },
  })

  const toggleBold = () => {
    setBold(!bold);
  };

  const toggleItalic = () => {
    setItalic(!italic);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    const res = await addThread(data) as unknown as ThreadResponse
 
    if (res.error) {
      alert(res.error.data.message)
      return
    }

    navigate("/")

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-24">

        <div className="flex flex-col   ">

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input 
                    className="bg-white dark:bg-gray-900 p-4 border-2 border-gray-300 dark:border-gray-800 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-200" 
                    placeholder="Write your title"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input 
                    className="bg-white dark:bg-gray-900 p-4 border-2 border-gray-300 dark:border-gray-800 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-200" 
                    placeholder="Ex: React, Vue, Angular, etc..." 
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Content</FormLabel>
                <div className="flex space-x-4 mb-4">
                  <button onClick={toggleBold} className={`px-4 py-2 rounded-lg shadow-md ${bold ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800'}`}>B</button>
                  <button onClick={toggleItalic} className={`px-4 py-2 rounded-lg shadow-md ${italic ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800'}`}>I</button>
                </div>

                <FormControl>
                  <textarea
                    className={`bg-white dark:bg-gray-800 w-full h-1/2 p-4 border-2 border-gray-300 dark:border-gray-800 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-200 ${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''}`}
                    {...field}
                    rows={6}
                    placeholder="Enter your content here..."
                  />

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <textarea
            onChange={handleInputChange}
            value={value}
            className={` h-1/2 p-4 border-2 border-gray-300 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-200 ${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''}`}
          /> */}
        </div>

        <Button type="submit" variant="default" className="w-full mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
}


export default Write;