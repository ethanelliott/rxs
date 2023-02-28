import {
  catchError,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  BehaviorSubject,
} from 'rxjs';

export interface StateMachine<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

export function asStateMachine<T>(
  observable: Observable<T>,
  restart: Observable<void> = new BehaviorSubject<void>(
    undefined
  ).asObservable()
): Observable<StateMachine<T>> {
  return restart.pipe(
    switchMap(() =>
      observable.pipe(
        map((data) => ({ loading: false, data })),
        startWith({ loading: true }),
        catchError((error: Error) => of({ loading: false, error }))
      )
    )
  );
}
