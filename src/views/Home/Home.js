import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_tomb_cash.svg';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { tomb as tombTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';

import Tvl from '../../components/Tvl';
import TokenStatsCard from '../../components/TokenStatsCard';
import Copy from '../../components/Copy';

const Home = () => {
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('TOMB-FTM-LP');
  const tShareFtmLpStats = useLpStats('TSHARE-FTM-LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();

  let tomb;
  let tShare;
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //   tomb = tombTesting;
  //   tShare = tShareTesting;
  // } else {
  tomb = tombProd;
  tShare = tShareProd;
  // }

  const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tomb.address;
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'TOMB-FTM-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'TSHARE-FTM-LP' });

  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'TOMB-FTM-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'TSHARE-FTM-LP'}
    />,
  );

  return (
    <>
      <div className={`background-home home-sky`} />
      <Page>
        <div className="flex flex-col">
          <Tvl TVL={TVL} />
          <div className="grid grid-cols-1 gap-y-3 md:grid-cols-3 mt-14 mx-auto px-32 gap-x-3">
            <TokenStatsCard
              token="TOMB"
              ftmPrice={tombPriceInFTM ? tombPriceInFTM : '-.----'}
              usdPrice={tombPriceInDollars ? tombPriceInDollars : '-.--'}
              mktCap={tombCirculatingSupply ? (tombCirculatingSupply * tombPriceInDollars).toFixed(2) : '-.--'}
              circSupply={tombCirculatingSupply ? tombCirculatingSupply : '-.--'}
              totalSupply={tombTotalSupply ? tombTotalSupply : '-.--'}
              link={buyTombAddress}
            />
            <TokenStatsCard
              token="TSHARE"
              ftmPrice={tSharePriceInFTM ? tSharePriceInFTM : '-.----'}
              usdPrice={tSharePriceInDollars ? tSharePriceInDollars : '-.--'}
              mktCap={tShareCirculatingSupply ? (tShareCirculatingSupply * tSharePriceInDollars).toFixed(2) : '-.--'}
              circSupply={tShareCirculatingSupply ? tShareCirculatingSupply : '-.--'}
              totalSupply={tShareTotalSupply ? tShareCirculatingSupply : '-.--'}
              link={buyTShareAddress}
            />
            <TokenStatsCard
              token="TBOND"
              ftmPrice={tBondPriceInFTM ? tBondPriceInFTM : '-.----'}
              usdPrice={tBondPriceInDollars ? tBondPriceInDollars : '-.--'}
              mktCap={tBondCirculatingSupply ? (tBondCirculatingSupply * tBondPriceInDollars).toFixed(2) : '-.--'}
              circSupply={tBondCirculatingSupply ? tBondCirculatingSupply : '-.--'}
              totalSupply={tBondTotalSupply ? tBondTotalSupply : '-.--'}
              disabled={true}
            />
          </div>
          <div className="flex items-center h-96">
            <div className="home-grave" />
          </div>
          <Copy />
          <div className="grid grid-cols-3 mx-auto mt-4 gap-x-5 mb-32">
            <button className="btn text-xs font-bold tracking-widest">ZAP!</button>
            <Link className="btn text-xs font-bold tracking-widest" to="/cemetery">
              FARM!
            </Link>
            <Link className="btn text-xs font-bold tracking-widest" to="/masonry">
              STAKE!
            </Link>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Home;
