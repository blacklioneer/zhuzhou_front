import React,{ memo }  from 'react';
import { Row, Col,Card} from 'antd';
import styles from './Equipment1.less'
import {WaterWave } from '@/components/Charts';


const OEE = memo(({oeedata})=>(
  <Card
    title={<span className={styles.textprimarycolor}>OEE</span>}
    className={styles.seconderycard}
    bordered={false}
  >
    <div style={{ textAlign: 'center' }}>
     <WaterWave
       height={200}
       title="OEE"
       percent={oeedata}
     />
    </div>
  </Card>
));


export default OEE;
