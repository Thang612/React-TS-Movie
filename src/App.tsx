import './App.css';
import Login from './Component/Login';
import { Bounce, ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import AdminLayout from './Admin/Layout';
import AddMovie from './Admin/Movie/Add';
import PageCategory from './Admin/Category/Page';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="movie/add" element={<AddMovie />} />         
            <Route path="category/add" element={<PageCategory/>}/>
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
