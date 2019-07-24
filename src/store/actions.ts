import {Photos} from "./Photos";

export const SEARCH_FOR = 'search_for';
export const START_SEARCH = 'start_search';
export const END_SEARCH = 'end_search';

export type SearchForAction = {
  type: typeof SEARCH_FOR,
  searchText: string
}

export type StartSearchAction = {
  type: typeof START_SEARCH
}

export type EndSearchAction = {
  type: typeof END_SEARCH,
  successful: boolean,
  photos?: Photos,
  message?: string
}

export function searchFor(searchText: string): SearchForAction {
  return { type: SEARCH_FOR, searchText };
}

export function startSearch(): StartSearchAction {
  return { type: START_SEARCH };
}

export function endSearchSuccess(photos: Photos): EndSearchAction {
  return { type: END_SEARCH, successful: true, photos };
}

export function endSearchFailure(message: string): EndSearchAction {
  return { type: END_SEARCH, successful: false, message };
}
