import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useWallet } from 'use-wallet';
import useModal from '../../hooks/useModal';
import WalletProviderModal from '../WalletProviderModal';
import AccountModal from './AccountModal';
import wallet from '../../assets/img/wallet.svg';
interface AccountButtonProps {
  text?: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ text }) => {
  const { account } = useWallet();
  const [onPresentAccountModal] = useModal(<AccountModal />);

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const buttonText = text ? text : 'Unlock';

  return (
    <div>
      {!account ? (
        <button
          className="tracking-wider wallet-button relative flex md:py-8 md:px-8"
          id="account-button"
          onClick={handleWalletProviderOpen}
        >
          <img className="md:mr-2 p-4 md:p-0" src={wallet} />
          <span className="hidden md:block">{buttonText}</span>
          <div className="hidden md:block wallet-bg-long" />
          <div className="wallet-bg md:hidden" />
        </button>
      ) : (
        <button className="tracking-wider wallet-button p-4 md:p-8 relative flex" onClick={onPresentAccountModal}>
          <img className="md:mr-2" src={wallet} />
          <span className="hidden md:block">My Wallet</span>
          <div className="hidden md:block wallet-bg-long" />
          <div className="wallet-bg md:hidden" />
        </button>
      )}

      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
      {/* <AccountModal open={isAccountModalOpen} handleClose={handleAccountModalClose}/> */}
    </div>
  );
};

export default AccountButton;
