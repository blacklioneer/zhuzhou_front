import { GetProductionLayout } from '@/services/api';

export default {
  namespace: 'productionlayout',
  state: {
    layoutdata: [
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
      {
        e: 3,
        m: 3,
        p: 0,
        o: 0,
      },
    ],
  },

  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(GetProductionLayout);
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
        layoutdata: [
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
          {
            e: 3,
            m: 3,
            p: 0,
            o: 0,
          },
        ],
      }
    }
  },
}
