import { ActionsFor } from './simple-store';

export function mergeActions<State>(
  ...actions: ActionsFor<State>[]
): ActionsFor<State> {
  return actions.reduce((a, b) => {
    return { ...a, ...b };
  }, {});
}
