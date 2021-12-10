import useTombFinance from '../hooks/useTombFinance';

const LiquidityButton = ({ bank }) => {
  const tombFinance = useTombFinance();
  const tombAddr = tombFinance.TOMB.address;
  const tshareAddr = tombFinance.TSHARE.address;

  let pairName;
  let uniswapUrl;
  if (bank.depositTokenName.includes('TOMB')) {
    pairName = 'TOMB-FTM pair';
    uniswapUrl = 'https://spookyswap.finance/add/FTM/' + tombAddr;
  } else {
    pairName = 'TSHARE-FTM pair';
    uniswapUrl = 'https://spookyswap.finance/add/FTM/' + tshareAddr;
  }
  return (
    <a
      target="_blank"
      href={uniswapUrl}
      rel="noreferrer"
      className="btn flex font-light w-full md:mx-4 md:w-7/12 text-center titems-center px-2"
    >
      <span className="text-center w-full">
        👻 Provide liquidity for {pairName} <br className="md:hidden" /> now on SpookySwap 👻
      </span>
    </a>
  );
};

export default LiquidityButton;
