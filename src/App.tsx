import Input from "./components/input/Input"
import styles from "./Main.module.css";
function App() {


  return (
    <div className={styles.inputContainer}>
      <Input type="password"/>
      <Input type="number"/>
      <Input type="text"/>
      <Input type="password" label="Password" clearable/>
      <Input type="number" label="Number " clearable/>
      <Input type="email" label="Email" placeholder="example@email.com" clearable/>
    </div>
  )
}

export default App
