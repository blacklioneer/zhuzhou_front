import React, { memo } from 'react';
import { Card, Tabs } from 'antd';
// import { formatMessage, FormattedMessage } from 'umi/locale';
import styles from './Equipment1.less'
import { LineChartC,LineChartV } from '@/components/Charts';
// import NumberInfo from '@/components/NumberInfo';


// const CustomTab = ({ data, currentTabKey: currentKey }) => (
//   <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
//     <Col span={12}>
//       <NumberInfo
//         title={data.name}
//         subTitle={
//           <FormattedMessage id="app.analysis.conversion-rate" defaultMessage="Conversion Rate" />
//         }
//         gap={2}
//         total={`${data.cvr * 100}%`}
//         theme={currentKey !== data.name && 'light'}
//       />
//     </Col>
//     <Col span={12} style={{ paddingTop: 36 }}>
//       <Pie
//         animate={false}
//         color={currentKey !== data.name && '#BDE4FF'}
//         inner={0.55}
//         tooltip={false}
//         margin={[0, 0, 0, 0]}
//         percent={data.cvr * 100}
//         height={64}
//       />
//     </Col>
//   </Row>
// );

const { TabPane } = Tabs;

const LineDataWoutTmp = memo(
  ({ activeKey, loading, temperaturedata, loaddata,energyconsumptiondata,vibrationdata,handleTabChange }) => (
    <Card
      loading={loading}
      title={<span className={styles.textprimarycolor}>设备状态数据</span>}
      className={styles.linechartcard}
      bordered={false}
    >
      <Tabs activeKey={activeKey} onChange={handleTabChange}>
        {/*  <TabPane tab={<span className={styles.textseconderycolor}>负载</span>} key='load'>
          <div style={{ padding: '0 24px' }}>
            <LineChartL
              height={223}
              data={loaddata}
              titleMap={{
                y1:'负载'
              }}
            />
          </div>
        </TabPane> */}
        <TabPane tab={<span className={styles.textseconderycolor}>能耗</span>} key='energyconsumption'>
          <div style={{ padding: '0 24px' }}>
            <LineChartC
              height={223}
              data={energyconsumptiondata}
              titleMap={{
                y1:'能耗'
              }}
            />
          </div>
        </TabPane>
        <TabPane tab={<span className={styles.textseconderycolor}>振动</span>} key='vibration'>
          <div style={{ padding: '0 24px' }}>
            <LineChartV
              height={223}
              data={vibrationdata}
              titleMap={{
                y1:'振动'
              }}
            />
          </div>
        </TabPane>
      </Tabs>
      {/*  能够实现动态化数字加载<Tabs activeKey={activeKey} onChange={handleTabChange}>
        {offlineData.map(shop => (
          <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.name}>
            <div style={{ padding: '0 24px' }}>
              <TimelineChart
                height={400}
                data={offlineChartData}
                titleMap={{
                  y1: formatMessage({ id: 'app.analysis.traffic' }),
                  y2: formatMessage({ id: 'app.analysis.payments' }),
                }}
              />
            </div>
          </TabPane>
        ))}
      </Tabs> */}
    </Card>
  )
);

export default LineDataWoutTmp;
