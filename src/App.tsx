import './App.css';
import Login from './Component/Login';
import { Bounce, ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import AdminLayout from './Admin/Layout';
import PageCategory from './Admin/Category/Page';
import 'animate.css';
import AdminMovie from './Admin/Movie/Page';
import UserLayout from './Home/UserLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* USER LAYOUT */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* ADMIN LAYOUT */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="movies/" element={<AdminMovie />} />         
            <Route path="categories/" element={<PageCategory/>}/>
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>

  );
}

export default App;
