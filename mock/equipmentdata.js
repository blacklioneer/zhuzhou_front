import moment from 'moment';
import { parse } from 'url';

const visitData = [];
const beginDay = new Date().getTime();
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5,7,8];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}


const data=[
  {
    x: '运行',
    y: 6,
  },
  {
    x: '故障',
    y: 3,
  },
  {
    x: '待机',
    y: 3,
  },
  {
    x: '关机',
    y: 12,
  },
  {
    x: '维护',
    y: 0,
  },
];

const sche={
  finished: 10,
  schedule: 12,
};

const database={
  chartdata: data,
  dailydata: visitData,
  schedule: sche,
  workingproduction:'21#',
  material:'合金钢',
};
const data1={
  runtime:12,
  speed:2000,
  remaintime:12,
  alart:'你猜',
};

function getRule(req, res,u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  return res.json(database)
}

function postRule(req, res,u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  return res.json(data1)
}
export default {
  // 'GET /api/equipmentbase': getRule,
  // 'GET /api/equipmentequip': postRule,
}
