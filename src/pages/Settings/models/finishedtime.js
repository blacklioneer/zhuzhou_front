import { queryFinishedTime, removeFinishedTime, addFinishedTime, updateFinishedTime,finishFinishedTime } from '@/services/api';
import { message } from 'antd';

export default {
  namespace: 'finishedtimesetting',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFinishedTime, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addFinishedTime, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    *finish({ payload, callback }, { call, put }) {
      const response = yield call(finishFinishedTime, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeFinishedTime, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateFinishedTime, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback && typeof callback === 'function') {
        callback(response)
      }

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
