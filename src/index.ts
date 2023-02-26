import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export interface SimpleStore<State, Actions extends { [K in keyof Actions]: (state: State, value: unknown) => State }> extends Observable<State> {
  mutate: (modifier: (currentState: State) => State) => void;
  select: <PropertyName extends keyof State>(key: PropertyName) => Observable<State[PropertyName]>;
  dispatch: <ActionName extends keyof Actions, Parameter extends { [K in keyof Actions]: Parameters<Actions[K]>[1] }[ActionName]>(
    action: ActionName,
    value: Parameter
  ) => void;
}

/**
 *
 * @param initialState the initial state of the store item
 * @param actions the available actions on the store
 * @returns new simple store instance
 */
export function store<
  State extends object,
  ActionDefinition extends Record<string, (state: State, value: unknown) => State | undefined | void>,
  Actions extends ActionDefinition & { [K in keyof Actions]: (state: State, value: unknown) => State }
>(initialState: State, actions?: ActionDefinition): SimpleStore<State, Actions> {
  const state$ = new BehaviorSubject(initialState);

  const mutate = (modifier: (currentState: State) => State): void => state$.next(modifier(state$.getValue()));

  const select = <PropertyName extends keyof State>(key: PropertyName): Observable<State[PropertyName]> =>
    state$.pipe(
      map((state) => state[key]),
      distinctUntilChanged()
    );

  const parsedActions = new Map<string, Actions[keyof Actions]>(Object.entries(actions as object));

  const dispatch = <ActionName extends keyof Actions, Parameter extends { [K in keyof Actions]: Parameters<Actions[K]>[1] }[ActionName]>(
    action: ActionName,
    value: Parameter
  ): void => {
    if (parsedActions.has(action as string)) {
      mutate((currentState) => parsedActions.get(action as string)!(currentState, value) ?? currentState);
    } else {
      throw new Error(`Unknown action '${String(action)}'`);
    }
  };

  return Object.assign(state$.asObservable(), {
    mutate,
    select,
    dispatch,
  });
}
