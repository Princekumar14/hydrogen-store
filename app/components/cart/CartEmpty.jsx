import {Link} from '@remix-run/react';
import { useAside } from '../Aside';

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
         Pending work
        </div>
    );
    // return (
    //     <div hidden={hidden}>
    //     <br />
    //     <p>
    //         Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
    //         started!
    //     </p>
    //     <br />
    //     <Link to="/collections" onClick={close} prefetch="viewport">
    //         Continue shopping →
    //     </Link>
    //     </div>
    // );
}
export default CartEmpty;