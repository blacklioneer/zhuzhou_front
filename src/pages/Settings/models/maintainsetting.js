import { queryMaintain, removeMaintain, addMaintain, updateMaintain } from '@/services/api';

export default {
  namespace: 'maintainsetting',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMaintain, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    /* 用不到 */
    *add({ payload, callback }, { call, put }) {
      const response = yield call(removeMaintain, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    /* 用不到 */
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(addMaintain, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateMaintain, payload);
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
