import { useState } from "react";
import Input from "./components/input/Input"
import type { ToastType } from "./components/toast/Toast";
import styles from "./Main.module.css";
import Toast from "./components/toast/Toast";
import type { MenuItemType } from "./components/sidebar/MenuItem";
import Sidebar from "./components/sidebar/Sidebar";

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
  closeButton:boolean;
}

const menu: MenuItemType[] = [
  { label: "Home", link: "/" },
  {
    label: "Menu item 1",
    children: [
      { label: "Submenu item 1", link: "/example" },
      {
        label: "Submenu item 2",
        children: [
          { label: "Item 1", link: "/example" },
          { label: "Item 2", link: "/example" },
        ],
      },
    ],
  },
  {label: "Menu item 2",
    children: [
      { label: "Submenu item 1", link: "/example" },
      { label: "Submenu item 2", link: "/example" },
    ]
    }
];

function App() {
  const [password, setPassword] = useState("");
  const [numberVal, setNumberVal] = useState("");
  const [textVal, setTextVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [open, setOpen] = useState(false);

  

  function addToast(message: string, type: ToastType){
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, closeButton:true }]);
  };
  function addToastWithoutClose(message: string, type: ToastType){
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, closeButton:false }]);
  };

  function removeToast(id: number){
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
  <div className={styles.main}>
      <header className={styles.header}>
        <div className="font-bold">LOGO</div>
        <button onClick={() => setOpen(true)}>☰</button>
      </header>

      <Sidebar
        isOpen={open}
        onClose={() => setOpen(false)}
        menuItems={menu}
      />

    <div className={styles.inputContainer}>
        <Input
            type="password"
            label="Password"
            value={password}
            onChange={setPassword}
            clearable
        />

        <Input
            type="number"
            label="Number"
            value={numberVal}
            onChange={setNumberVal}
            clearable
        />

        <Input
            type="text"
            label="Text"
            value={textVal}
            onChange={setTextVal}
        />

        <Input
            type="email"
            label="Email"
            placeholder="example@email.com"
            value={emailVal}
            onChange={setEmailVal}
            clearable
        />
    </div>
    <div className={styles.toastController}>
      <h1>Toast test</h1>
      <button className={styles.btn} onClick={() => addToast("Success", "success")}>
        Show Success
      </button>
      <button className={styles.btn} onClick={() => addToast("Something went wrong", "error")}>
        Show Error
      </button>
      <button className={styles.btn} onClick={() => addToastWithoutClose("Warning", "warning")}>
        Show Warning
      </button>
      <button className={styles.btn} onClick={() => addToastWithoutClose("Information", "info")}>
        Show Info
      </button>

      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
            closeButton={toast.closeButton}
            duration={3000}
          />
        ))}
      </div>
    </div>
  </div>
  )
}

export default App
