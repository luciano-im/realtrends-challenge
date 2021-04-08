import React, { useState, useEffect } from 'react';
import ModalProduct from './modal-product';

function Modal(props) {
  const { show, products, setProducts, setShowModal } = props;
  const [search, setSearch] = useState('');
  const [meliProducts, setMeliProducts] = useState([]);
  const [errors, setErrors] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Effects
  // Set products state when user select 2 of them
  useEffect(() => {
    if (selectedProducts.length === 2) {
      setProducts([...selectedProducts]);
      setShowModal(false);
    }
  }, [selectedProducts, setShowModal]);

  // Reset modal on component render
  useEffect(() => {
    setSelectedProducts([]);
    setMeliProducts([]);
    setSearch('');
  }, [products]);

  // Functions to handle actions
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

  const handleSelectedProduct = (selected) => {
    const product = selectedProducts.length === 0 ? 'Producto A' : 'Producto B';
    selected['custom_title'] = product;
    setSelectedProducts([...selectedProducts, selected]);
  };

  // Search products using Meli API
  const searchProducts = async (q) => {
    await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${q}`)
      .then((response) => response.json())
      .then((data) => {
        setMeliProducts(Array.from(data.results));
      });
  };

  return (
    <section className={`modal ${show ? 'show' : ''}`}>
      <form id="search-form">
        <div>
          <input
            type="text"
            className="input-text"
            name="search"
            onChange={handleFormData}
            value={search}
            placeholder="Buscar productos..."
          ></input>
          <input
            type="submit"
            className="button blue-button submit"
            value="Buscar"
            onClick={processForm}
          ></input>
        </div>
        <p className={`error ${errors ? 'show' : ''}`}>
          Debe ingresar un término de búsqueda
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
