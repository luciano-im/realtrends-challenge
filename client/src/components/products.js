import React from 'react';
import Votes from './votes';
import productImg from '../product.jpg';

function Products(props) {
  const { products, votes } = props;

  return (
    <section className="products">
      {products.map((product) => {
        const filteredVotes = votes.filter((vote) => {
          return vote.product === product.id;
        });
        const percentage = (
          (filteredVotes.length / votes.length) *
          100
        ).toFixed(2);

        return (
          <article key={product.id} className="product">
            <h1 className="title">{product.title}</h1>
            <p className="description">{product.description}</p>
            <img src={productImg} alt={product.title} width="300"></img>
            <Votes votes={filteredVotes} />
            <div className="percentage">
              <p>{percentage}%</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export default Products;