import React, { useMemo } from 'react';
import styled from 'styled-components';

import TokenSymbol from '../../../components/TokenSymbol';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import CardIcon from '../../../components/CardIcon';
import useClaimRewardTimerMasonry from '../../../hooks/masonry/useClaimRewardTimerMasonry';
import useClaimRewardCheck from '../../../hooks/masonry/useClaimRewardCheck';
import ProgressCountdown from './../components/ProgressCountdown';
import useHarvestFromMasonry from '../../../hooks/useHarvestFromMasonry';
import useEarningsOnMasonry from '../../../hooks/useEarningsOnMasonry';
import useTombStats from '../../../hooks/useTombStats';
import { getDisplayBalance } from '../../../utils/formatBalance';

import MasonryItem from '../../../components/MasonryItem';

import Card from '../../../components/Card.js';

const Harvest: React.FC = () => {
  const tombStats = useTombStats();
  const { onReward } = useHarvestFromMasonry();
  const earnings = useEarningsOnMasonry();
  const canClaimReward = useClaimRewardCheck();

  const tokenPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );

  const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const { from, to } = useClaimRewardTimerMasonry();

  return (
    <div className="flex flex-col items-center">
      <Card innerClass="pt-12 pb-6 px-10" className="relative w-full text-center text-3xl mt-4">
        <div className="flex justify-center absolute w-full left-0 -top-10">
          <div className="flex justify-center w-20 h-20 rounded-full bg-tombGradient">
            <TokenSymbol symbol="TOMB" />
          </div>
        </div>
        <div className="font-semibold font-Poppins text-sm text-tomb-purple">TSHARE Staked</div>
        <div className="font-Amarante mb-1">{getDisplayBalance(earnings)}</div>
        <div className="flex justify-center font-semibold font-Poppins text-sm gap-x-1">
          <p className="text-tomb-purple">USD</p>
          <p> {`≈ $${earnedInDollars}`}</p>
        </div>
        <div className="flex justify-center gap-x-2 mt-4">
          <button
            onClick={onReward}
            disabled={earnings.eq(0) || !canClaimReward}
            className={`btn px-6 ${earnings.eq(0) || !canClaimReward ? 'btn-disabled cursor-not-allowed' : ''}`}
          >
            Claim Rewards
          </button>
        </div>
      </Card>
      <div className="flex">
        {canClaimReward ? (
          ''
        ) : (
          //@ts-ignore
          <MasonryItem title="" value="" time={true} from={from} to={to} description="Claim reward in" />
        )}
      </div>
    </div>
  );
};

export default Harvest;
