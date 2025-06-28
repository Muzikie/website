import {Eip1193Provider} from 'ethers';

export type EthereumProvider = Eip1193Provider & {
  isMetaMask?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (eventName: string, handler: (...args: any[]) => void) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
}

export interface OnChainError {
  reason?: string;
  error?: {
    data: {
      message: string;
    } | string
  };
  data?: {
      message: string;
    } | string
}

export type WalletContextType = {
  address: string | null;
  provider: ethers.BrowserProvider | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getBalance: () => Promise<string[]>;
  sendTransaction: (method: string, args: unknown[], eventNameToParse?: string) => Promise<{receipt: ethers.TransactionReceipt; id?: string}>;
  ensureAllowance: (val: number) => Promise<void>;
};