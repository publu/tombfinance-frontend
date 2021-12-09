import Card from './Card';

export default function TokenStatsCard({ token, ftmPrice, usdPrice, mktCap, circSupply, totalSupply, disabled, link }) {
  return (
    <Card paddingClass="px-8 py-4" innerClass="flex flex-col text-center items-center">
      <div className="flex justify-between items-center gap-x-6 mb-3 mt-2">
        <div className="flex flex-shrink-0">
          <img src={`../assets/img/${token}.svg`} width={25} height={25} />
          <span className="font-Amarante text-lg tracking-wider">${token}</span>
        </div>
        <div className="flex flex-shrink-0 md:flex justify-center items-center align-middle border-1 cursor-pointer border-bright-purple rounded-xl p-1 py-2">
          <img src={'/meta-mask.svg'} width={42} height={30} />
        </div>
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
