import { React, useMemo } from 'react';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useLocation } from 'react-router-dom';
import useTombStats from '../hooks/useTombStats';
import usetShareStats from '../hooks/usetShareStats';
import useBondStats from '../hooks/useBondStats';

import tombIcon from '../assets/img/TOMB.svg';
import tshare from '../assets/img/TSHARE.svg';
import tbond from '../assets/img/TBOND.svg';

import { numberWithCommas } from '../utils/utils';

import { tomb as tombProd, tShare as tShareProd } from '../tomb-finance/deployments/deployments.mainnet.json';

import AccountButton from './Nav_Old/AccountButton';

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
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();

  const { pathname } = useLocation();

  let tomb;
  let tShare;
  tomb = tombProd;
  tShare = tShareProd;

  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <div className="w-screen">
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
                <span className="font-Amarante text-2xl md:text-3xl cursor-pointer select-none textShadowLg">
                  Tomb Finance
                </span>
              </div>
              <div className="flex justify-center sm:items-stretch sm:justify-start md:mx-6 md:mr-16">
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4 lg:space-x-10 tracking-wide">
                    {navigation.map((item) => {
                      return (
                        <div
                          className={`
                            ${pathname == item.href ? 'nav-selected textShadowLgSelected' : 'hover:text-white'}
                            
                          `}
                        >
                          {item.name === 'Docs' ? (
                            <a href="https://docs.tomb.finance/" target="_blank" rel="noopener noreferrer">
                              <span className="text-sm md:text-md font-semibold cursor-pointer">{item.name}</span>
                            </a>
                          ) : (
                            <Link key={item.name} to={item.href} aria-current={item.current ? 'page' : undefined}>
                              <span className="text-sm md:text-md font-semibold cursor-pointer">{item.name}</span>
                            </Link>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center flex-shrink-0 pr-2 sm:static sm:inset-auto sm:pr-0">
                <AccountButton className="hidden md:block" text="Connect Wallet" />
              </div>
            </div>
            <div className="flex justify-center gap-x-6 mt-3">
              <div className="flex items-center flex-col gap-y-2 sm:flex-row">
                <img src={tombIcon} width={25} height={25} />
                <span className="ml-2 font-semibold text-sm">{tombPriceInFTM ? tombPriceInFTM : '-.----'} FTM</span>
              </div>
              <div className="flex items-center flex-col gap-y-2 sm:flex-row">
                <img src={tbond} width={25} height={25} />
                <span className="ml-2 font-semibold text-sm">{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} FTM</span>
              </div>
              <div className="flex items-center flex-col gap-y-2 sm:flex-row">
                <img src={tshare} width={25} height={25} />
                <span className="ml-2 font-semibold text-sm">
                  {tSharePriceInFTM ? numberWithCommas(tSharePriceInFTM) : '-.----'} FTM
                </span>
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
        </div>
      )}
    </Disclosure>
  );
}
