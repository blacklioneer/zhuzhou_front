import moment from 'moment';
import { parse } from 'url';

const instentData = [];
const viberationdata = [];

for (let i = 0; i <60; i += 1) {
  instentData.push({
    x: i*1000+1564797390414,
    y1: Math.floor(Math.random() * 10+20),
  });
}
for (let i = 0; i <60; i += 1) {
  viberationdata.push({
    x: i*1000+1564797390414,
    y1:Math.floor(10-Math.random() * 10),
  });
}
const UnusualStatusdataSource=[
  {
    key:1,
    name:'1',
    unusualtime:'04-29 16:01',
    unusualdesc:'更换订单',
  },
  {
    key:2,
    name:'1',
    unusualtime:'04-28 16:01',
    unusualdesc:'更换订单',
  },
  {
    key:3,
    name:'1',
    unusualtime:'04-27 16:01',
    unusualdesc:'更换订单',
    // solution:'forbid',
  },
  {
    key:4,
    name:'2',
    unusualtime:'04-26 16:01',
    unusualdesc:'调机后开机',
    // solution:'forbid',
  },
  {
    key:5,
    name:'1',
    unusualtime:'04-25 16:01',
    unusualdesc:'更换订单',
    solution:'forbid',
  },
  {
    key:6,
    name:'1',
    unusualtime:'04-24 16:01',
    unusualdesc:'更换订单',
    solution:'forbid',
  },
  {
    key:7,
    name:'3',
    unusualtime:'04-23 16:01',
    unusualdesc:'停机后开机',
    solution:'forbid',
  },
  {
    key:8,
    name:'4',
    unusualtime:'04-22 16:01',
    unusualdesc:'机械故障',
    solution:'forbid',
  },
  {
    key:9,
    name:'5',
    unusualtime:'04-21 16:01',
    unusualdesc:'电气故障',
    solution:'forbid',
  },
  {
    key:10,
    name:'6',
    unusualtime:'04-17 16:01',
    unusualdesc:'无技术员',
    solution:'forbid',
  },
  {
    key:11,
    name:'6',
    unusualtime:'04-20 16:01',
    unusualdesc:'无技术员',
    solution:'forbid',
  },
  {
    key:12,
    name:'6',
    unusualtime:'04-19 16:01',
    unusualdesc:'无技术员',
    solution:'forbid',
  },
  {
    key:13,
    name:'6',
    unusualtime:'04-17 16:01',
    unusualdesc:'无技术员',
    solution:'forbid',
  },
  {
    key:14,
    name:'6',
    unusualtime:'04-17 16:01',
    unusualdesc:'无技术员',
    solution:'forbid',
  },
  {
    key:15,
    name:'6',
    unusualtime:'04-17 16:01',
    unusualdesc:'无技术员',
    solution:'forbid',
  },
  {
    key:16,
    name:'6',
    unusualtime:'04-17 16:01',
    unusualdesc:'无技术员',
    solution:'forbid',
  },
];
function getUnusualTable(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  const result = {
    unusualdata:{
      list:UnusualStatusdataSource,
      pagination: {
        total: UnusualStatusdataSource.length,
        current: parseInt(params.currentPage, 10) || 1,
      },
    },
  };
  return res.json(result);
}
const seconddata={

warning:{
  desc:'联轴器即将到达使用寿命极限',
    solution:'更换联轴器',
    status:0,
},
runstatus:0,
  temp:instentData,
  viberation:viberationdata,
  load:instentData,
  consumption:instentData,
};

const minitedata={
  maintain:{
    last:moment(new Date().getTime()).format('MM-DD'),
    next:moment(new Date().getTime()+1000*60*60*24*7).format('MM-DD'),
    percent:100,
    level:0,
  },
  oeedata:32,
  esstatus:{
    status:[
      {
        x:'运行',
        y:96,
      },
    {
      x:'待机',
      y:32,
    },
    {
      x:'故障',
      y:96,
    },
    {
      x:'关机',
      y:120,
    },
  ],
    all:344,
  },
  order:{
    id:'12y54712',
    finished:30,
    plan:100,
  },
  // transition:{
  //   remain:'4:30',
  //   status:'10:00',
  //   load:100,
  // },
  transition:{
    remain:'70',
    status:'0',
    load:100,
  },
};
export default {
  // 'GET /api/equipment/seconddata': seconddata,
  // 'GET /api/equipment/minitedata':minitedata,
  // 'GET /api/equipment/tabledata':getUnusualTable,
};

