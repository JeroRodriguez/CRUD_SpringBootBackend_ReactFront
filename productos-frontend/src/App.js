import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import ProductForm from './components/products/ProductForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/darkTheme.css';

function App() {
  return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/create" element={<ProductForm />} />
            <Route path="/edit/:id" element={<ProductForm />} />
            <Route path="/view/:id" element={<ProductDetail />} />
          </Routes>
        </Layout>
      </Router>
  );
}

export default App;