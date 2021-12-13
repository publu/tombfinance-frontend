import CountUp from 'react-countup';

export default function Tvl({ TVL }) {
  return (
    <div className="flex flex-col gap-y-5 sm:flex-row sm:gap-y-0 mx-auto mt-4 sm:mt-16 items-center sm:items-baseline">
      <div className="flex flex-col mr-0 sm:mr-8 items-center">
        <span className="text-5xl font-Amarante tracking-tighter">Tomb Finance</span>
        <span className="text-xs">The algorithmic stablecoin backed by FTM</span>
      </div>
      <div style={{ paddingTop: '1.6rem' }} className="btn btn-transparent p-6 text-center flex h-11 items-center">
        <span className="text-xs font-extrabold mr-2">TVL</span>
        <CountUp
          className="text-2xl font-Amarante"
          style={{ fontSize: '25px', lineHeight: '25px' }}
          end={TVL}
          separator=","
          prefix="$"
        />
      </div>
    </div>
  );
}
