import { queryEquipmentequip } from '@/services/api';

export default {
  namespace: 'equipmentequip',

  state: {
    status: 5,
    runtime:0,
    speed:0,
    remaintime:0,
    error:{
      time:0,
      prio:'无',
      detail:'无'
    },
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryEquipmentequip,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        status: 5,
        runtime:0,
        speed:0,
        remaintime:0,
        error:{
          time:0,
          prio:'无',
          detail:'无',
        },
      };
    },
  },
};
