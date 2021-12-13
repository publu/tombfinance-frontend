import React, { useCallback, useMemo } from 'react';
import Page from '../../components/Page';
import PitImage from '../../assets/img/pit.png';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import useBondStats from '../../hooks/useBondStats';
import useTombFinance from '../../hooks/useTombFinance';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import { useTransactionAdder } from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import { getDisplayBalance } from '../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../tomb-finance/constants';

import TBOND from '../../assets/img/TBOND.svg';
import TOMB from '../../assets/img/TOMB.svg';
import ExchangeModal from './components/ExchangeModal';
import { BigNumber } from 'ethers';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${PitImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const Pit: React.FC = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const tombFinance = useTombFinance();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useCashPriceInLastTWAP();
  const bondsPurchasable = useBondsPurchasable();

  const bondBalance = useTokenBalance(tombFinance?.TBOND);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await tombFinance.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} TBOND with ${amount} TOMB`,
      });
    },
    [tombFinance, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await tombFinance.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} TBOND` });
    },
    [tombFinance, addTransaction],
  );
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);

  return (
    <Page>
      {!!account ? (
        <>
          <div className="flex flex-col mx-auto sm:mr-8 items-center mt-10 mb-10">
            <span className="text-5xl font-Amarante tracking-tighter">Pit</span>
          </div>
          <div className="flex flex-col md:flex-row w-full justify-center items-center cols-2 md:gap-x-4 md:w-3/4 mx-auto">
            <ExchangeStat
              tokenName="TOMB"
              description="Last-Hour TWAP Price"
              price={getDisplayBalance(cashPrice, 18, 4)}
            />
            <ExchangeStat
              tokenName="TBOND"
              description="Current Price:"
              price={Number(bondStat?.tokenInFtm).toFixed(2) || '-'}
            />
          </div>
          <div className="flex flex-col md:flex-row w-full justify-center items-center lg:w-3/4 mx-auto mt-10 gap-x-4 gap-y-8">
            <ExchangeCard
              action="Purchase"
              fromToken={tombFinance.TOMB}
              fromTokenName="TOMB"
              toToken={tombFinance.TBOND}
              toTokenName="TBOND"
              priceDesc={
                !isBondPurchasable
                  ? 'TOMB is over peg'
                  : getDisplayBalance(bondsPurchasable, 18, 4) + ' TBOND available for purchase'
              }
              onExchange={handleBuyBonds}
              disabled={!bondStat || isBondRedeemable}
              icon1={TOMB}
              icon2={TBOND}
            />

            <ExchangeCard
              action="Redeem"
              fromToken={tombFinance.TBOND}
              fromTokenName="TBOND"
              toToken={tombFinance.TOMB}
              toTokenName="TOMB"
              priceDesc={`${getDisplayBalance(bondBalance)} TBOND Available in wallet`}
              onExchange={handleRedeemBonds}
              disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
              disabledDescription={!isBondRedeemable ? `Enabled when TOMB > ${BOND_REDEEM_PRICE}FTM` : null}
              icon1={TBOND}
              icon2={TOMB}
            />
          </div>
        </>
      ) : (
        <UnlockWallet />
      )}
    </Page>
  );
};

const StyledBond = styled.div`
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;

export default Pit;
