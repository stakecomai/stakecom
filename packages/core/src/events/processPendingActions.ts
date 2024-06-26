import { actionHandler } from "~core/events/actions/actionHandler";
import { getPendingActions } from "~core/events/getPendingActions";

export async function processPendingActions() {
  const actions = await getPendingActions();

  console.log("🔥", `Found ${actions.length} pending actions to process`);

  // actions for each type stake / initUnstake / changeValidator
  for (const action of actions) {
    await actionHandler(action);
  }
}
