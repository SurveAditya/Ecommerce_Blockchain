import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, dappazon, togglePop }) => {
  
  const buyHandler = async () => {
    await dappazon.methods.buy(item.id).send({
      from: account,
      value: ethers.utils.parseEther(item.price.toString())
    });
 
    console.log('Item purchased!');
  };
  
  
  return (
    <div className="product">
      <div className="product__details">
          <div className="product__overview">
          <h3>{item.name}</h3>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <p>{item.price} ETH</p>

          <hr />

          <p>Overview</p>
          <p>
            {item.description}
          </p>
          <p>
            {item.description}

            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima rem, iusto,
            consectetur inventore quod soluta quos qui assumenda aperiam, eveniet doloribus
            commodi error modi eaque! Iure repudiandae temporibus ex? Optio!
          </p>
          <hr />

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
            </strong>
          </p>

          {item.stock > 0 ? (
            <p>In Stock.</p>
          ) : (
            <p>Out of Stock.</p>
          )}
          <hr/>
          <button className='product__buy' onClick={buyHandler}>
            Buy Now
          </button>

          <p><small>Ships from</small> Dappazon</p>
          <p><small>Sold by</small> Dappazon</p>

        </div>
        <button onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </button>
        </div>
      </div>
  )
}

export default Product;