import { GetEquipmentSecondData,GetEquipmentMiniteData,GetEquipmentUnusualTableData } from '@/services/api';

export default {
  namespace: 'equipmentdata',

  state: {
    oeedata:0,
    esstatus:0,
    order:{
      id:0,
      finished:0,
      plan:0,
    },

    transition:{
      remain:0,
      status:2,
      load:0,
    },
    unusualdata:{
      list:[],
      pagination: {},
    },

    maintain:{
      last:0,
      next:0,
      percent:0,
      level:0,
    },
    warning:{
      desc:'',
      solution:'',
      status:0,
    },
    runstatus:0,
    temp:[
      {
        x:0,
        y1:0,
      }
    ],
    viberation:[
      {
        x:0,
        y1:0,
      }
    ],
    load:[
      {
        x:0,
        y1:0,
      }
    ],
    consumption:[
      {
        x:0,
        y1:0,
      }
    ],
  },

  effects: {
    *fetchseconddata({ payload }, { call, put }) {
      const response = yield call(GetEquipmentSecondData,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchminitedata({ payload }, { call, put }) {
      const response = yield call(GetEquipmentMiniteData,payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchtabledata({ payload }, { call, put }) {
      const response = yield call(GetEquipmentUnusualTableData,payload);
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
        oeedata:0,
        esstatus:0,
        order:{
          id:0,
          finished:0,
          plan:0,
        },

        transition:{
          remain:0,
          status:2,
          load:0,
        },
        unusualdata:{
          list:[],
          pagination: {},
        },

        maintain:{
          last:0,
          next:0,
          percent:0,
          level:0,
        },
        warning:{
          desc:'',
          solution:'',
          status:0,
        },
        runstatus:0,
        temp:[
          {
            x:0,
            y1:0,
          }
        ],
        viberation:[
          {
            x:0,
            y1:0,
          }
        ],
        load:[
          {
            x:0,
            y1:0,
          }
        ],
        consumption:[
          {
            x:0,
            y1:0,
          }
        ],
      };
    },
  },
};
