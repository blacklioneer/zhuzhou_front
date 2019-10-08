import { queryTransmission, removeTransmission, addTransmission, updateTransmission } from '@/services/api';

export default {
  namespace: 'transmissionsetting',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryTransmission, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    /* 用不到 */
    *add({ payload, callback }, { call, put }) {
      const response = yield call(removeTransmission, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    /* 用不到 */
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(addTransmission, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateTransmission, payload);
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
