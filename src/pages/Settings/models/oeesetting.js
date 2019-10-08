import { queryOee, removeOee, addOee, updateOee } from '@/services/api';

export default {
  namespace: 'oeesetting',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryOee, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    /* 用不到 */
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addOee, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    /* 用不到 */
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeOee, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateOee, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
