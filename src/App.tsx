import "./App.css";
import Counter from "./Component/Counter";
import UserList from "./Component/UserList";
import RegisterForm from "./Component/registerForm";
function App() {
  return (
    <>
      <div>Couter</div>
      <Counter />
      <div>UserList</div>
      <UserList />
      <div>RegisterForm</div>
      <RegisterForm />
    </>
  );
}
export default App;
