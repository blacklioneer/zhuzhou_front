import React,{ memo }  from 'react';
import { Row, Col,Card} from 'antd';
import styles from './Overview.less'
import { LineChartD,LineChartW } from '@/components/Charts';


let chartdata=[];
for (let i = 0; i < 12; i += 1) {
  chartdata.push({
    x: i + 1,
    y1: Math.floor(Math.random() * 10+90),
  });
}

const Quality = memo(({daliyqualified,weeklyqualified})=>(
  <div style={{paddingTop:'12px'}}>
    <Card
      title={<span className={styles.textprimarycolor}>质量指标走势</span>}
      className={styles.maincard_right}
      bordered={false}
    >
      <Row gutter={8}>
        <Col span={12}>
          <Card
            bodyStyle={{padding:'0'}}
            className={styles.seconderycard}
            bordered={false}
            title={<span className={styles.textseconderycolor}>日质量指标走势</span>}
          >
            <LineChartD
              data={daliyqualified}
              titleMap={{ y1: 'KD2号生产线'}}
              height={212}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            bodyStyle={{padding:'0'}}
            className={styles.seconderycard}
            bordered={false}
            title={<span className={styles.textseconderycolor}>周质量指标走势</span>}
          >
            <LineChartW
              data={weeklyqualified}
              titleMap={{ y1: 'KD2号生产线'}}
              height={212}
            />
          </Card>
        </Col>
      </Row>
    </Card>
  </div>
));


export default Quality;
