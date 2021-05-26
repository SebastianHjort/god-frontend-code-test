import React, { useEffect, useState } from 'react';
import { LoadingBar, View } from 'vcc-ui';
import * as api from './api';
import { ProductList } from './components/product';
import { ProductInterface } from './models/product';

function App() {
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [products, setProducts] = useState<ProductInterface[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      setIsLoadingProducts(true);
      try {
        const response = await api.getProducts();
        setProducts(response);
      } catch (e) {
        console.error(e);
      }
      setIsLoadingProducts(false);
    }
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <View>
          <LoadingBar isLoading={isLoadingProducts} />
          {!isLoadingProducts && <ProductList products={products} />}
        </View>
      </main>
    </div>
  );
}

export default App;
