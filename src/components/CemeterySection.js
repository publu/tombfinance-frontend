import React, { useMemo } from 'react';
import CemeteryBuyCard from './CemeteryBuyCard';
import CemeteryStakedCard from './CemeteryStakedCard';
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
import DepositModal from '../views/Bank/components/DepositModal';
import WithdrawModal from '../views/Bank/components/WithdrawModal';
import ZapModal from '../views/Bank/components/ZapModal';

import useApprove, { ApprovalState } from '../hooks/useApprove';

import useModal from '../hooks/useModal';
import useStake from '../hooks/useStake';
import useZap from '../hooks/useZap';

import useWithdraw from '../hooks/useWithdraw';
import useTokenBalance from '../hooks/useTokenBalance';
import useStakedBalance from '../hooks/useStakedBalance';
import useStakedTokenPriceInDollars from '../hooks/useStakedTokenPriceInDollars';

export default function CemetrySection({ bank, card1, card2, card3 }) {
  const tombStats = useTombStats();
  const tShareStats = useShareStats();

  const tombStatsOnPool = useStatsForPool(bank);

  const tombDataStats = bank.earnTokenName === 'TSHARE' ? tShareStats : tombStats;

  const tokenBalance = useTokenBalance(bank.depositToken);
  const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
  const tokenPriceInDollars = useMemo(
    () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
    [stakedTokenPriceInDollars],
  );

  const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);

  const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);
  const onTombReward = useHarvest(bank).onReward;
  const onTombRedeem = useRedeem(bank).onRedeem;

  const { onStake } = useStake(bank);
  const { onZap } = useZap(bank);
  const { onWithdraw } = useWithdraw(bank);

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onStake(amount);
        onDismissDeposit();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentZap, onDissmissZap] = useModal(
    <ZapModal
      decimals={bank.depositToken.decimal}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onZap(zappingToken, tokenName, amount);
        onDissmissZap();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      decimals={bank.depositToken.decimal}
      onConfirm={(amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        onWithdraw(amount);
        onDismissWithdraw();
      }}
      tokenName={bank.depositTokenName}
    />,
  );

  const showTombData = {
    tokenName: bank.earnTokenName === 'TSHARE' ? 'TSHARE' : 'TOMB',
    tombDataStats: bank.earnTokenName === 'TSHARE' ? tShareStats : tombStats,
    earnedInDollars: (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2),
    stakedInDollars: (
      Number(tokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal))
    ).toFixed(2),
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
          {...card1}
          coinValue={getDisplayBalance(earnings)}
          dollarValue={`$${showTombData.earnedInDollars}`}
          disabled={earnings.eq(0)}
          onClick={onTombReward}
        />

        {approveStatus !== ApprovalState.APPROVED ? (
          <CemeteryBuyCard
            {...card2}
            coinValue={getDisplayBalance(stakedBalance, bank.depositToken.decimal)}
            dollarValue={`$${showTombData.stakedInDollars}`}
            disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
            onClick={approve}
          />
        ) : (
          <CemeteryStakedCard
            {...card3}
            coinValue={getDisplayBalance(stakedBalance, bank.depositToken.decimal)}
            dollarValue={`$${showTombData.stakedInDollars}`}
            disabled={false}
            onClick={onPresentDeposit}
          />
        )}
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
