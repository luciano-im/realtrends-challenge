import React, { useState } from 'react';

function Form(props) {
  const { products } = props;

  const [formData, setFormData] = useState({
    product: '',
    comment: '',
  });
  const [errors, setErrors] = useState(false);

  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const processForm = (event) => {
    event.preventDefault();
    if (formData.product === '' || formData.comment === '') {
      setErrors(true);
    } else {
      props.handleVote(formData.product, formData.comment);
      setErrors(false);
      document.getElementById('vote-form').reset();
    }
  };

  return (
    <section className="vote-form">
      <form method="" id="vote-form">
        <div className="product">
          {products.map((product) => {
            return (
              <label key={product.id}>
                <input
                  type="radio"
                  id={product.id}
                  name="product"
                  value={product.id}
                  onChange={handleFormData}
                ></input>
                {product.title}
              </label>
            );
          })}
        </div>
        <div className="comment">
          <input
            type="text"
            name="comment"
            onChange={handleFormData}
            placeholder="Comentario"
          ></input>
        </div>
        <div className="submit">
          <input type="submit" value="Votar!" onClick={processForm}></input>
        </div>
        <p className={`error ${errors ? 'show' : ''}`}>
          Ninguno de los campos puede estar vacío
        </p>
      </form>
    </section>
  );
}

export default Form;
