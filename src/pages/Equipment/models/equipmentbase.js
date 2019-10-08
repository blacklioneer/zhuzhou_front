import { queryEquipmentbase } from '@/services/api';

export default {
  namespace: 'equipmentbase',

  state: {
    chartdata:[],
    dailydata:[],
    axiesload:[
      {
        x:0,
        y1:0,
      },
    ],
    temperaturedata:[
      {
        x:0,
        y1:0,
      },
    ],
    schedule:{
      finished:0,
      schedule:0,
      },
    workingproduction:'',
    material:'',
    loading: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryEquipmentbase,payload);
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
          chartdata:[],
          dailydata:[],
          axiesload:[
            {
              x:0,
              y1:0,
            },
          ],
          temperaturedata:[
            {
              x:0,
              y1:0,
            },
          ],
          schedule:{
            finished:0,
            schedule:0,
          },
          working_production:'',
          material:'',
      };
    },
  },
};
