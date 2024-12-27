import { CartForm } from '@shopify/hydrogen'
import { X } from 'lucide-react'
import React from 'react'

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 * @param {{
*   lineIds: string[];
*   disabled: boolean;
* }}
*/
export const CartLineRemoveButton = ({lineIds, disabled}) => {
  return (
    <CartForm
      route='/cart'
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        disabled={disabled}
        className={`ml-3 text-gray-400 hover:text-gray-500 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <X className='w-4 h-4' />
      </button>
    </CartForm>  
  )
}
