import { Card } from 'antd';
import React, { memo } from 'react';
import styles from './Equipment.less';

const Time = memo(({ loading ,data}) => (
  <Card
    loading={loading}
    bodyStyle={{height:180}}
  >
    <div>
      <p className={styles.fontPrimary}>{data}</p>
      <p className={styles.fontUnderline}>运行时间</p>
    </div>
  </Card>

));
export default Time;
