import React, { memo} from 'react';
import { Card } from 'antd';
import { TimelineChart } from '@/components/Charts';


// const chartData = [];
// for (let i = 0; i < 20; i += 1) {
//   chartData.push({
//     x: (new Date().getTime()) + (1000 * 60 * 30 * i),
//     y1: Math.floor(Math.random() * 100) + 10,
//   });
// }

const AxiesLoad=memo(({data})=>(
  <Card
    bordered={false}
    bodyStyle={{padding:'24px'}}
  >
    <TimelineChart
      title='负载'
      data={data}
      titleMap={{y1:'X'}}
      height={170}
    />

  </Card>
));
export  default AxiesLoad;


