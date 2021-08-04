import {
  GET_LIST_MUSIC,
  SUCCESS_GET_LIST_MUSIC,
  ERROR_GET_LIST_MUSIC,
} from "../constants/musicConstants";
import { concat, uniqBy } from "lodash";
import { removeDuplicateBy } from "../utils/helpers/removeDuplicate";
const initialState = {
  fetching: false,
  items: [],
  paramsUrl: {},
  page: 0,
  itemDetails: {},
  selectedId: 0,
  pausePlay: true,
};

export default function getLisMusicReducer(state = initialState, action) {
  switch (action.type) {
    //get
    case GET_LIST_MUSIC:
      return { ...state, fetching: true };
    case SUCCESS_GET_LIST_MUSIC:
      if (action.payload.type === "loadMore") {
        return {
          ...state,
          items: uniqBy(
            concat(state.items, action.payload.result),
            (e) => e.id
          ),
          fetching: false,
        };
      }
      if (action.payload.type === "search") {
        return {
          ...state,
          items: action.payload.result,
          fetching: false,
        };
      }
      if (action.payload.songId) {
        if (action.payload.backId) {
          const index = state.items.findIndex(
            (item) => item.id === action.payload.backId
          );
          let newIndex = index - 1;
          if (newIndex === -1) {
            newIndex = index;
          }
          let details = state.items.find(
            (item) => item.id === state.items[newIndex].id
          );
          return {
            ...state,
            items: [...state.items],
            fetching: false,
            itemDetails: details,
            selectedId: state.items[newIndex].id,
          };
        }
        if (action.payload.forwardId) {
          const index = state.items.findIndex(
            (item) => item.id === action.payload.forwardId
          );
          let newIndex = index + 1;
          let detailForword = state.items[newIndex];
          return {
            ...state,
            items: [...state.items],
            fetching: false,
            itemDetails: detailForword,
            selectedId: state.items[newIndex].id,
          };
        }
        if (action.payload.type === "pausePlay") {
          return {
            ...state,
            items: [...state.items],
            fetching: false,
            itemDetails: { ...state.itemDetails },
            selectedId: action.payload.songId,
            pausePlay: !state.pausePlay,
          };
        }
        let details = state.items.find(
          (item) => item.id === action.payload.songId
        );
        return {
          ...state,
          items: [...state.items],
          fetching: false,
          itemDetails: details,
          selectedId: action.payload.songId,
          pausePlay: state.pausePlay ? state.pausePlay : !state.pausePlay,
        };
      }

      return { ...state, items: action.payload.result, fetching: false };
    case ERROR_GET_LIST_MUSIC:
      return { ...state, fetching: true };
    default:
      return state;
  }
}
