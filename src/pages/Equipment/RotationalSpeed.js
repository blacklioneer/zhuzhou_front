import React, { memo} from 'react';
import { Card } from 'antd';
import { RotationGauge} from '@/components/Charts';
import styles from './Equipment1.less';



const RotationalSpeed=memo(({data,loading})=>(
  <Card
    bordered={false}
    title={<span className={styles.textprimarycolor}>主轴转速</span>}
    bodyStyle={{padding:'24px'}}
    loading={loading}
    className={styles.seconderycard}
  >
    <RotationGauge
      percent={data}
      title='转速'
      height={205}
    />

  </Card>
));
export  default RotationalSpeed;


