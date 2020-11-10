import React,{ memo }  from 'react';
import { Row, Col, Card, Icon } from 'antd';
import styles from './Equipment1.less';
import { MiniProgress } from '@/components/Charts';

const color=['red','yellow','green'];
const cstatus=[styles.statustextsecondery_error,styles.statustextsecondery_pause,styles.statustextsecondery_run];
const icon =[
  <Icon type="warning" theme="filled" style={{ fontSize: '80px', color: 'red',textAlign:'center' }} />,
  <Icon type="warning" theme="filled" style={{ fontSize: '80px', color: 'yellow',textAlign:'center' }} />,
  <Icon type="check-circle" theme="filled" style={{ fontSize: '80px', color: 'green',textAlign:'center' }} />,
];
const ForeseeableWarning = memo(({warning})=>(
  <Card
    title={<span className={styles.textprimarycolor}>健康预警</span>}
    className={styles.seconderycard}
    bordered={false}
  >
    <Row gutter={24}>
      <Col span={3}>
        {icon[warning.status]}
      </Col>
      <Col span={4}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.thirderycard}
          bordered={false}
        >
          <p className={styles.textseconderycolor}>砂轮剩余寿命</p>
          <p className={cstatus[warning.status]}>{(100 * warning.percent).toFixed(1)}%</p>
        </Card>
      </Col>
      <Col span={17}>
        <Card
          bodyStyle={{padding:'24 0'}}
          className={styles.thirderycard}
          bordered={false}
        >
          <MiniProgress
            percent={parseInt(100*warning.percent,10)}
            strokeWidth={30}
            // target={80}
            color={color[warning.status]}
          />
        </Card>
      </Col>
    </Row>
  </Card>

));


export default ForeseeableWarning;
