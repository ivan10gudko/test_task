import { useState } from "react";
import Input from "./components/input/Input"
import type { ToastType } from "./components/toast/Toast";
import styles from "./Main.module.css";
import Toast from "./components/toast/Toast";

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
  closeButton:boolean;
}
function App() {
const [toasts, setToasts] = useState<ToastMessage[]>([]);

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
  <div>
    <div className={styles.inputContainer}>
      <Input type="password" label="Password"/>
      <Input type="number" label="Number"/>
      <Input type="text" label="Text"/>
      <Input type="password" label="Password" clearable/>
      <Input type="number" label="Number " clearable/>
      <Input type="email" label="Email" placeholder="example@email.com" clearable/>
    </div>
    <div>
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
