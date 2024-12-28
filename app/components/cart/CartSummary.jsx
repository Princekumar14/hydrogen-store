import {CartForm, Money} from '@shopify/hydrogen';
import { CreditCard, Gift } from 'lucide-react';
import {useRef} from 'react';
import { CartDiscounts } from './CartDiscounts';
import { CartGiftCards } from './CartGiftCards';

/**
 * @param {CartSummaryProps}
 */
export function CartSummary({cart, layout}) {
  return (
    <div className="bg-white px-6 py-8">
      {/* Subtotal  */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-source text-gray-600">
          Subtotal
        </span>
        <span className="font-source font-medium">
          {cart.cost?.subtotalAmount?.amount ? (
            <Money data={cart.cost.subtotalAmount}/>
          ):
          (
            '-'
          )}
        </span>

      </div>

      {/* Discounts */}
      <CartDiscounts discountCodes={cart.discountCodes} />

      {/* Gifts Cards */}
      <CartGiftCards giftCardCodes={cart.appliedGiftCards}/>

      {/* Checkout Button */}

      {/* Extra Information */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Gift className="w-4 h-4"/>
          <span>Complimentary gift wrapping available</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CreditCard className="w-4 h-4"/>
          <span>Secure checkout powered by SUNNYKART</span>
        </div>

      </div>



    </div>
  );
}
/**
 * @param {{checkoutUrl?: string}}
 */
function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div>
      <a href={checkoutUrl} target="_self">
        <p>Continue to Checkout &rarr;</p>
      </a>
      <br />
    </div>
  );
}

/**
 * @typedef {{
 *   cart: OptimisticCart<CartApiQueryFragment | null>;
 *   layout: CartLayout;
 * }} CartSummaryProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/cart/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCart} OptimisticCart */
