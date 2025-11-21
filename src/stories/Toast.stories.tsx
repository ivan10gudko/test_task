import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Toast, { type ToastProps, type ToastType } from "../components/toast/Toast";
import styles from "./ToastStories.module.css"


const meta: Meta<typeof Toast> = {
    title: "Feedback/Toast",
    component: Toast,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
    },
    argTypes: {
    
    message: {
      description: 'The text content of the notification',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },

    type: {
      description: 'The visual style of the toast indicating the severity',
      control: 'select',
      options: ["success", "error", "warning", "info"],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"info"' },
      },
    },

    duration: {
      description: 'Time in milliseconds before the toast auto-dismisses',
      control: 'number',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3000' },
      },
    },

    closeButton: {
      description: 'Whether to display the "X" close button',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },

    onClose: {
      description: 'Callback function triggered when the toast is closed',
      action: 'closed',
      table: {
        type: { summary: '() => void' },
      },
    },
}} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

interface ToastMessage {
    id: number;
    message: string;
    type: ToastType;
    closeButton: boolean;
}

const ToastPlayground = (args: ToastProps) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = (type: ToastType) => {
        const id = Date.now();
        setToasts((prev) => [
            ...prev,
            {
            id,
            message: `This is a ${type} message!`, 
            type,
            closeButton: args.closeButton ?? true
            }
        ]);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

return (
    <div className={styles.playground}>
        <h3>Toast Notification Playground</h3>
        <p className={styles.description}>
            Click buttons to spawn toasts. They will appear in the bottom-right corner.
        </p>

        <div className={styles.controls}>
            <button onClick={() => addToast("success")} className={`${styles.btnSuccess} ${styles.btn}`}>Success</button>
            <button onClick={() => addToast("error")} className={`${styles.btnError} ${styles.btn}`}>Error</button>
            <button onClick={() => addToast("warning")} className={`${styles.btnWarning} ${styles.btn}`}>Warning</button>
            <button onClick={() => addToast("info")} className={`${styles.btnInfo} ${styles.btn}`}>Info</button>
        </div>

        <div className={styles.toastController}>
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    closeButton={toast.closeButton}
                    duration={args.duration || 3000}
                    onClose={() => removeToast(toast.id)}
            />
        ))}
        </div>
    </div>
    );
};

export const Playground: Story = {
    render: (args) => <ToastPlayground {...args} />,
    args: {
        duration: 3000,
        closeButton: true,
    },
};



export const Success: Story = {
    args: {
        type: "success",
        message: "Operation completed successfully!",
        duration: 100000,
        closeButton: true,
        onClose: () => console.log("Closed"),
    },
};

export const Error: Story = {
    args: {
        type: "error",
        message: "Something went wrong. Please try again.",
        duration: 100000,
        closeButton: true,
        onClose: () => console.log("Closed"),
    },
};

export const Warning: Story = {
    args: {
        type: "warning",
        message: "Warning: Your session is about to expire.",
        duration: 100000,
        closeButton: true,
        onClose: () => console.log("Closed"),
    },
};

export const Info: Story = {
    args: {
        type: "info",
        message: "New update available.",
        duration: 100000,
        closeButton: true,
        onClose: () => console.log("Closed"),
    },
};


export const AutoDismissFast: Story = {
    args: {
        type: "info",
        message: "I will disappear in 2 seconds...",
        duration: 2000,
        closeButton: true,
        onClose: () => console.log("Auto closed"),
    },
};

export const AutoDismissSlow: Story = {
    args: {
        type: "warning",
        message: "I will stay for 10 seconds...",
        duration: 10000,
        closeButton: true,
        onClose: () => console.log("Auto closed"),
    },
};


export const WithoutCloseButton: Story = {
    args: {
        type: "info",
        message: "You have to wait for me to disappear.",
        duration: 3000,
        closeButton: false,
        onClose: () => console.log("Closed"),
    },
};