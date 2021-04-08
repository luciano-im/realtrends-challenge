import React, { useState } from 'react';

function Form(props) {
  const { products, handleVote, paused } = props;
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

  // Process form submit and displys errors where applicable
  const processForm = (event) => {
    event.preventDefault();
    if (formData.product === '' || formData.comment === '' || paused) {
      setErrors(true);
    } else {
      handleVote(formData.product, formData.comment);
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
            value={formData.comment}
            onChange={handleFormData}
            placeholder="Comentario"
          ></input>
        </div>
        <div className="submit">
          <input
            type="submit"
            className="button blue-button"
            value="Votar!"
            onClick={processForm}
          ></input>
        </div>
        <p className={`error ${errors ? 'show' : ''}`}>
          {paused
            ? 'La votación ha sido pausada'
            : 'Ninguno de los campos puede estar vacío'}
        </p>
      </form>
    </section>
  );
}

export default Form;
