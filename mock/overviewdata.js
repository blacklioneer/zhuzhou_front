const ammo1={
  x:'13#',
  y1:880,
  y2:-20,
  y3:1000,
};
const ammo2={
  x:'7#',
  y1:1280,
  y2:-20,
  y3:1500,
};
const ammo3={
  x:'20#',
  y1:580,
  y2:-20,
  y3:1000,
};
const ammo4={
  x:'21#',
  y1:780,
  y2:-20,
  y3:900,
};

const ammo5={
  x:'13#',
  y1:78,
  y2:-2,
  y3:90,
};
const ammo6={
  x:'7#',
  y1:128,
  y2:-2,
  y3:140,
};
const ammo7={
  x:'20#',
  y1:58,
  y2:-2,
  y3:100,
};
const ammo8={
  x:'21#',
  y1:78,
  y2:-2,
  y3:90,
};

const ammom=[ammo1,ammo2,ammo3,ammo4];
const ammod=[ammo5,ammo6,ammo7,ammo8];


const getOverviewData={
  ammom,
  ammod,
};

const data1={
  status:0,
  time:12,
  num : 2,
  override:20,
  tmp :30,

};
const data2={
  status:0,
  time:12,
  num : 2,
  override:20,
  tmp :30,

};

const data=[
  data1,
  data2,
];
const getlathedata={
  data,
};
export default {
  // 'GET /api/overview/data': getOverviewData,
  // 'GET /api/lathe/detail': getlathedata,
}
