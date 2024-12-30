import React, { useEffect, useState } from 'react'
import { WishlistLineItem } from './WishlistLineItem';
import { WishlistEmpty } from './WishlistEmpty';
import { useAside } from '../Aside';

export const WishlistMain = ({ layout }) => {


    const [wishlistedProducts, setWishlistedProducts] = useState([]);

    const { type } = useAside();
    // ... rest of your component code

    useEffect(() => {

        // Re-render WishlistMain whenever wishlistedProducts changes
        // For example, you can log the new value of wishlistedProducts
        const rec = localStorage.getItem('wishlist');

        const wishlistedItems = rec ? JSON.parse(rec) : [];



        setWishlistedProducts(wishlistedItems);

    }, [type]);
    return (
        <>
            {wishlistedProducts?.length > 0 ?
                <>
                    <div className=''>
                        <div className="wishlist-details">
                            <div aria-labelledby="wishlist-lines">
                                <ul>
                                    {wishlistedProducts.map((wishlistedItem) => (
                                        // <CartLineItem key={line.id} line={line} layout={layout} />
                                        <WishlistLineItem key={wishlistedItem.id} wishlistedItem={wishlistedItem} layout={layout} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </>
                : <WishlistEmpty />}
        </>
    )
}

/** @typedef {'page' | 'aside'} WishlistLayout */