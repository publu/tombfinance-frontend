import React, { useMemo } from 'react';
import styled from 'styled-components';

// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdrawCheck from '../../../hooks/masonry/useWithdrawCheck';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useTombFinance from '../../../hooks/useTombFinance';
import ProgressCountdown from './../components/ProgressCountdown';
import useStakedBalanceOnMasonry from '../../../hooks/useStakedBalanceOnMasonry';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useUnstakeTimerMasonry from '../../../hooks/masonry/useUnstakeTimerMasonry';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToMasonry from '../../../hooks/useStakeToMasonry';
import useWithdrawFromMasonry from '../../../hooks/useWithdrawFromMasonry';

import MasonryItem from '../../../components/MasonryItem';

import Card from '../../../components/Card.js';

const Stake: React.FC = () => {
  const tombFinance = useTombFinance();
  const [approveStatus, approve] = useApprove(tombFinance.TSHARE, tombFinance.contracts.Masonry.address);

  const tokenBalance = useTokenBalance(tombFinance.TSHARE);
  const stakedBalance = useStakedBalanceOnMasonry();
  const { from, to } = useUnstakeTimerMasonry();

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('TSHARE', tombFinance.TSHARE);
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  // const isOldBoardroomMember = boardroomVersion !== 'latest';

  const { onStake } = useStakeToMasonry();
  const { onWithdraw } = useWithdrawFromMasonry();
  const canWithdrawFromMasonry = useWithdrawCheck();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'TShare'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'TShare'}
    />,
  );

  return (
    <div className="flex flex-col items-center w-96">
      <Card
        className="mt-4 relative w-full text-center text-3xl"
        innerClass="pt-12 pb-6 px-10 text-center text-3xl w-96"
      >
        <div className="flex justify-center absolute w-full left-0 -top-10">
          <div className="flex justify-center w-20 h-20 rounded-full bg-tombGradient">
            <TokenSymbol symbol="TSHARE" />
          </div>
        </div>
        <div className="font-semibold font-Poppins text-sm text-tomb-purple">TSHARE Staked</div>
        <div className="font-Amarante mb-1">{getDisplayBalance(stakedBalance)}</div>
        <div className="flex justify-center font-semibold font-Poppins text-sm gap-x-1">
          <p className="text-tomb-purple">USD</p>
          <p> {`≈ $${tokenPriceInDollars}`}</p>
        </div>
        <div className="flex justify-center gap-x-2 mt-4">
          {approveStatus !== ApprovalState.APPROVED ? (
            <button className="btn" disabled={approveStatus !== ApprovalState.NOT_APPROVED} onClick={approve}>
              Approve TSHARE
            </button>
          ) : (
            <>
              <button
                className={`btn px-6 ${!canWithdrawFromMasonry ? 'btn-disabled cursor-not-allowed' : ''}`}
                disabled={!canWithdrawFromMasonry}
                onClick={onPresentWithdraw}
              >
                -
              </button>
              <button className="btn px-6" onClick={onPresentDeposit}>
                +
              </button>
            </>
          )}
        </div>
      </Card>
      <div className="flex mt-4">
        {canWithdrawFromMasonry ? (
          ''
        ) : (
          //@ts-ignore
          <MasonryItem title="" value="" time={true} from={from} to={to} description="Withdraw possible in" />
        )}
      </div>
    </div>
  );
};

export default Stake;
