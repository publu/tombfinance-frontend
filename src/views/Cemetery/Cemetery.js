import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';

import { Box, Container, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from '../../components/CemeteryCard';
import CemeteryPoolCard from '../../components/CemeteryPoolCard';
import MasonryItem from '../../components/MasonryItem';
import LiquidityButton from '../../components/LiquidityButton';
import CemeteryImage from '../../assets/img/cemetry.png';
import { createGlobalStyle } from 'styled-components';

import useBanks from '../../hooks/useBanks';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';

import graveDark from '../../assets/img/grave-dark.svg';
import graveLight from '../../assets/img/grave-light.svg';
import fantom from '../../assets/img/fantom.svg';
import danger from '../../assets/img/danger.svg';
import boo from '../../assets/img/boo.svg';
import zapImg from '../../assets/img/zap.svg';
import linkImg from '../../assets/img/link.svg';
import useTombStats from '../../hooks/useTombStats';
import useShareStats from '../../hooks/usetShareStats';
import { getDisplayBalance } from '../../utils/formatBalance';
import useEarnings from '../../hooks/useEarnings';
import useHarvest from '../../hooks/useHarvest';
import useRedeem from '../../hooks/useRedeem';
import CemeterySection from '../../components/CemeterySection';

import TSHARE from '../../assets/img/TSHARE.svg';
import TBOND from '../../assets/img/TBOND.svg';
import TOMB from '../../assets/img/TOMB.svg';
// import fantom from '../../assets/img/fantom.svg';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${CemeteryImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const Cemetery = () => {
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);

  const [showLegacy, setShowLegacy] = useState(false);
  const [showTSHARE, setShowTSHARE] = useState(false);
  const [showTomb, setShowTomb] = useState(false);
  const legacyRef = useRef(null);
  const TSHARERef = useRef(null);
  const tombRef = useRef(null);

  const showTombData = useBank('TombFtmLPTShareRewardPool');
  const showTSHAREData = useBank('TshareFtmLPTShareRewardPool');

  useEffect(() => {
    if (!showLegacy) return;
    setShowTomb(false);
    setShowTSHARE(false);
    legacyRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [showLegacy]);
  useEffect(() => {
    if (!showTSHARE) return;
    setShowTomb(false);
    setShowLegacy(false);
    TSHARERef.current.scrollIntoView({ behavior: 'smooth' });
  }, [showTSHARE]);
  useEffect(() => {
    if (!showTomb) return;
    setShowLegacy(false);
    setShowTSHARE(false);
    tombRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [showTomb]);

  return (
    <Page>
      <div className="mb-16">
        <div className="flex flex-col mr-0 sm:mr-8 items-center mt-10 mb-10">
          <span className="text-6xl font-Amarante tracking-tighter">Cemetery</span>
          <span className="text-xs mt-1">Earn TSHARE by staking LP</span>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-center items-center mx-auto gap-x-8 gap-y-12 ">
          <CemeteryCard
            title="TOMB-FTM-LP"
            descriptionTitle="Deposit:"
            description="TOMB-FTM-LP Earn TSHARE"
            buttonText="View"
            icon1={graveDark}
            icon2={fantom}
            onClick={() => setShowTomb(!showTomb)}
          />
          <CemeteryCard
            title="TSHARE-FTM-LP"
            descriptionTitle="Deposit:"
            description="TSHARE-FTM-LP Earn TSHARE"
            buttonText="View"
            icon1={graveLight}
            icon2={fantom}
            onClick={() => setShowTSHARE(!showTSHARE)}
          />
        </div>
        <div className="flex max-w-9/12 mx-auto justify-center mt-16">
          <button
            onClick={() => setShowLegacy(!showLegacy)}
            className="btn flex font-light justify-center items-center md:px-32"
          >
            <div className="mr-2 flex flex-shrink-0">
              <img src={danger} width={20} height={20} />
            </div>
            View Legacy Pools
          </button>
        </div>
        <div className="mt-12">
          {showLegacy && (
            <>
              <span ref={legacyRef} />
              <div className="flex flex-row justify-center w-9/12 md:w-1/2 mx-auto mt-12">
                <CemeteryCard
                  title="TOMB-FTM-LP"
                  description="Deposiy TOMB-FTM-LP Earn TOMB"
                  buttonText="View"
                  icon1={graveDark}
                  icon2={graveLight}
                />
              </div>
              <div className="grid grid-cols-2 md:flex justify-center gap-x-4 gap-y-8 w-3/4 md:w-1/2 mx-auto mt-8">
                <CemeteryPoolCard
                  title="WFTM"
                  description="Earn Tomb"
                  icon={fantom}
                  buttonText="View"
                  onClick={() => null}
                />
                <CemeteryPoolCard
                  title="BOO"
                  description="Earn Tomb"
                  icon={boo}
                  buttonText="View"
                  onClick={() => null}
                />
                <CemeteryPoolCard
                  title="SHIBA"
                  description="Earn Tomb"
                  icon={fantom}
                  buttonText="View"
                  onClick={() => null}
                />
                <CemeteryPoolCard
                  title="ZOO"
                  description="Earn Tomb"
                  icon={fantom}
                  buttonText="View"
                  onClick={() => null}
                />
              </div>
            </>
          )}
          {showTomb && (
            <>
              <span ref={tombRef} />
              <CemeterySection
                card1={{ icon1: TSHARE, button1Text: 'Claim', tokenName: 'TSHARE Earned' }}
                card2={{
                  icon1: TOMB,
                  icon2: fantom,
                  button1Text: 'Approve TOMB-FTM-LP',
                  tokenName: 'TOMB-FTM-LP Staked',
                }}
                card3={{
                  icon1: TOMB,
                  icon2: fantom,
                  button1Text: '-',
                  button2Text: <img width={12} height={12} src={zapImg} />,
                  button3Text: '+',
                  tokenName: 'TOMB-FTM-LP Staked',
                }}
                bank={showTombData}
              />
            </>
          )}
          {showTSHARE && (
            <>
              <span ref={TSHARERef} />
              <CemeterySection
                card1={{ icon1: TSHARE, button1Text: 'Claim', tokenName: 'TSHARE Earned' }}
                card2={{
                  icon1: TSHARE,
                  icon2: fantom,
                  button1Text: 'Approve TSHARE-FTM-LP',
                  tokenName: 'TSHARE-FTM-LP Staked',
                }}
                card3={{
                  icon1: TSHARE,
                  icon2: fantom,
                  button1Text: '-',
                  button2Text: <img width={12} height={12} src={zapImg} />,
                  button3Text: '+',
                  tokenName: 'TSHARE-FTM-LP Staked',
                }}
                bank={showTSHAREData}
              />
            </>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Cemetery;
