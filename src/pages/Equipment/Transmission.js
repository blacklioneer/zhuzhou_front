import React,{ memo }  from 'react';
import { Row, Col,Card} from 'antd';
import styles from './Equipment1.less'
import {MiniProgress } from '@/components/Charts';


const cstatus=[styles.statustextsecondery_run,styles.statustextsecondery_pause,styles.statustextsecondery_error];
const nstatus=['正常','缺料','用尽'];
const color=['green','yellow','red'];

const Transmission = memo(({transition})=>(
  <Card
    title={<span className={styles.textprimarycolor}>物料配送状态</span>}
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
          <p className={styles.textseconderycolor}>剩余物料</p>
          <p className={styles.textprimarycolor}>{transition.remain}</p>
        </Card>
      </Col>
      <Col span={12}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.thirderycard}
          bordered={false}
        >
          <p className={styles.textseconderycolor}>配送状态</p>
          <p className={cstatus[transition.status]}>{nstatus[transition.status]}</p>
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
            percent={parseInt(100*transition.remain/transition.load,10)}
            strokeWidth={30}
            // target={80}
            color={color[transition.status]}
          />
        </Card>
      </Col>
    </Row>
  </Card>
));


export default Transmission;
