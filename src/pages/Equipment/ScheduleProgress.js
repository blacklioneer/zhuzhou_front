import React,{ memo }  from 'react';
import { Row, Col,Card} from 'antd';
import styles from './Equipment1.less'
import {MiniProgress } from '@/components/Charts';




const ScheduleProgress = memo(({order})=>(
  <Card
    title={<span className={styles.textprimarycolor}>订单号：{order.id}</span>}
    className={styles.seconderycard}
    bordered={false}
  >
    <Row gutter={24}>
      <Col span={12}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.thirderycard}
          bordered={false}
        >
          <p className={styles.textseconderycolor}>完成量</p>
          <p className={styles.textprimarycolor}>{order.finished}</p>
        </Card>
      </Col>
      <Col span={12}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.thirderycard}
          bordered={false}
        >
          <p className={styles.textseconderycolor}>计划量</p>
          <p className={styles.textprimarycolor}>{order.plan}</p>
        </Card>
      </Col>
    </Row>
    <Row style={{paddingTop:'49.5px',paddingBottom:'29.5px'}}>
      <Col span={24}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.thirderycard}
          bordered={false}
        >
          <MiniProgress
            percent={100*order.finished/order.plan}
            strokeWidth={30}
            // target={80}
            color="green"
          />
        </Card>
      </Col>
    </Row>
  </Card>
));


export default ScheduleProgress;
