import type { Meta, StoryObj } from "@storybook/react";
import { useState} from "react";
import Sidebar, { type SidebarProps } from "../components/sidebar/Sidebar";
import type { MenuItemType } from "../components/sidebar/MenuItem";
import styles from "./SidebarStories.module.css"; // Імпорт нових стилів

const meta: Meta<typeof Sidebar> = {
    title: "Navigation/Sidebar",
    component: Sidebar,
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {    
        isOpen: {
            description: 'Controls the visibility of the sidebar',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
        },
    },

        onClose: {
            description: 'Callback function triggered when the sidebar requests to close (e.g., clicking overlay)',
            action: 'closed',
            table: {
                type: { summary: '() => void' },
            },
        },

        menuItems: {
            description: 'Array of navigation items. Supports nested children.',
            control: 'object',
            table: {
                type: { summary: 'MenuItemType[]' },
        },
    },
    },
    tags:["autodocs"]
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof Sidebar>;

// --- 1. Тестові дані ---
const oneLevelItems: MenuItemType[] = [
    { label: "Home", link: "/" },
    { label: "Profile", link: "/profile" },
    { label: "Settings", link: "/settings" },
    { label: "Logout", link: "/logout" },
];

const twoLevelItems: MenuItemType[] = [
    { label:"Menu item ",link: "/" },
    {
    label:"Menu item "  ,children: [
        { label:"Menu item ", link: "/example" },
        {
            label:"Menu item",
            children: [
                { label:"Menu item ",link : "/example" },
                { label:"Menu item ",link: "/example" }
            ]
        },
        { label:"Menu item ", link: "/example" },
        ],
    },
    {
        label:"Menu item ",
        children: [
        { label:"Menu item ", link: "/example" },
        { label:"Menu item ", link: "/example" },
        ]
    }
];

const SidebarWrapper = (args: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    
    return (
    <div className={styles.pageWrapper}>
        <header className={styles.header}>
            <button
                onClick={() => setIsOpen(true)}
                className={styles.openBtn}
            >
                ☰
            </button>
            <h3>My Application</h3>
        </header>

        <main className={styles.mainContent}>
            <p>Click the button above or use the Sidebar props to open the menu.</p>
            <p>Status: <strong>{isOpen ? "Open" : "Closed"}</strong></p>
        </main>

        <Sidebar 
            {...args} 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
        />
    </div>
);
};



export const SimpleMenu: Story = {
    render: (args) => <SidebarWrapper {...args} />,
    args: {
        isOpen: false,
        menuItems: oneLevelItems,
    },
};

export const NestedMenu: Story = {
    render: (args) => <SidebarWrapper {...args} />,
    args: {
        isOpen: true,
        menuItems: twoLevelItems,
    },
};

export const ClosedState: Story = {
    render: (args) => <SidebarWrapper {...args} />,
    args: {
        isOpen: false,
        menuItems: twoLevelItems,
    },
};