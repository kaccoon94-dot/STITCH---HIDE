import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Recommend from './pages/Recommend.jsx'
import Lineup from './pages/Lineup.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'

// P01 / · P02 /recommend · P03 /lineup · P04 /product/:id · P05 /cart · P06 /checkout
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recommend" element={<Recommend />} />
        <Route path="lineup" element={<Lineup />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}
