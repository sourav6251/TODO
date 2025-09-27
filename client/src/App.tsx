import Auth from './components/auth/Auth';
import Error from './components/common/Error';
import Layout from './components/common/Layout';
import { Routes, Route,  BrowserRouter } from 'react-router-dom';
import HomePage from './view/Home';
import Todo from './view/Todo';


function App() {
 
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route path="/home" element={<HomePage/>} />
          <Route path="/todo" element={<Todo/>} />
          <Route path="/ideas" element={<Error/>} />
          <Route path="/credential" element={<Error/>} />
          <Route path="/settings" element={<Error/>} />
          <Route path="/login" element={<Auth/>} />
          <Route path="/*" element={<Error/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
