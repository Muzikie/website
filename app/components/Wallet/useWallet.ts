import {useContext} from 'react';
import {WalletContext} from './WalletProvider';

export const useWallet = () => useContext(WalletContext);
