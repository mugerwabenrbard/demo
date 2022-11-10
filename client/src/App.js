import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import PrdtMgt from './Pages/PrdtMgt';
import Product from './Pages/Product';
import EditProduct from './Pages/EditProduct';
import ProductManager from './Pages/ProductManager';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/new' element={<PrdtMgt/>}/>
      <Route path='/product/:id' element={<Product/>}/>
      <Route path='/manager' element={<ProductManager/>}/>
      <Route path='/edit/:id' element={<EditProduct/>}/>
    </Routes>
  );
}

export default App;
