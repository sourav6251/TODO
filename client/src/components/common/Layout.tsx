import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import AddMenuButton from "./AddButton"
import { useAppSelector } from "../../store/reduxHooks";

const Layout = () => { 
  function handleAdd(item: "todo" | "ideas" | "credentials") {
  // open modal / navigate / set form state
  console.log("selected", item);
}
  const isLogin = useAppSelector((state) => state.user.isLogin);
  return (
    <div>
        <Navbar/>
       {isLogin&& <AddMenuButton onSelect={handleAdd} position="br" />}
        <div className="pt-16 h-screen w-full">
          <Outlet/>
        </div>
    </div>
  )
}

export default Layout