import React, { useMemo } from 'react';
import { useWallet } from 'use-wallet';
import moment from 'moment';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Card, CardContent, Button, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';

import useRedeemOnMasonry from '../../hooks/useRedeemOnMasonry';
import useStakedBalanceOnMasonry from '../../hooks/useStakedBalanceOnMasonry';
import { getDisplayBalance } from '../../utils/formatBalance';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useFetchMasonryAPR from '../../hooks/useFetchMasonryAPR';

import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useTotalStakedOnMasonry from '../../hooks/useTotalStakedOnMasonry';
import useClaimRewardCheck from '../../hooks/masonry/useClaimRewardCheck';
import useWithdrawCheck from '../../hooks/masonry/useWithdrawCheck';
import ProgressCountdown from './components/ProgressCountdown';
import MasonryImage from '../../assets/img/masonry.png';
import { createGlobalStyle } from 'styled-components';

import MasonryItem from '../../components/MasonryItem';

const Masonry = () => {
  const { account } = useWallet();
  const { onRedeem } = useRedeemOnMasonry();
  const stakedBalance = useStakedBalanceOnMasonry();
  const currentEpoch = useCurrentEpoch();
  const cashStat = useCashPriceInEstimatedTWAP();
  const totalStaked = useTotalStakedOnMasonry();
  const masonryAPR = useFetchMasonryAPR();
  const canClaimReward = useClaimRewardCheck();
  const canWithdraw = useWithdrawCheck();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();

  return (
    <Page>
      {!!account ? (
        <>
          <div className="flex flex-col mr-0 sm:mr-8 items-center mt-10 mb-10">
            <span className="text-6xl font-Amarante tracking-tighter">Masonry</span>
          </div>

          <div className="xl:w-9/12 mx-auto gap-x-10 px-10">
            <MasonryItem title={'APR'} value={masonryAPR.toFixed(2) + '%'} />
          </div>
          <div className="grid md:grid-cols-2 xl:w-9/12 mx-auto gap-x-10 px-10">
            <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
            <MasonryItem title={'Current Epoch'} value={Number(currentEpoch)} />
            <MasonryItem title={'TWAP'} value={scalingFactor} />
            <MasonryItem title={'TSHARES Staked'} value={getDisplayBalance(totalStaked)} />
          </div>

          <div className="grid lg:grid-cols-2 mx-auto w-9/12 lg:w-1/2 mt-16 gap-x-4 gap-y-10">
            <Stake />
            <Harvest />
          </div>

          <div className="flex justify-center mt-12">
            <button
              disabled={stakedBalance.eq(0) || (!canWithdraw && !canClaimReward)}
              onClick={onRedeem}
              className={`${
                stakedBalance.eq(0) || (!canWithdraw && !canClaimReward) ? 'btn-disabled cursor-not-allowed' : 'btn'
              } flex font-light justify-center items-center lg:px-32`}
            >
              <div className="mr-2 flex ">
                <img src="/internal.svg" width={20} height={20} />
              </div>
              Claim and Withdraw
            </button>
          </div>
        </>
      ) : (
        <UnlockWallet />
      )}
    </Page>
  );
};

export default Masonry;
