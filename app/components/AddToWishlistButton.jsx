import { Heart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { use } from 'react';


/**
 * @param {{
*   analytics?: unknown;
*   disabled?: boolean;
*   lines: Array<OptimisticWishlistLineInput>;
*   onClick?: () => void;
*   afterAddToWishlist?: () => void;
* }}
*/
export const AddToWishlistButton = ({
  analytics,
  disabled,
  lines,
  onClick,
  afterAddToWishlist,
}) => {

  const wishlistedProducts = JSON.parse(localStorage.getItem('wishlist')) || [];
  console.log(wishlistedProducts,"aura",lines)

  const [productInWishlist, setProductInWishlist] = useState(wishlistedProducts.some((id) => id === lines?.[0]?.merchandiseId));
  console.log(productInWishlist,"hai")


  function handleWishlistClick() {

    if (!productInWishlist) {
      const newEntry = {
        id: lines[0].merchandiseId,
        image_url: lines[0].selectedVariant.image.url,
        product_price: lines[0].selectedVariant.price.amount,
        product_title: lines[0].selectedVariant.product.title,
        product_handle: lines[0].selectedVariant.product.handle,
      };
      wishlistedProducts.push(newEntry);
      localStorage.setItem('wishlist', JSON.stringify(wishlistedProducts));
      setProductInWishlist(!productInWishlist);
    }
  }
  return (
    <div className='py-4'>
      <button
        type="button"
        className={`flex items-center gap-2 text-sm font-semibold  px-4 py-2 rounded  ${!productInWishlist ? 'text-navy hover:text-navyLight border-gray-200 border hover:border-navy' : 'border-navy bg-navy text-white cursor-default'}`}
        onClick={() => handleWishlistClick()}
      >
        <Heart className={`wishlist-icon w-6 h-6 ${productInWishlist && 'stroke-red-500 fill-red-500'}`} />
        {!productInWishlist ? 'WISHLIST' : 'WISHLISTED'}
      </button>
    </div>
  )
}
