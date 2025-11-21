import type { Meta, StoryObj } from '@storybook/react';
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input, { type InputProps } from '../components/input/Input';


const meta = {
  title: 'Input/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes:{
  placeholder: { control: "text" },
  type: { control: "select", options: ["password", "text", "email", "number"] },
  clearable: { control: "boolean" },
}

} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;


const InputWrapper = (args: Partial<InputProps>) => {
  const [value, setValue] = useState(args.value || "");
  
  return (
    <Input
      {...args as InputProps}
      value={value}
      onChange={(val) => setValue(val)}
    />
  );
};

export const Primary: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    label: "Username",
    placeholder: "Enter username...",
    value: "",
    type: "text",
    clearable: true,
    onChange: () => {},
  },
};

export const Password: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    label: "Password",
    placeholder: "Enter password",
    value: "Secret123",
    type: "password",
    clearable: false,
    onChange: () => {},
  },
};

export const NumberInput: Story = {
  render: (args) => <InputWrapper {...args} />,
  args: {
    label: "Age",
    placeholder: "Enter age",
    value: "",
    type: "number",
    clearable: true,
    onChange: () => {},
  },
};

interface FormValues {
  email: string;
}
const RHFDemo = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { email: "" },
  });

  const [data, setData] = useState<FormValues|null>(null);

  return (
    <form
      onSubmit={handleSubmit(setData)}
      style={{ display: 'flex', flexDirection: 'column', gap: 15, maxWidth: 400 }}
    >
      <p><strong>React Hook Form Integration Demo</strong></p>
      
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Input
            {...field}
            label="Email (Required)"
            placeholder="test@example.com"
          />
        )}
      />
      
      <button type="submit" style={{ padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 4 }}>
        Submit
      </button>

      {data && (
        <pre style={{ background: '#f3f4f6', padding: 10, borderRadius: 4 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </form>
  );
};

export const WithReactHookForm: Story = {
  render: () => <RHFDemo />,
  args: {
    value: "",
    onChange: () => {},
  },
};