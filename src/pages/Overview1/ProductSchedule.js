import React,{ memo }  from 'react';
import { Row, Col,Card} from 'antd';
import styles from './Overview.less'
import { LineChartD,LineChartW } from '@/components/Charts';




const ProductSchedule = memo(({ds,ws,daliydata,weeklydata})=>(
  <Card
    title={<span className={styles.textprimarycolor}>生产任务进度</span>}
    className={styles.maincard}
    bordered={false}
  >
    <Row gutter={4}>
      <Col span={6}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
        >
          <p className={styles.textseconderycolor}>日计划产量</p>
          <p className={styles.textprimarycolor}>{ds.schedule}</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
        >
          <p className={styles.textseconderycolor}>日完成产量</p>
          <p className={styles.textprimarycolor}>{ds.finished}</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
        >
          <p className={styles.textseconderycolor}>周计划产量</p>
          <p className={styles.textprimarycolor}>{ws.schedule}</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
        >
          <p className={styles.textseconderycolor}>周完成产量</p>
          <p className={styles.textprimarycolor}>{ws.finished}</p>
        </Card>
      </Col>
    </Row>
    <Row gutter={8} style={{paddingTop:'12px'}}>
      <Col span={12}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
          title={<span className={styles.textseconderycolor}>日完成率</span>}
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
          title={<span className={styles.textseconderycolor}>周完成率</span>}
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


export default ProductSchedule;
