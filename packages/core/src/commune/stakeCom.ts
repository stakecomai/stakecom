import { getComKey } from "~core/commune/getComKey";

import { stake } from "@stakecom/commune-sdk";

export interface StakeComInput {
  key: string;
  module: string;
  amount: string;
  mnemonicEncrypted?: string;
}

export async function stakeCom({
  key,
  module,
  amount,
  mnemonicEncrypted,
}: StakeComInput) {
  await getComKey(key, mnemonicEncrypted);

  if (Number(amount) <= 0) throw new Error("Amount must be greater than 0");
  if (!module) throw new Error("Module to stake is required");

  return stake({ key, module, amount });
}
