import React,{ memo }  from 'react';
import { Row, Col,Card} from 'antd';
import styles from './Overview.less'
import { DarkBar,MultiPieVertical } from '@/components/Charts';


const chartdata=[
  {
    x:'机械故障',
    y:10,
  },
  {
    x:'电器故障',
    y:2,
  },
  {
    x:'无法使用',
    y:3,
  },
];
const data1=[
  {
    x:'KD2-1',
    y:10,
  },
  {
    x:'KD2-2',
    y:2,
  },
  {
    x:'KD2-3',
    y:3,
  },
  {
    x:'KD2-4',
    y:10,
  },
  {
    x:'KD2-5',
    y:2,
  },
  {
    x:'KD2-6',
    y:3,
  },
];


const ManHourLost = memo(({})=>(
  <div style={{paddingTop:'12px'}}>
    <Card
      title={<span className={styles.textprimarycolor}>生产线报警信息</span>}
      className={styles.maincard_right}
      bordered={false}
    >
      <Row gutter={8}>
        <Col span={12}>
          <Card
            bodyStyle={{padding:'0'}}
            className={styles.seconderycard}
            bordered={false}
            title={<span className={styles.textseconderycolor}>日设备异常种类统计</span>}
          >
            <MultiPieVertical
              data={chartdata}
              height={206}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            bodyStyle={{padding:'0'}}
            className={styles.seconderycard}
            bordered={false}
            title={<span className={styles.textseconderycolor}>周设备异常次数统计</span>}
          >
            <div>
              <DarkBar
                padding={[12,12,48,20]}
                data={data1}
                height={206}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Card>
  </div>
));


export default ManHourLost;
