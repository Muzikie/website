import {Eip1193Provider} from 'ethers';

export type EthereumProvider = Eip1193Provider & {
  isMetaMask?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on: (eventName: string, handler: (...args: any[]) => void) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeListener: (eventName: string, handler: (...args: any[]) => void) => void;
}
