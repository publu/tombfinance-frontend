import React from 'react';
import styled from 'styled-components';

import CardContent from '../../../components/CardContent';
import useTombFinance from '../../../hooks/useTombFinance';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useModal from '../../../hooks/useModal';
import ExchangeModal from './ExchangeModal';
import ERC20 from '../../../tomb-finance/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';
import Card from '../../../components/Card.js';
import Button from '../../../components/Button';

interface ExchangeCardProps {
  action: string;
  fromToken: ERC20;
  fromTokenName: string;
  toToken: ERC20;
  toTokenName: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
  disabledDescription?: string;
  icon1: any;
  icon2: any;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  action,
  fromToken,
  fromTokenName,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
  disabledDescription,
  icon1,
  icon2,
}) => {
  const catchError = useCatchError();
  const {
    contracts: { Treasury },
  } = useTombFinance();
  const [approveStatus, approve] = useApprove(fromToken, Treasury.address);

  const balance = useTokenBalance(fromToken);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );
  return (
    <Card innerClass="pt-12 pb-6 px-10 sm:px-2" className="relative text-center w-full text-3xl mt-4">
      <div className="flex justify-center absolute w-full left-0 -top-8">
        <div className="flex justify-center w-16 h-16 rounded-full bg-tombGradient -mr-1">
          <img src={icon1} width={30} height={30} />
        </div>
        <div className="flex justify-center w-16 h-16 rounded-full bg-tombGradient">
          <img src={icon2} width={30} height={30} />
        </div>
      </div>
      <div className="font-Amarante mb-1">
        {action} {fromTokenName}
      </div>
      <div className="font-semibold font-Poppins text-xs text-tomb-purple">
        {fromTokenName} to {toTokenName}
      </div>
      <div className="font-semibold font-Amarante text-base mt-2 text-white">{priceDesc}</div>
      {approveStatus !== ApprovalState.APPROVED && !disabled ? (
        <button
          className={`mb-2 mt-6 px-10 ${
            approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN ? 'btn-disabled' : 'btn'
          }`}
          disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
          onClick={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
        >
          {`Approve ${fromTokenName}`}
        </button>
      ) : (
        <button className="btn-disabled mb-2 mt-6 px-10" onClick={onPresent} disabled={disabled}>
          {disabledDescription || action}
        </button>
      )}
    </Card>
  );
};

export default ExchangeCard;
