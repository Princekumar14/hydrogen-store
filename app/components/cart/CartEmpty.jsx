import {Link} from '@remix-run/react';
import { useAside } from '../Aside';
import { ArrowRight, ShoppingBag } from 'lucide-react';

/**
 * @param {{
*   hidden: boolean;
*   layout?: CartMainProps['layout'];
* }}
*/

const CartEmpty = ({hidden = false}) => {
    const {close} = useAside();

    if(hidden) return null;

    return (
        <div
            className={`h-full flex flex-col items-center justify-center text-center p-6`}
        >
            {/* Icon  */}
            <div className="relative mb-8">
                <div className='absolute inset-0 bg-cream rounded-full scale-[1.8] blur-xl opacity-50'/>
                <div className='relative w-20 h-20 bg-cream rounded-full flex items-center justify-center'>
                    <ShoppingBag className="w-8 h-8 text-navy" />

                </div>
            </div>
            {/* Content  */}
            <div className="max-w-md space-y-4">
                <h2 className="font-playfair text-2xl text-navy">Your cart is empty</h2>
                <p className="text-lg">
                    Discover our collection of handcrafted footwear, where traditional artisanship meets contemporary elegance.
                </p>
            </div>
            {/* primary CTA  */}
            <Link
                prefetch="viewport"
                onClick={close}
                to="/collections/all"
                className="inline-flex items-center justify-center px-8 py-4 mt-6 bg-navy text-white font-source font-medium hover:bg-navyLight transition-all duration-300"
            >
                Explore Our Products
                <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            {/* collection/all CTA  */}
            <div className="w-full pt-8 space-y-3 border-t border-gray-100 mt-8">
                <p className='font-source text-sm text-gray font-normal uppercase  tracking-wide'>
                    Feature products
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <Link
                        prefetch="intent"
                        onClick={close}
                        to="/collections/all"
                        className="text-gold hover:text-goldDark transition-colors duration-300"
                    >
                        View All
                    </Link>
                </div>


            </div>
            {/* Contact Information  */}
            <div className="text-sm text-gray-500 pt-6">
                <p className="font-source">
                    Need assistance? Contact our atelier
                </p>
                <a href="mailto:sunny@hydrogen.com"
                    className='font-source text-gold hover:text-goldDark transition-colors duration-300'
                >
                sunny@hydrogen.com
                </a>
            </div>

        </div>
    );
}
export default CartEmpty;