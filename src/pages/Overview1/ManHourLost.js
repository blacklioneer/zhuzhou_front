import React,{ memo }  from 'react';
import { Row, Col,Card} from 'antd';
import styles from './Overview.less'
import { LineChartD,LineChartW } from '@/components/Charts';

const ManHourLost = memo(({daliydata,weeklydata})=>(
  <Card
    title={<span className={styles.textprimarycolor}>OEE走势</span>}
    className={styles.maincard_right}
    bordered={false}
  >
    <Row gutter={8}>
      <Col span={12}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
          title={<span className={styles.textseconderycolor}>日OEE走势</span>}
        >
          <LineChartD
            data={daliydata}
            titleMap={{ y1: 'KD2号生产线'}}
            height={206}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
          title={<span className={styles.textseconderycolor}>周OEE走势</span>}
        >
          <LineChartW
            data={weeklydata}
            titleMap={{ y1: 'KD2号生产线'}}
            height={206}
          />
        </Card>
      </Col>
    </Row>
  </Card>
));


export default ManHourLost;
