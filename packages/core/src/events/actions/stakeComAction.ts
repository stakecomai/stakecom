import type { CommuneTxResponse } from "node_modules/@stakecom/commune-sdk/src/types";
import { z } from "zod";

import type { PendingAction } from "~/events/getPendingActions";
import { stakeCom } from "~/commune/stakeCom";
import { formatWCOMAmount } from "~/utils/formatWCOMAmount";

export async function stakeComAction(
  action: PendingAction,
): Promise<{ result: CommuneTxResponse | null; canRetry?: boolean }> {
  const params = getActionParams(action);
  if (!params) {
    return { result: null, canRetry: false };
  }

  const result = await stakeCom({
    key: params.evmAddress,
    module: params.module,
    mnemonicEncrypted: params.mnemonicEncrypted,
    amount: formatWCOMAmount(params.amount),
  });

  return { result };
}

function getActionParams(action: PendingAction) {
  const actionSchema = z.object({
    evmAddress: z.string(),
    module: z.string().min(3),
    amount: z.string(),
    mnemonicEncrypted: z.string().min(10),
  });

  try {
    return actionSchema.parse(action);
  } catch (e) {
    return null;
  }
}
