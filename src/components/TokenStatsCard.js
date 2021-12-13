import Card from './Card';
import metaMaskIcon from '../assets/img/meta-mask.svg';
import useWallet from 'use-wallet';

import TSHARE from '../assets/img/TSHARE.svg';
import TOMB from '../assets/img/TOMB.svg';
import TBOND from '../assets/img/TBOND.svg';
import useTombFinance from '../hooks/useTombFinance';

export default function TokenStatsCard({ token, ftmPrice, usdPrice, mktCap, circSupply, totalSupply, disabled, link }) {
  const { account } = useWallet();

  const tombFinance = useTombFinance();

  const icons = {
    TSHARE: TSHARE,
    TBOND: TBOND,
    TOMB: TOMB,
  };

  return (
    <Card innerClass="flex flex-col text-center items-center lg:w-56 px-4">
      <div className="flex justify-between items-center gap-x-6 mb-3 mt-2">
        <div className="flex items-center flex-shrink-0">
          <img className="mr-2" src={icons[token]} width={25} height={25} />
          <span className="font-Amarante text-lg tracking-wider">${token}</span>
        </div>

        <divx
          onClick={() => tombFinance.watchAssetInMetamask(token)}
          className="flex flex-shrink-0 md:flex hover:btn hover:p-1 hover:py-2 justify-center items-center align-middle border-1 cursor-pointer border-bright-purple rounded-xl p-1 py-2"
        >
          <img src={metaMaskIcon} width={42} height={30} />
        </divx>
      </div>

      <span className="text-tomb-purple text-xs font-semibold">Current Price</span>
      <div className="flex items-center">
        <span className="text-tomb-purple text-md font-Amarante mt-1 mr-1">FTM</span>
        <span className="text-white text-4xl font-Amarante mt-1">${ftmPrice}</span>
      </div>
      <div className="mt-1">
        <span className="text-tomb-purple text-md font-Amarante mr-1">USD</span>
        <span className="text-white text-md font-Amarante">${usdPrice}</span>
      </div>
      <span className="text-tomb-purple text-xs font-semibold mt-3">Market Cap:</span>
      <div className="">
        <span className="text-white text-lg font-semibold tracking-wider">${mktCap}</span>
      </div>
      <span className="text-tomb-purple text-xs font-semibold mt-3">Circulating Supply:</span>
      <div className="">
        <span className="text-white text-lg font-semibold tracking-wider">{circSupply}</span>
      </div>
      <span className="text-tomb-purple text-xs font-semibold mt-3">Total Supply:</span>
      <div className="">
        <span className="text-white text-lg font-semibold tracking-wider">{totalSupply}</span>
      </div>
      <div className="mt-4 mb-3">
        <button
          disabled
          className={`${disabled ? 'btn-disabled disabledGradient cursor-not-allowed' : 'btn font-bold'}`}
        >
          <a target="_blank" rel="noopener noreferrer" href={link}>
            BUY {token}
          </a>
        </button>
      </div>
    </Card>
  );
}
