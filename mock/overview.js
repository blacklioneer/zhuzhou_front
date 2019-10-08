import { parse } from "url";

const weeklysdata=[];
for (let i = 0; i < 12; i += 1) {
  weeklysdata.push({
    x: i + 1,
    y1: Math.floor(Math.random() * 10+90),
  });
}

const daliysdata=[];
for (let i = 0; i < 12; i += 1) {
  daliysdata.push({
    x: i + 1,
    y1: Math.floor(Math.random() * 10+90),
  });
}
const shcheduledata={
  ds:{
      schedule:100,
      finished:80,
  },
  ws:{
      schedule:1000,
      finished:800,
  },
  daliysdata,
  weeklysdata,
};

const producttabledataSource=[
  {
    key:1,
    name:'KD-1',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:2,
    name:'KD-2',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:3,
    name:'KD-3',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:4,
    name:'KD-4',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:5,
    name:'KD-5',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:6,
    name:'KD-6',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:7,
    name:'KD-7',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:8,
    name:'KD-8',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:9,
    name:'KD-9',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:10,
    name:'KD-10',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:11,
    name:'KD-11',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:12,
    name:'KD-12',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
  {
    key:13,
    name:'KD-13',
    ordernumber:'36e123',
    materialnumber:'37e123',
    quantity:'40',
    finished:'10',
  },
];
function getProductTable(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  const result = {
    productdata: {
      list: producttabledataSource,
      pagination: {
        total: producttabledataSource.length,
        current: parseInt(params.currentPage, 10) || 1,
      },
    }
  };
  return res.json(result);
}

const TransitiondataSource=[
  {
    key:1,
    name:'KD-1',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:2,
    name:'KD-2',
    orderquantity:'40',
    materialquantity:'37',
    status:'1',
  },
  {
    key:3,
    name:'KD-3',
    orderquantity:'40',
    materialquantity:'10',
    status:'2',
  },
  {
    key:4,
    name:'KD-4',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:5,
    name:'KD-5',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:6,
    name:'KD-6',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:7,
    name:'KD-7',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:8,
    name:'KD-8',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:9,
    name:'KD-9',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:10,
    name:'KD-10',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:11,
    name:'KD-11',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:12,
    name:'KD-12',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:13,
    name:'KD-13',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
  {
    key:14,
    name:'KD-14',
    orderquantity:'40',
    materialquantity:'40',
    status:'0',
  },
];
function getTransitionTable(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  const result = {
    transitiondata: {
      list: TransitiondataSource,
      pagination: {
        total: TransitiondataSource.length,
        current: parseInt(params.currentPage, 10) || 1,
      },
    }
  };
  return res.json(result);
}

const UnusualStatusdataSource=[
  {
    key:1,
    name:'KD-1',
    unusualtime:'04-29 16:01',
    unusualdesc:'12345',
  },
  {
    key:2,
    name:'KD-2',
    unusualtime:'04-29 16:01',
    unusualdesc:'12345',
  },
  {
    key:3,
    name:'KD-3',
    unusualtime:'04-29 16:01',
    unusualdesc:'12345',
  },
  {
    key:4,
    name:'KD-4',
    unusualtime:'04-29 16:01',
    unusualdesc:'12345',
  },
  {
    key:5,
    name:'KD-5',
    unusualtime:'04-29 16:01',
    unusualdesc:'12345',
  },
  {
    key:6,
    name:'KD-6',
    unusualtime:'04-29 16:01',
    unusualdesc:'12345',
  },
  {
    key:7,
    name:'KD-7',
    unusualtime:'04-29 16:01',
    unusualdesc:'12345',
  },
  {
    key:8,
    name:'KD-8',
    unusualtime:'04-29 16:01',
    unusualdesc:'12345',
  },
  {
    key:9,
    name:'KD-9',
    unusualtime:'04-29 16:01',
    unusualdesc:'12345',
  },
  {
    key:10,
    name:'KD-10',
    unusualtime:'04-29 16:01',
    unusualdesc:'12345',
  },
];
function getUnusualTable(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;
  const result = {
    unusualtabledata: {
      list: UnusualStatusdataSource,
      pagination: {
        total: UnusualStatusdataSource.length,
        current: parseInt(params.currentPage, 10) || 1,
      },
    }
  };
  return res.json(result);
}
const unusualchartdata=[
  {
    x:'机械故障',
    y:10,
  },
  {
    x:'电器故障',
    y:2,
  },
  {
    x:'无法使用',
    y:3,
  },
];
const unusualbardata=[
  {
    x:'KD2-1',
    y:10,
  },
  {
    x:'KD2-2',
    y:2,
  },
  {
    x:'KD2-3',
    y:3,
  },
  {
    x:'KD2-4',
    y:10,
  },
  {
    x:'KD2-5',
    y:2,
  },
  {
    x:'KD2-6',
    y:3,
  },
];
const unusualdata={
  unusualchartdata,
  unusualbardata,
};


const oeeweeklydata=[];
for (let i = 0; i < 12; i += 1) {
  oeeweeklydata.push({
    x: i + 1,
    y1: Math.floor(Math.random() * 10+90),
  });
}

const oeedaliydata=[];
for (let i = 0; i < 12; i += 1) {
  oeedaliydata.push({
    x: i + 1,
    y1: Math.floor(Math.random() * 10+90),
  });
}
const oeedata={
  oeedaliydata,
  oeeweeklydata,
};


const weeklyqualifieddata=[];
for (let i = 0; i < 12; i += 1) {
  weeklyqualifieddata.push({
    x: i + 1,
    y1: Math.floor(Math.random() * 10+90),
  });
}

const daliyqualifieddata=[];
for (let i = 0; i < 12; i += 1) {
  daliyqualifieddata.push({
    x: i + 1,
    y1: Math.floor(Math.random() * 10+90),
  });
}
const qualifieddata={
  daliyqualifieddata,
  weeklyqualifieddata,
};
const es={
    run:10,
    pause:4,
    error:0,
    offline:2,
  };
const esstatus=[
  {
    x:'运行',
    y:96,
  },
  {
    x:'待机',
    y:96,
  },
  {
    x:'故障',
    y:96,
  },
  {
    x:'关机',
    y:96,
  },
];
const esdata={
  es,
  esstatus,
};


const layoutdata=[
    {
      e: 0,
      m: 0,
      p: 10,
      o: 33,
    },
    {
      e: 1,
      m: 0,
      p: 12,
      o: 45,
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
      e: 0,
      m: 0,
      p: 20,
      o: 50,
    },
    {
      e: 0,
      m: 0,
      p: 30,
      o: 20,
    },
    {
      e: 0,
      m: 1,
      p: 20,
      o: 40,
    },
    {
      e: 2,
      m: 0,
      p: 12,
      o: 30,
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
      e: 0,
      m: 0,
      p: 12,
      o: 45,
    },
    {
      e: 0,
      m: 0,
      p: 14,
      o: 45,
    },
    {
      e: 0,
      m: 0,
      p: 13,
      o: 55,
    },
    {
      e: 0,
      m: 1,
      p: 24,
      o: 70,
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
    ];
const layout={
  layoutdata,
}

export default {
  // 'GET /api/overview/schedule': shcheduledata,
  // 'GET /api/overview/producttable':getProductTable,
  // 'GET /api/overview/transitiontable':getTransitionTable,
  // 'GET /api/overview/unusualtable':getUnusualTable,
  // 'GET /api/overview/unusualstatus':unusualdata,
  // 'GET /api/overview/oeedata':oeedata,
  // 'GET /api/overview/qualifieddata':qualifieddata,
  // 'GET /api/overview/equipmentstatusdata':esdata,
  // 'GET /api/overview/getproductionlayout':layout,
};
