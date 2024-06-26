import type { KeyringPair } from "@polkadot/keyring/types";

export interface CommuneTxResponse {
  success: boolean;
  txHash?: string;
  msg?: string;
  errorCode?: string;
}

export interface AccountBalances {
  balance: bigint;
  stake: Record<string, bigint>;
}

export interface GenericTxInput {
  signer: KeyringPair;
}

export interface StakeInput extends GenericTxInput {
  networkId?: number;
  amount: bigint;
  moduleKey: string;
}

export interface TransferInput extends GenericTxInput {
  networkId?: number;
  amount: bigint;
  recipient: string;
}

export interface TxError {
  code: string;
  reason?: string;
}
