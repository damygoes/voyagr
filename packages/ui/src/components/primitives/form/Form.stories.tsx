import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import { Input } from "../input/Input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./Form";

const meta: Meta = {
  title: "Components/Form",
  tags: ["autodocs"],
  component: Form,
};

export default meta;
type Story = StoryObj;

const Template = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-md">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormDescription>
                This is the email we’ll use to contact you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export const Default: Story = {
  render: () => <Template />,
};
