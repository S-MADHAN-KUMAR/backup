import React from 'react'
import {BrowserRouter as Router ,Routes ,  Route} from 'react-router-dom'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Homepage from './pages/User/Homepage'
import LoginPage from './pages/User/LoginPage'
import RegisterPage from './pages/User/RegisterPage'
import ProductsPage from './pages/User/ProductsPage'
import CheckoutPage from './pages/User/CheckoutPage'
import CartPage from './pages/User/CartPage'
import ProductDetailsPage from './pages/User/ProductDetailsPage'
import Home from './components/admin/Home'
import Products from './components/admin/Products'
import Users from './components/admin/Users'
import Orders from './components/admin/Orders'
import Coupon from './components/admin/Coupon'
import Banners from './components/admin/Banners'
import Reviews from './components/admin/Reviews'
import Categories from './components/admin/Categories'
import Brands from './components/admin/Brands'
import AddProduct from './components/admin/admin_add/AddProduct'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddCategories from './components/admin/admin_add/AddCategories'
import EditProduct from './components/admin/admin_edit/EditProduct'
import EditCategories from './components/admin/admin_edit/Edit_categories.jsx'
import ProtectedRoute from './pages/User/ProtectedRoute.jsx'
import Profile from './pages/User/Profile.jsx'
import NotFound from './pages/User/NotFound.jsx'
import ProductedRouteAdmin from './pages/admin/ProductedRouteAdmin.jsx'
import General from './components/user/Profile-views/General.jsx'
import Wallet from './components/user/Profile-views/Wallet.jsx'
import Setting from './components/user/Profile-views/Setting.jsx'
import ProfileOrders from './components/user/Order/Orders.jsx'
import Address from './components/user/Address/Address.jsx'
import OrderDetail from './components/user/Order/OrderDetail.jsx'
import Add_Brands from './components/admin/admin_add/Add_Brands.jsx'
import Cart from './pages/User/Cart.jsx'
import Add_address from './components/user/Address/Add_address.jsx'
import Edit_address from './components/user/Address/Edit_address.jsx'

const App = () => {
  return (
    <Router>
      <ToastContainer/>
    <Routes>
      

       {/* Admin Routes */}
       <Route
          path="/admin/login"
          element={
            <ProductedRouteAdmin isProtectedForAdminLoggedIn={true}>
              <Login />
            </ProductedRouteAdmin>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProductedRouteAdmin>
              <Dashboard />
            </ProductedRouteAdmin>
          }
        >
          {/* Nested Admin Routes */}
          <Route path="/admin/dashboard" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="coupons" element={<Coupon />} />
          <Route path="banners" element={<Banners />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="categories" element={<Categories />} />
          <Route path="brands" element={<Brands />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="addCategories" element={<AddCategories />} />
          <Route path="add_brands" element={<Add_Brands />} />
          <Route path="editProduct/:id" element={<EditProduct />} />
          <Route path="editCategories/:id" element={<EditCategories />} />
        </Route>


      {/* ============================================================================================ */}

      {/* User Routes */}
{/* User Routes */}
<Route path='/profile' element={<Profile/>}>
  <Route index element={<General />} />
  <Route path='general' element={<General />} />
  <Route path='settings' element={<Setting />} />
  <Route path='address' element={<Address />} />
  <Route path='add_address' element={<Add_address />} />
  <Route path='edit_address/:id' element={<Edit_address />} />
  <Route path='wallet' element={<Wallet />} />
  <Route path='orders' element={<ProfileOrders />} />

  {/* Relative path to /profile */}
  <Route path='order_detail/:id' element={<OrderDetail />} />
</Route>


  <Route path='cart' element={<Cart/>}/>
      <Route path="/register" element={<ProtectedRoute isProtectedForLoggedIn={true} ><RegisterPage /></ProtectedRoute>} />   
      <Route path="/login" element={<ProtectedRoute isProtectedForLoggedIn={true}><LoginPage /></ProtectedRoute>} />
      <Route path='/' element={<Homepage/>}/> 
      <Route path='/products' element={<ProductsPage/>}/>
      <Route path='/checkout' element={<CheckoutPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/products/:id' element={<ProductDetailsPage/>}/> 

      <Route path="*" element={<NotFound />} />

    </Routes>
    </Router>
  )
}

export default App
