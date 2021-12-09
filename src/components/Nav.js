import React from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

// import WalletIcon from '../assets/img/wallet.svg';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Cemetery', href: '/cemetery', current: false },
  { name: 'Masonry', href: '/masonry', current: false },
  { name: 'Pit', href: '/pit', current: false },
  { name: 'Regulations', href: '/regulations', current: false },
  { name: 'Docs', href: 'https://docs.tomb.finance/', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Nav() {
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-shrink-0 flex items-center mx-auto sm:mx-0">
                <span className="font-Amarante text-2xl cursor-pointer select-none">Tomb Finance</span>
              </div>
              <div className="flex justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4 lg:space-x-10 tracking-wide">
                    {navigation.map((item) => {
                      return (
                        <div
                          className={`
                            ${window.location.pathname == item.href ? 'nav-selected' : 'hover:text-white'}
                            
                          `}
                        >
                          {item.href == '/docs' ? (
                            <a href="https://docs.tomb.finance/" target="_blank" rel="noopener noreferrer">
                              <span className="text-xs font-semibold cursor-pointer">{item.name}</span>
                            </a>
                          ) : (
                            <Link key={item.name} to={item.href} aria-current={item.current ? 'page' : undefined}>
                              <span className="text-xs font-semibold cursor-pointer">{item.name}</span>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" className="hidden sm:flex flex-shrink-0 btn btn-connect">
                  {/* <WalletIcon className="md:mr-2" aria-hidden="true" /> */}
                  <span className="hidden md:block">Connect Wallet</span>
                </button>
              </div>
            </div>
            <div className="flex justify-center gap-x-4 mt-3">
              <div className="flex items-center">
                <img src={`/TOMB.svg`} width={25} height={25} />
                <span className="ml-2 font-semibold text-sm">1.1527 FTM</span>
              </div>
              <div className="flex items-center">
                <img src={`/TBOND.svg`} width={25} height={25} />
                <span className="ml-2 font-semibold text-sm">1.29 FTM</span>
              </div>
              <div className="flex items-center">
                <img src={`/TSHARE.svg`} width={25} height={25} />
                <span className="ml-2 font-semibold text-sm">8188 FTM</span>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(
                (item) =>
                  item.href !== '/regulations' && (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.href === window.location.pathname ? 'bg-gray-900' : 'hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium',
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ),
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
