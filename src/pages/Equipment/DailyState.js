import React, { memo} from 'react';
import { Card } from 'antd';
import { Pie} from '@/components/Charts';



const DailyState =memo(({data,loading})=>(
  <Card
    bordered={false}
    bodyStyle={{padding:0}}
    loading={loading}
  >
    <Pie
      hasLegend
      title="运行时间"
      subTitle="运行时间"
      total={() => (
        <span
          dangerouslySetInnerHTML={{
            __html:data.reduce((pre, now) => now.y/3600 + pre, 0)
          }}
        />
      )}
      data={data}
      valueFormat={val => <span dangerouslySetInnerHTML={{ __html:val /3600 + '小时' }} />}
      height={160}
    />,
  </Card>

));
export default DailyState;
