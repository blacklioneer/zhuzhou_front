import React,{ memo }  from 'react';
import { Row, Col,Card} from 'antd';
import styles from './Overview.less'
import { MultiPie1 } from '@/components/Charts';

const EquipmentStatus = memo(({es,chartdata})=>(
  <Card
    title={<span className={styles.textprimarycolor}>日设备运行状态</span>}
    className={styles.maincard}
    bordered={false}
  >
    <Row gutter={12}>
      <Col span={6}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
        >
          <p className={styles.statustextprimary}>{es.run}</p>
          <p className={styles.statustextsecondery_run}>运行</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
        >
          <p className={styles.statustextprimary}>{es.pause}</p>
          <p className={styles.statustextsecondery_pause}>待机</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
        >
          <p className={styles.statustextprimary}>{es.error}</p>
          <p className={styles.statustextsecondery_error}>故障</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          bodyStyle={{padding:'0'}}
          className={styles.seconderycard}
          bordered={false}
        >
          <p className={styles.statustextprimary}>{es.offline}</p>
          <p className={styles.statustextsecondery_offline}>关机</p>
        </Card>
      </Col>
    </Row>
    <Row style={{paddingTop:'12px'}}>
      <Card
        bodyStyle={{padding:'0'}}
        className={styles.seconderycard}
        bordered={false}
        title={<span className={styles.textseconderycolor}>日设备运行时间</span>}
      >
        <MultiPie1
          hasLegend
          title="总时间"
          subTitle="总时间"
          data={chartdata.status}
          total={() => (
            <span
              className={styles.runstatus}
              dangerouslySetInnerHTML={{
                // __html: chartdata.reduce((pre, now) => now.y + pre, 0),
                __html: `${parseInt(chartdata.all/3600000,10)}h`,
              }}
            />
          )}
          colors={['forestgreen','yellow','red','gray']}
          height={211}
          valueFormat={
            (x)=>{
              if ((x%3600000) === 0) {
                return `${parseInt(x/3600000,10)}h`;
              }
              else{
                return `${parseInt(x/3600000,10)}h${parseInt(x/60000,10)%60}min`;
              }
            }
          }
        />
      </Card>
    </Row>
  </Card>
));


export default EquipmentStatus;
