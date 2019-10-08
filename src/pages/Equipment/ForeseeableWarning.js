import React,{ memo }  from 'react';
import { Row, Col, Card, Icon } from 'antd';
import styles from './Equipment1.less';

const icon =[
  <Icon type="warning" theme="filled" style={{ fontSize: '80px', color: 'red',textAlign:'center' }} />,
  <Icon type="check-circle" theme="filled" style={{ fontSize: '80px', color: 'green',textAlign:'center' }} />,
];
const ForeseeableWarning = memo(({warning})=>(
  <Card
    title={<span className={styles.textprimarycolor}>健康预警</span>}
    className={styles.seconderycard}
    bordered={false}
  >
    <Row gutter={24}>
      <Col span={6}>
        {icon[warning.status]}
      </Col>
      <Col span={9}>
        <p className={styles.textprimarycolor} style={{ textAlign:'left' }}>预警信息：</p>
        <p className={styles.textprimarycolor} style={{ textAlign:'left' }}>{warning.desc}</p>
      </Col>
      <Col span={9}>
        <p className={styles.textprimarycolor} style={{ textAlign:'left' }}>解决策略：</p>
        <p className={styles.textprimarycolor} style={{ textAlign:'left' }}>{warning.solution}</p>
      </Col>
    </Row>
  </Card>
));


export default ForeseeableWarning;
