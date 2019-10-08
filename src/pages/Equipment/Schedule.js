import React, { memo} from 'react';
import { Card } from 'antd';
import { MiniProgress } from '@/components/Charts';
import styles from './Equipment.less';

const Schedule=memo(({loading,datap,finished,schedule})=>(
  <Card
    loading={loading}
    bodyStyle={{height:180}}
  >
    <p className={styles.fontPrimary}>{finished}/{schedule}</p>
    <MiniProgress percent={datap} strokeWidth={8} color="#13C2C2" />
    <p className={styles.fontUnderline}>当日任务进度</p>
  </Card>
));
export default Schedule;
