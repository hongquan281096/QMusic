import {
  GET_LIST_MUSIC,
  SUCCESS_GET_LIST_MUSIC,
  ERROR_GET_LIST_MUSIC,
} from "../constants/musicConstants";
import { TOKEN_API } from "../constants/urlApi";
import fetchApi from "../API/fetchApi";
export const getListMusic = (params) => async (dispatch) => {
  try {
    const { offset, type, textSearch, songId, backId, forwardId, value } =
      params;
    dispatch({ type: GET_LIST_MUSIC });
    const param = { q: textSearch || "house", offset: offset || 0, limit: 20 };
    const result = await fetchApi("/tracks", "GET", null, param);
    dispatch({
      type: SUCCESS_GET_LIST_MUSIC,
      payload: {
        result,
        type: type || null,
        songId: songId || null,
        backId: backId || null,
        forwardId: forwardId || null,
        value: value || null,
      },
    });
  } catch (e) {
    console.log(e);
    dispatch({ type: ERROR_GET_LIST_MUSIC });
  }
};
