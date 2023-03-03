import { Observable } from 'rxjs';

export interface ActionsFor<State>
  extends Record<string, (state: State, value?: any) => void> {}

export interface SimpleStore<
  State,
  Actions extends {
    [K in keyof Actions]: (state: State, value: any) => State;
  }
> extends Observable<State> {
  mutate: (modifier: (currentState: State) => State) => void;
  select: <PropertyName extends keyof State>(
    key: PropertyName
  ) => Observable<State[PropertyName]>;
  dispatch: <
    ActionName extends keyof Actions,
    Parameter extends {
      [K in keyof Actions]: Parameters<Actions[K]>[1];
    }[ActionName]
  >(
    action: ActionName,
    value?: Parameter
  ) => void;
}
