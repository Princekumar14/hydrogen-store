import {CartForm, Image} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from '@remix-run/react';
import {ProductPrice} from '../ProductPrice';
import {useAside} from '../Aside';
import CartLineQuantityAdjustor from './CartLineQuantityAdjustor';

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 * @param {{
 *   layout: CartLayout;
 *   line: CartLine;
 * }}
 */
export function CartLineItem({layout, line}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();

  return(
    <div className='flex gap-4 py-6 border-b border-gray-100'>
      {/* Product Image  */}
      <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden"> 
        {image && (
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            className='object-cover w-full h-full'
            loading="lazy"
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        )}

      </div>

      {/* Product details  */}
      <div className="flex-1 min-w-0">
        <Link
          prefetch="intent"
          to={lineItemUrl}
          onClick={close}
          className='block'
        >
          <h3 className='font-playfair text-base text-navy mb-1 truncate'>
            {product.title}
          </h3>
        </Link> 

        {/* Product Options */}
        <div className="mt-1 space-y-1">
          {selectedOptions.map((option) => (
            <p
              key={`${product.id}-${option.name}`}
              className='font-source text-sm text-gray-500'
            >
              <strong>{option.name}: </strong>
              {option.value}
            </p>
          ))}
        </div>

        {/* Price & Quantity Controls */}
        <div className="mt-4 flex items-center justify-between">
          <CartLineQuantityAdjustor line={line} />
          <div className="font-source font-medium">
            <ProductPrice price={line?.cost?.totalAmount} />
          </div>

        </div>

      </div>
    </div>
  );

}



/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 * @param {{
 *   lineIds: string[];
 *   disabled: boolean;
 * }}
 */
function CartLineRemoveButton({lineIds, disabled}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button disabled={disabled} type="submit">
        Remove
      </button>
    </CartForm>
  );
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({children, lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('~/components/cart/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
