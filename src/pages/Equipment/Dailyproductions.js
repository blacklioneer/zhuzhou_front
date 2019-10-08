import React, { memo} from 'react';
import { Card } from 'antd';
import { MiniBar } from '@/components/Charts';
import styles from './Equipment.less';

const DailyProductions=memo(({loading,visitData})=>(
  <Card
    loading={loading}
    bodyStyle={{height:180}}
  >
    <MiniBar data={visitData} />
    <p className={styles.fontUnderline}>每日产量</p>
  </Card>
));
export default DailyProductions;
