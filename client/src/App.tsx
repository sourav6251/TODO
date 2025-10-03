import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "@/components/common/Layout";
import Error from "@/components/common/Error";
import Auth from "@/components/auth/Auth";
import Homepage from "@/components/view/Home";
import TodoPage from "@/view/TodoPage";
import IdeasPage from "@/view/IdeasPages";
import CredentialsPage from "@/view/CredentialPages";
import RequireLoginRoute from "@/utils/RequireLoginRoute";
import ProfilePage from "./view/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
          <Route element={<RequireLoginRoute />}>
            {/* ✅ This makes Homepage show at "/" */}
            <Route path="todo" element={<TodoPage />} />
            <Route path="ideas" element={<IdeasPage />} />
            <Route path="credential" element={<CredentialsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* login and error can stay outside RequireLoginRoute if you want public access */}
          <Route path="login" element={<Auth />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
