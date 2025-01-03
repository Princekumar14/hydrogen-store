import { X } from 'lucide-react';
import { createContext, useContext, useEffect, useState } from 'react';

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 * @param {{
 *   children?: React.ReactNode;
 *   type: AsideType;
 *   heading: React.ReactNode;
 * }}
 */
export function Aside({ children, heading, type }) {
  const { type: activeType, close } = useAside();
  const expanded = type === activeType;

  useEffect(() => {
    if (!expanded) return;

    const scrollY = window.scrollY;

    const originalStyles = {
      overflow: document.body.style.overflow,
      height: document.body.style.height,
      position: document.body.style.position,
      width: document.body.style.width,
      top: document.body.style.top,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `${scrollY}px`;

    return () => {
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.height = originalStyles.height;
      document.body.style.position = originalStyles.position;
      document.body.style.width = originalStyles.width;
      document.body.style.top = originalStyles.top;

      window.scrollTo(0, scrollY);
    }


  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);

  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      role="dialog"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={close}
      />

      {/* Aside panel */}
      <aside
        className={`absolute top-0 right-0 h-[100dvh] w-full max-w-md flex flex-col bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${expanded ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header  */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray">
          <h3
            className='font-playfair text-xl text-navy'
          >{heading}</h3>

          <button
            onClick={close}
            className='p-2 -mr-2 text-gray font-normal hover:text-gray hover:font-medium transition-colors duration-300'
          >
            <X className='w-5 h-5' />
          </button>

        </header>

        {/* Content */}
        <main className="flex-1 overlay-y-auto">{children}</main>
      </aside>
    </div>
  );


  // useEffect(() => {
  //   const abortController = new AbortController();

  //   if (expanded) {
  //     document.addEventListener(
  //       'keydown',
  //       function handler(event) {
  //         if (event.key === 'Escape') {
  //           close();
  //         }
  //       },
  //       {signal: abortController.signal},
  //     );
  //   }
  //   return () => abortController.abort();
  // }, [close, expanded]);


  // return (
  //   <div
  //     aria-modal
  //     className={`overlay ${expanded ? 'expanded' : ''}`}
  //     role="dialog"
  //   >
  //     <button className="close-outside" onClick={close} />
  //     <aside>
  //       <header>
  //         <h3>{heading}</h3>
  //         <button className="close reset" onClick={close} aria-label="Close">
  //           &times;
  //         </button>
  //       </header>
  //       <main>{children}</main>
  //     </aside>
  //   </div>
  // );
}

const AsideContext = createContext(null);

Aside.Provider = function AsideProvider({ children }) {
  const [type, setType] = useState('closed');
  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}

/** @typedef {'search' | 'cart' | 'mobile' | 'closed' | 'wishlist'} AsideType */
/**
 * @typedef {{
 *   type: AsideType;
 *   open: (mode: AsideType) => void;
 *   close: () => void;
 * }} AsideContextValue
 */

/** @typedef {import('react').ReactNode} ReactNode */
