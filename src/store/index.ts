import {AnyAction, applyMiddleware, compose, createStore, Store} from "redux";
import {createEpicMiddleware, ofType} from "redux-observable";
import {concat, Observable, of, throwError} from "rxjs";
import {fromFetch} from "rxjs/fetch";
import {catchError, filter, map, mergeMap, switchMap, withLatestFrom} from "rxjs/operators";
import {Photos} from "./Photos";
import {
  END_SEARCH,
  EndSearchAction,
  endSearchFailure,
  endSearchSuccess,
  SEARCH_FOR,
  START_SEARCH,
  startSearch
} from "./actions";

export type State = {
  searching: boolean,
  photos?: Photos,
  errorMessage?: string
}

function executeSearch(searchText: string): Observable<any> {
  return fromFetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchText)}&per_page=20&client_id=12f4913b8696b7013018520cf9094128c0667bcad87043d5d1796948bbaede63`).pipe(
    switchMap(response => {
      if (response.ok) {
        // OK return data
        return response.json();
      } else {
        // Server is returning a status requiring the client to try something else.
        return throwError({ message: `Error ${response.status}` });
      }
    }),
    map(json => { return (json as any).results as Photos; })
  );
}

export const defaultState: State = {
  searching: false
};

export function searchReducer(state: State = defaultState, action: AnyAction): State {
  switch(action.type) {
    case START_SEARCH:
      return {
        searching: true,
        errorMessage: undefined
      };
    case END_SEARCH:
      const a = action as EndSearchAction;
      return {
        searching: false,
        photos: a.photos,
        errorMessage: a.message
      };
    default:
      return state;
  }
}

export function searchEpic(action: Observable<AnyAction>, state: Observable<State>): Observable<AnyAction> {
  return action.pipe(
    ofType(SEARCH_FOR),
    withLatestFrom(state),
    filter(([, s]) => !s.searching),
    mergeMap(
      ([action, ]) =>
        concat(
          of(startSearch()),
          executeSearch(action.searchText).pipe(
            map(photos => endSearchSuccess(photos))
          )
        )
    ),
    catchError(err =>
      of(endSearchFailure(err.message ? err.message.toString() : err.toString()))
    )
  );
}

export default function store(): Store<State, AnyAction> {
  const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, State, any>();
// @ts-ignore
  const composeEnhancers =  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    searchReducer,
    defaultState,
    composeEnhancers(
      applyMiddleware(epicMiddleware)
    )
  );

  epicMiddleware.run(searchEpic);

  return store;
}
