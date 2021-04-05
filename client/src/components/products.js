import React from 'react';
import Votes from './votes';

function Products(props) {
  const { products, votes } = props;

  return (
    <section className="products">
      {products.map((product) => {
        const filteredVotes = votes.filter((vote) => {
          return vote.product === product.id;
        });
        const percentage = isNaN(filteredVotes.length / votes.length)
          ? 0
          : ((filteredVotes.length / votes.length) * 100).toFixed(2);

        return (
          <article key={product.id} className="product">
            <h1 className="title">{product.title}</h1>
            <p className="description">{product.description}</p>
            <img
              src={product.img}
              alt={product.title}
              className="product-img"
            ></img>
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
