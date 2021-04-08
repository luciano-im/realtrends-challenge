import React, { useState, useEffect } from 'react';
import ModalProduct from './modal-product';

function Modal(props) {
  const { show, products, setProducts, setShowModal } = props;
  const [search, setSearch] = useState('');
  const [meliProducts, setMeliProducts] = useState([]);
  const [errors, setErrors] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleFormData = (event) => {
    setSearch(event.target.value);
  };

  const processForm = (event) => {
    event.preventDefault();
    if (search === '') {
      setErrors(true);
    } else {
      searchProducts(search);
      setErrors(false);
    }
  };

  const searchProducts = async (q) => {
    await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`)
      .then((response) => response.json())
      .then((data) => {
        setMeliProducts(Array.from(data.results));
      });
  };

  const handleSelectedProduct = (selected) => {
    const product = selectedProducts.length === 0 ? 'Producto A' : 'Producto B';
    selected['custom_title'] = product;
    setSelectedProducts([...selectedProducts, selected]);
  };

  useEffect(() => {
    if (selectedProducts.length === 2) {
      setProducts([...selectedProducts]);
      setShowModal(false);
    }
  }, [selectedProducts, setShowModal]);

  useEffect(() => {
    setSelectedProducts([]);
    setMeliProducts([]);
    setSearch('');
  }, [products]);

  return (
    <section className={`modal ${show ? 'show' : ''}`}>
      <form id="search-form">
        <div>
          <input
            type="text"
            name="search"
            onChange={handleFormData}
            value={search}
            placeholder="Buscar productos..."
          ></input>
          <input type="submit" value="Buscar" onClick={processForm}></input>
        </div>
        <p className={`error ${errors ? 'show' : ''}`}>
          Debe ingresar in término de búsqueda
        </p>
      </form>
      <article className="products">
        <ul>
          {meliProducts.map((product) => {
            return (
              <ModalProduct
                product={product}
                key={product.id}
                selectProduct={handleSelectedProduct}
              />
            );
          })}
        </ul>
      </article>
    </section>
  );
}

export default Modal;
