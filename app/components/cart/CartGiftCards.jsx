import { CartForm } from '@shopify/hydrogen';
import { Ticket } from 'lucide-react';
import React, { useRef, useState } from 'react'


/**
 * @param {{
*   giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
* }}
*/
export const CartGiftCards = ({giftCardCodes}) => {


        const [showInput, setShowInput] = useState(false);
        const appliedGiftCardCodes = useRef([]);
        const inputRef = useRef(null);
        const codes = giftCardCodes?.map(({lastCharacters}) => `***${lastCharacters}`) || [];

        function saveAppliedCode(code) {
            if(!inputRef.current) return;

            const formattedCode = code.replace(/\s/g, ''); // Remove spaces
            if (!appliedGiftCardCodes.current.includes(formattedCode)) {
                appliedGiftCardCodes.current.push(formattedCode);
            }
            inputRef.current.value = '';
            setShowInput(false);
        }

        return (
            <div className="py-4 border-t border-gray-100">
                {/* Applied Discount */}
                {codes.lenght > 0 && (
                    <>
                        <div>
                        </div>
                    </>
                )}

                {/* Discount Input */}
                {showInput ? (
                    <>
                        <UpdateGiftCardForm 
                            giftCardCodes={appliedGiftCardCodes}
                            saveAppliedCode={saveAppliedCode}
                        >
                            {(fetcher) => {
                                const isLoading = fetcher.state !== 'idle';

                                return(
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <input 
                                                ref={inputRef}
                                                type="text" 
                                                name="giftCardCode" 
                                                placeholder='Enter gift card code'
                                                className='w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-brand-navy font-source text-sm'
                                                disabled={isLoading}
                                            />
                                            {isLoading && (
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                                    <Loader2 className='w-4 h-4 animate-spin text-gray-400'/>

                                                </div>
                                            )}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type='submit'
                                                className={`px-4 py-2 bg-brand-navy text-white rounded text-sm font-source transition-colors duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-navyLight'}`}
                                            >
                                                Apply
                                            </button>
                                            <button
                                                type='button'
                                                onClick={()=> setShowInput(false)}
                                                className={`px-4 py-2 bg-brand-navy text-white rounded text-sm font-source transition-colors duration-300`}
                                                disabled={isLoading}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )
                            }}

                        </UpdateGiftCardForm>
                    </>
                ):
                (
                    <button 
                        onClick={()=> setShowInput(true)}
                        className='text-sm text-brand-gold hover:text-goldDark font-source transition-colors inline-flex items-center gap-2'
                    >
                        <Ticket className="w-4 h-4"/>
                        Add Gift Card
                    </button>
                )}

            </div>

        );


    // const appliedGiftCardCodes = useRef([]);
    // const giftCardCodeInput = useRef(null);
    // const codes =
    //   giftCardCodes?.map(({lastCharacters}) => `***${lastCharacters}`) || [];
  
    // function saveAppliedCode(code) {
    //   const formattedCode = code.replace(/\s/g, ''); // Remove spaces
    //   if (!appliedGiftCardCodes.current.includes(formattedCode)) {
    //     appliedGiftCardCodes.current.push(formattedCode);
    //   }
    //   giftCardCodeInput.current.value = '';
    // }
  
    // function removeAppliedCode() {
    //   appliedGiftCardCodes.current = [];
    // }
  
    // return (
    //   <div>
    //     {/* Have existing gift card applied, display it with a remove option */}
    //     <dl hidden={!codes.length}>
    //       <div>
    //         <dt>Applied Gift Card(s)</dt>
    //         <UpdateGiftCardForm>
    //           <div className="cart-discount">
    //             <code>{codes?.join(', ')}</code>
    //             &nbsp;
    //             <button onSubmit={() => removeAppliedCode}>Remove</button>
    //           </div>
    //         </UpdateGiftCardForm>
    //       </div>
    //     </dl>
  
    //     {/* Show an input to apply a discount */}
    //     <UpdateGiftCardForm
    //       giftCardCodes={appliedGiftCardCodes.current}
    //       saveAppliedCode={saveAppliedCode}
    //     >
    //       <div>
    //         <input
    //           type="text"
    //           name="giftCardCode"
    //           placeholder="Gift card code"
    //           ref={giftCardCodeInput}
    //         />
    //         &nbsp;
    //         <button type="submit">Apply</button>
    //       </div>
    //     </UpdateGiftCardForm>
    //   </div>
    // );
}


/**
 * @param {{
*   giftCardCodes?: string[];
*   saveAppliedCode?: (code: string) => void;
*   removeAppliedCode?: () => void;
*   children: React.ReactNode | ((fetcher: any) => React.ReactNode);
* }}
*/
function UpdateGiftCardForm({giftCardCodes, saveAppliedCode, children}) {
 return (
   <CartForm
     route="/cart"
     action={CartForm.ACTIONS.GiftCardCodesUpdate}
     inputs={{
       giftCardCodes: giftCardCodes || [],
     }}
   >
     {(fetcher) => {
       const code = fetcher.formData?.get('giftCardCode');
       if (code) saveAppliedCode && saveAppliedCode(code);
       return typeof children === 'function' ? children(fetcher) : children;
     }}
   </CartForm>
 );
}
