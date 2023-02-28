import { catchError, map, Observable, of, startWith } from 'rxjs';

export interface StateMachine<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

export function asStateMachine<T>(
  observable: Observable<T>
): Observable<StateMachine<T>> {
  return observable.pipe(
    map((data) => ({ loading: false, data })),
    startWith({ loading: true }),
    catchError((error: Error) => of({ loading: false, error }))
  );
}
