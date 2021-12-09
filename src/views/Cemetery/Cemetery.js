import React, { useState, useEffect } from 'react';
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
import CemeteryImage from '../../assets/img/cemetry.png';
import { createGlobalStyle } from 'styled-components';

import useBanks from '../../hooks/useBanks';

import graveDark from '../../assets/img/grave-dark.svg';
import graveLight from '../../assets/img/grave-light.svg';
import fantom from '../../assets/img/fantom.svg';
import danger from '../../assets/img/danger.svg';
import boo from '../../assets/img/boo.svg';
import linkImg from '../../assets/img/link.svg';

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

  useEffect(() => {
    if (!showLegacy) return;
    setShowTomb(false);
    setShowTSHARE(false);
  }, [showLegacy]);
  useEffect(() => {
    if (!showTSHARE) return;
    setShowTomb(false);
    setShowLegacy(false);
  }, [showTSHARE]);
  useEffect(() => {
    if (!showTomb) return;
    setShowLegacy(false);
    setShowTSHARE(false);
  }, [showTomb]);

  return (
    <Page>
      <div className="mb-16">
        <div className="flex flex-col mr-0 sm:mr-8 items-center mt-10 mb-10">
          <span className="text-6xl font-Amarante tracking-tighter">Cemetery</span>
          <span className="text-xs mt-1">Earn TSHARE by staking LP</span>
        </div>
        <div className="grid md:grid-cols-2 w-9/12 md:min-w-140 lg:w-1/2 mx-auto gap-x-10 gap-y-6 ">
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
            description="TOMB-FTM-LP Earn TSHARE"
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
        <div className="mt-24">
          {showLegacy && (
            <>
              <div className="w-9/12 md:w-1/2 mx-auto mt-12">
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
            <div className="w-9/12 md:w-1/2 mx-auto">
              <div className="md:w-1/2 mx-auto mt-12">
                <CemeteryCard
                  title="TOMB-FTM-LP"
                  description="Deposiy TOMB-FTM-LP Earn TOMB"
                  buttonText="View"
                  icon1={graveDark}
                  icon2={fantom}
                />
              </div>
              <div className="grid grid-cols-1 md:flex justify-center gap-x-4 w-full mt-8">
                <MasonryItem title="APR" value="247.62%" />
                <MasonryItem title="Daily APRt" value="0.68%" />
                <MasonryItem title="TVL" value="$142,494,777" />
              </div>
              <div className="flex w-full justify-center mt-12">
                <button
                  onClick={() => setShowLegacy(!showLegacy)}
                  className="btn flex font-light w-full md:mx-4 md:w-7/12 text-center titems-center px-2"
                >
                  <span className="text-center w-full">
                    👻 Provide liquidity for TOMB-FTM <br className="md:hidden" />
                    pair now on SpookySwap 👻
                  </span>
                </button>
              </div>
              <div className="flex w-full justify-center mt-4">
                <button className="btn flex font-light w-full md:mx-4 md:w-7/12 text-center titems-center px-2 bg-bgColor">
                  <span className="flex justify-center text-center w-full">
                    <div className="mr-2">
                      <img src={linkImg} width={20} height={20} />
                    </div>
                    Claim and Withdraw
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Cemetery;
