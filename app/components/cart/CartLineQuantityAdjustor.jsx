import { Minus, Plus } from "lucide-react";
import CartLineUpdateButton from "./CartLineUpdateButton";
import { CartLineRemoveButton } from "./CartLineRemoveButton";

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 * @param {{line: CartLine}}
 */
const CartLineQuantityAdjustor = ({line}) => {
    if(!line || typeof line.quantity === 'undefined') return null;

    const {id: lineId, quantity, isOptimistic} = line;
    // const prevQuantity = Number(Math.max(0, quantity - 1)).toFixed(0);
    const prevQuantity = Number(Math.round(quantity - 1));
    const nextQuantity = Number(Math.round(quantity + 1));
    console.log(prevQuantity, "prevqty")


  return (
    <div className="flex items-center gap-2">
        <CartLineUpdateButton
          lines={[{id: lineId, quantity: prevQuantity}]}
        >
          <button
            disabled={quantity <= 1}
            className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${quantity <=1 ? 'border-gray-200 text-gray-300': 'border-gray-200 hover:border-gray-400 text-gray-500'}`}
          >
            <Minus className="w-4 h-4"/>
          </button>
            
        </CartLineUpdateButton>
        <span className="font-source w-8 text-center">
            {quantity}  
        </span>
        <CartLineUpdateButton
          lines={[{id: lineId, quantity: nextQuantity}]}
        >
          <button
            className={`w-8 h-8 flex items-center justify-center rounded border transition-colors border-gray-200 hover:border-gray-400 text-gray-500`}
          >
            <Plus className="w-4 h-4"/>
          </button>
            
        </CartLineUpdateButton>

        <CartLineRemoveButton 
          lineIds={[lineId]}
          disabled={isOptimistic ===  true}
        />
        
    </div>
  );
}
export default CartLineQuantityAdjustor;

/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */

