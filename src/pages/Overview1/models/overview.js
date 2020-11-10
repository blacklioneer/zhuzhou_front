import { OverviewScheduledata,ProductTable,TransitionTable,UnusualTable,UnusualStatus,OeeData,QualifiedData,EquipmentStatusData } from '@/services/api';

export default {
  namespace: 'overview',
  state: {
    ds:{
      schedule:0,
      finished:0,
    },
    ws:{
      schedule:0,
      finished:0,
    },
    es:{
      run:0,
      pause:0,
      error:0,
      offline:0,
    },
    daliysdata:[
      {
        x:0,
        y1:0,
      }
    ],
    weeklysdata:[
      {
        x:0,
        y1:0,
      }
    ],
    oeedaliydata:[
      {
        x:0,
        y1:0,
      },
    ],
    oeeweeklydata:[
      {
        x:0,
        y1:0,
      },
    ],
    daliyqualifieddata:[
      {
        x:0,
        y1:0,
      },
    ],
    weeklyqualifieddata:[
      {
        x:0,
        y1:0,
      },
    ],
    productdata:{
     list:[],
      pagination: {},
    },
    transitiondata:{
      list:[],
      pagination: {},
    },
    unusualtabledata:{
      list:[],
      pagination: {},
    },
    unusualchartdata:[],
    unusualbardata:[],
    esstatus:{
      status:[],
      all:0,
    },
  },

  effects: {
    *fetchschedule(_, { call, put }) {
      const response = yield call(OverviewScheduledata);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchproducttable({ payload, callback }, { call, put }) {
      const response = yield call(ProductTable, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *fetchtransitiontable({ payload }, { call, put }) {
        const response = yield call(TransitionTable, payload);
        yield put({
          type: 'save',
          payload: response,
        });
      },
    *fetchunusualstatustable({ payload,callback }, { call, put }) {
      const response = yield call(UnusualTable, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *unusualstatusdata(_, { call, put }) {
      const response = yield call(UnusualStatus);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *oeedata(_, { call, put }) {
      const response = yield call(OeeData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *qualifieddata(_, { call, put }) {
      const response = yield call(QualifiedData);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *equipmentstatusdata(_, { call, put }) {
      const response = yield call(EquipmentStatusData);
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
        ds:{
          schedule:0,
          finished:0,
        },
        ws:{
          schedule:0,
          finished:0,
        },
        es:{
          run:0,
          pause:0,
          error:0,
          offline:0,
        },
        daliysdata:[
          {
            x:0,
            y1:0,
          }
        ],
        weeklysdata:[
          {
            x:0,
            y1:0,
          }
        ],
        oeedaliydata:[
          {
            x:0,
            y1:0,
          },
        ],
        oeeweeklydata:[
          {
            x:0,
            y1:0,
          },
        ],
        daliyqualifieddata:[
          {
            x:0,
            y1:0,
          },
        ],
        weeklyqualifieddata:[
          {
            x:0,
            y1:0,
          },
        ],
        productdata:{
          list:[],
          pagination: {},
        },
        transitiondata:{
          list:[],
          pagination: {},
        },
        unusualtabledata:{
          list:[],
          pagination: {},
        },
        unusualchartdata:[],
        unusualbardata:[],
        esstatus:{
          status:[],
          all:0,
        },
      };
    },
  },
};
