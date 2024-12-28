import React from 'react'
import { WishlistLineItem } from './WishlistLineItem';
import { WishlistEmpty } from './WishlistEmpty';

export const WishlistMain = ({ layout }) => {

    const wishlistedItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    console.log(wishlistedItems, "hi hello")
    return (
        <>
            { wishlistedItems?.length > 0  ? 
            <>
            <div className=''>
            <div className="wishlist-details">
                <div aria-labelledby="wishlist-lines">
                <ul>
                    { wishlistedItems.map((wishlistedItem) => (
                        // <CartLineItem key={line.id} line={line} layout={layout} />
                        <WishlistLineItem key={wishlistedItem.id} wishlistedItem={wishlistedItem} layout={layout} /> 
                    ))}
                </ul>
                </div>
            </div>
            </div>
            
            </>
            : <WishlistEmpty /> }
        </>
  )
}

/** @typedef {'page' | 'aside'} WishlistLayout */