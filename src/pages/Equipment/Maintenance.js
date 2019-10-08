import React,{ memo }  from 'react';
import { Row, Col, Card, Icon } from 'antd';
import styles from './Equipment1.less';
import {MiniProgress } from '@/components/Charts';

const icon =[
  <Icon type="check-circle" theme="filled" style={{ fontSize: '80px', color: 'green',textAlign:'center' }} />,
  <Icon type="warning" theme="filled" style={{ fontSize: '80px', color: 'red',textAlign:'center' }} />,
];

const color=['green','yellow','red'];

const Maintenance = memo(({maintain})=>(
  <Card
    title={<span className={styles.textprimarycolor}>设备保养状态</span>}
    className={styles.seconderycard}
    bordered={false}
  >
    <Row gutter={24}>
      <Col span={3}>
        {icon[maintain.level]}
      </Col>
      <Col span={12}>
        <p className={styles.textprimarycolor} style={{ textAlign:'left' }}>上次润滑时间：{maintain.last}</p>
        <p className={styles.textprimarycolor} style={{ textAlign:'left' }}>预期润滑时间：{maintain.next}</p>
      </Col>
      <Col span={9} style={{paddingTop:'20px'}}>
        <MiniProgress
          percent={maintain.percent}
          strokeWidth={30}
          // target={80}
          color={color[maintain.level]}
        />
      </Col>
    </Row>
  </Card>
));


export default Maintenance;
