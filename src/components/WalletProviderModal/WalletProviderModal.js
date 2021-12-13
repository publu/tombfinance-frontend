import React, { useEffect } from 'react';
import WalletCard from './WalletCard';
import { Modal, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import metamaskLogo from '../../assets/img/metamask-fox.svg';
import walletConnectLogo from '../../assets/img/wallet-connect.svg';
import coingBaseLogo from '../../assets/img/coinbase.svg';
import { useWallet } from 'use-wallet';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '400px',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
}));

const WalletProviderModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const { account, connect } = useWallet();

  useEffect(() => {
    if (account) {
      handleClose();
    }
  });

  return (
    <Modal
      aria-labelledby="connect a wallet"
      aria-describedby="connect your crypto wallet"
      open={open}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClose={handleClose}
    >
      <div className={`relative`}>
        <div className={`gradient w-full h-full`} />
        <div className={`inner bg-tombBackground text-center px-10 py-10`}>
          <h2 className="font-bold mb-6">Connect Wallet</h2>
          <div className="flex flex-col gap-y-4">
            <WalletCard
              className="border-metaMask"
              icon={<img src={metamaskLogo} alt="Metamask logo" style={{ width: 32 }} />}
              onConnect={() => {
                connect('injected');
              }}
              title="Metamask"
            />
            <WalletCard
              className="border-walletConnect"
              icon={<img src={walletConnectLogo} alt="Wallet Connect logo" style={{ width: 32 }} />}
              onConnect={() => {
                connect('walletconnect');
              }}
              title="WalletConnect"
            />
            <WalletCard
              className="border-walletConnect"
              icon={<img src={coingBaseLogo} alt="Coinbase wallet logo" style={{ width: 32 }} />}
              onConnect={() => {
                connect('walletlink');
              }}
              title="Coinbase Wallet"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default WalletProviderModal;
