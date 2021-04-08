import React from 'react';
import Votes from './votes';

function Products(props) {
  const { products, votes } = props;

  return (
    <section className="products">
      {products.map((product) => {
        // Filter votes by product to show specific votes on each product and to calculate the percentage of votes
        const filteredVotes = votes.filter(
          (vote) => vote.product === product.id
        );
        const percentage = isNaN((filteredVotes.length * 100) / votes.length)
          ? 0
          : ((filteredVotes.length * 100) / votes.length).toFixed(2);

        return (
          <article key={product.id} className="product">
            <div className="container">
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
            </div>
            <div
              className="color"
              style={{
                height: `${percentage}%`,
                backgroundColor: `hsl(${percentage}, 100%, 50%)`,
                transition: 'height 1s ease-in-out',
              }}
            ></div>
          </article>
        );
      })}
    </section>
  );
}

export default Products;
