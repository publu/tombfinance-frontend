import React, { useMemo } from 'react';
import CemeteryBuyCard from './CemeteryBuyCard';
import useTombStats from '../hooks/useTombStats';
import useShareStats from '../hooks/usetShareStats';
import { getDisplayBalance } from '../utils/formatBalance';
import useEarnings from '../hooks/useEarnings';
import useHarvest from '../hooks/useHarvest';
import useRedeem from '../hooks/useRedeem';
import useStatsForPool from '../hooks/useStatsForPool';
import linkImg from '../assets/img/link.svg';
import MasonryItem from './MasonryItem';
import LiquidityButton from './LiquidityButton';

export default function CemetrySection({ bank, icon1, icon2, buttonText1, buttonText2 }) {
  const tombStats = useTombStats();
  const tShareStats = useShareStats();

  const tombStatsOnPool = useStatsForPool(bank);

  const tombDataStats = bank.earnTokenName === 'TSHARE' ? tShareStats : tombStats;
  const tokenPriceInDollars = useMemo(
    () => (tombDataStats ? Number(tombDataStats.priceInDollars).toFixed(2) : null),
    [tombDataStats],
  );
  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
  const onTombReward = useHarvest(bank).onReward;
  const onTombRedeem = useRedeem(bank).onRedeem;

  const showTombData = {
    tokenName: bank.earnTokenName === 'TSHARE' ? 'TSHARE' : 'TOMB',
    tombDataStats: bank.earnTokenName === 'TSHARE' ? tShareStats : tombStats,
    earnedInDollars: (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2),
    bank: bank,
    statsOnPool: tombStatsOnPool,
  };

  return (
    <div className="w-9/12 md:w-3/4 mx-auto">
      <div className="grid grid-cols-1 md:flex justify-center gap-x-4 w-full">
        <MasonryItem
          title="APR"
          value={`${(showTombData.bank.closedForStaking ? '0.00' : showTombData.statsOnPool?.yearlyAPR) || '--.--'}%`}
        />
        <MasonryItem
          title="Daily APRt"
          value={`${(showTombData.bank.closedForStaking ? '0.00' : showTombData.statsOnPool?.dailyAPR) || '--.--'}%`}
        />
        <MasonryItem title="TVL" value={`$${showTombData.statsOnPool?.TVL || '--.--'}`} />
      </div>
      <div className="grid md:grid-cols-2 md:w-3/4 mx-auto mt-20 gap-x-6">
        <CemeteryBuyCard
          buttonText={buttonText1}
          coinValue={getDisplayBalance(earnings)}
          dollarValue={`$${showTombData.earnedInDollars}`}
          disabled={earnings.eq(0)}
          tokenName={`${showTombData.tokenName} Earned`}
          icon1={icon1}
          icon2={icon2}
          onClick={onTombReward}
        />
        <CemeteryBuyCard
          buttonText={buttonText2}
          coinValue={getDisplayBalance(earnings)}
          dollarValue={`$${showTombData.earnedInDollars}`}
          disabled={earnings.eq(0)}
          tokenName={`${showTombData.tokenName} Earned`}
          icon1={icon1}
          icon2={icon2}
          onClick={onTombReward}
        />
      </div>

      <div className="flex w-full justify-center mt-12">
        <LiquidityButton bank={bank} />
      </div>
      <div className="flex w-full justify-center mt-4">
        <button
          onClick={() => onTombRedeem()}
          className="btn flex font-light w-full md:mx-4 md:w-7/12 text-center titems-center px-2 bg-bgColor"
        >
          <span className="flex justify-center text-center w-full">
            <div className="mr-2">
              <img src={linkImg} width={20} height={20} />
            </div>
            Claim and Withdraw
          </span>
        </button>
      </div>
    </div>
  );
}
