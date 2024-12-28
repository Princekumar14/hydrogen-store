import React from 'react'
import { useAside } from '../Aside';
import { useVariantUrl } from '~/lib/variants';
import { Link } from '@remix-run/react';

export const WishlistLineItem = ({ wishlistedItem, layout}) => {

    // const {id, image_url, product_price, product_title, product_handle} = wishlistedItem;
    // console.log(id,merchandise, "helloindia")
    // const {product, title, image, selectedOptions} = merchandise;
    // const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
    console.log(wishlistedItem, "helloindia")
    const {close} = useAside();
    return(
      <div className='flex gap-4 py-6 border-b border-gray-100'>132
        {/* Product Image  */}
        {/* <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden"> 
          {image_url && (
            <Image
              alt={product_title}
              aspectRatio="1/1"
              data={image_url}
              className='object-cover w-full h-full'
              loading="lazy"
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          )}
  
        </div> */}
  
        {/* Product details  */}
        {/* <div className="flex-1 min-w-0">
          <Link
            prefetch="intent"
            to={product_handle}
            onClick={close}
            className='block'
          >
            <h3 className='font-playfair text-base text-navy mb-1 truncate'>
              {product_title}
            </h3>
          </Link> 
  
        </div> */}
      </div>
    );
}
