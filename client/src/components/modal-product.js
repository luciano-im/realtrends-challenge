import React, { useState } from 'react';
import price from '../label.svg';
import location from '../location.svg';

function ModalProduct(props) {
  const { product, selectProduct } = props;
  const [selected, setSelected] = useState(false);

  const handleSelectProduct = () => {
    selectProduct({
      id: product.id,
      title: product.title,
      description: 'Descripcion del Producto',
      img: product.thumbnail,
    });
    setSelected(true);
  };

  return (
    <li className="product">
      <div className="product-data">
        <div className="thumbnail">
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div>
          <p className="title">{product.title}</p>
          <p className="price">
            <img src={price} alt="Precio" />$
            {parseFloat(product.price).toFixed(2)}
          </p>
          <p className="location">
            <img src={location} alt="Dirección" />
            {product.address.city_name}, {product.address.state_name}
          </p>
        </div>
      </div>
      <button
        className={`select-product button green-button ${
          selected ? 'selected' : ''
        }`}
        disabled={selected ? true : false}
        onClick={handleSelectProduct}
      >
        Seleccionar
      </button>
    </li>
  );
}

export default ModalProduct;
