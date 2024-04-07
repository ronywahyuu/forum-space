import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {}
const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
})
const Write: React.FC<Props> = (props) => {
  const [value, setValue] = useState('');
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  })
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const toggleBold = () => {
    setBold(!bold);
  };

  const toggleItalic = () => {
    setItalic(!italic);
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>

        <div className="flex flex-col   bg-gray-100">

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input className="bg-white p-4 border-2 border-gray-300 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="shadcn" {...field} />
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input className="bg-white p-4 border-2 border-gray-300 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Content</FormLabel>
                <div className="flex space-x-4 mb-4">
                  <button onClick={toggleBold} className={`px-4 py-2 rounded-lg shadow-md ${bold ? 'bg-blue-500 text-white' : 'bg-white'}`}>B</button>
                  <button onClick={toggleItalic} className={`px-4 py-2 rounded-lg shadow-md ${italic ? 'bg-blue-500 text-white' : 'bg-white'}`}>I</button>
                </div>

                <FormControl>
                  <textarea
                    className={`w-full h-1/2 p-4 border-2 border-gray-300 rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-200 ${bold ? 'font-bold' : ''} ${italic ? 'italic' : ''}`}
                    {...field}
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
      </form>
    </Form>
  );
}


export default Write;