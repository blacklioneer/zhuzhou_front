import { queryPlanning,getUnFinished,getClear,removePlanning, addPlanning, updatePlanning,updatePlanningEquipment } from '@/services/api';

export default {
  namespace: 'schedulesetting',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPlanning, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *getunfinished({ payload,callback }, { call, put }) {
      const response = yield call(getUnFinished, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    *cleardata({ payload,callback }, { call, put }) {
      const response = yield call(getClear, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addPlanning, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removePlanning, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updatePlanning, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *updateequipment({ payload, callback }, { call, put }) {
      const response = yield call(updatePlanningEquipment, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
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
