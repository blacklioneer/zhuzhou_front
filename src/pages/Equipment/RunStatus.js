import React,{ memo }  from 'react';
import { Row, Col,Card} from 'antd';
import styles from './Equipment1.less'
import {MultiPie1 } from '@/components/Charts';

const RunStatus = memo(({esstatus})=>(
  <Card
    title={<span className={styles.textprimarycolor}>设备运行状态</span>}
    className={styles.seconderycard}
    bordered={false}
  >
    <div style={{ textAlign: 'center' }}>
      <MultiPie1
        hasLegend
        title="总时间"
        subTitle="总时间"
        data={esstatus.status}
        total={() => (
          <span
            className={styles.runstatus}
            dangerouslySetInnerHTML={{
              // __html: chartdata.reduce((pre, now) => now.y + pre, 0),
              __html: `${parseInt(esstatus.all/3600000,10)}h`,
            }}
          />
        )}
        colors={['forestgreen','yellow','red','gray']}
        height={205}
        valueFormat={
          (x)=>{
            if ((x%3600000) === 0) {
              return `${parseInt(x/3600000,10)}h`;
            }
            else {
              return `${parseInt(x/3600000,10)}h${parseInt(x/60000,10)%60}min`;
            }
          }
        }
      />
    </div>
  </Card>
));


export default RunStatus;
