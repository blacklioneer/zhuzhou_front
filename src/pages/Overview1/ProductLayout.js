import React,{ memo }  from 'react';
import { Row, Col,Card} from 'antd';
import styles from './Overview.less'
import kdmc from '../../assets/kdmc.png'
import bpmc from '../../assets/bpmc.png'
import equipmentmanager from '../../assets/equipmentmanager.png'
import linemanager from '../../assets/linemanager.png'
import ShowTime from './ShowTime'
const status=['运行','待机','故障','关机'];
const statuscss=[styles.statustextsecondery_run,styles.statustextsecondery_pause,styles.statustextsecondery_error,styles.statustextsecondery_offline]

const ProductLayout = memo(({data})=>(
  <Card
    title={<span className={styles.textprimarycolor}>生产车间布局</span>}
    className={styles.layoutbody}
    bordered={false}
    // bodyStyle={{height:'730px'}}
  >
    <p className={styles.layouttitle}>柔性制造单元运行状态监测系统</p>
{/*    <div className={styles.border}> */}
    <Row gutter={12} style={{borderLeft:'1px solid white',borderTop:'2px solid white',borderRight:'1px solid white'}}>
      <Col span={8}>
        <Card
          className={styles.layoutcard}
          bordered={false}
        >
          <table>
            <tr>
              <td><img alt="example" src={bpmc} className={styles.backgroundpic} /></td>
              <td>
                <tr className={styles.textprimarycolor}>bpx-11</tr>
                <tr className={`${statuscss[data[3].e]}`}>{status[data[3].e]}</tr>
                <tr className={`${statuscss[data[3].m]}`}>{status[data[3].m]}</tr>
                <tr className={styles.textprimarycolor}>{data[3].p}</tr>
              </td>
              <td>
                <tr className={styles.textprimarycolor}>{data[3].o}</tr>
                <tr className={styles.textprimarycolor}>%</tr>
              </td>
            </tr>
          </table>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          className={styles.layoutcard}
          bordered={false}
        >
          <table>
            <tr>
              <td><img alt="example" src={bpmc} className={styles.backgroundpic} /></td>
              <td>
                <tr className={styles.textprimarycolor}>bpx-12</tr>
                <tr className={`${statuscss[data[4].e]}`}>{status[data[4].e]}</tr>
                <tr className={`${statuscss[data[4].m]}`}>{status[data[4].m]}</tr>
                <tr className={styles.textprimarycolor}>{data[4].p}</tr>
              </td>
              <td>
                <tr className={styles.textprimarycolor}>{data[4].o}</tr>
                <tr className={styles.textprimarycolor}>%</tr>
              </td>
            </tr>
          </table>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          className={styles.layoutcard}
          bordered={false}
        >
          <table>
            <tr>
              <td><img alt="example" src={bpmc} className={styles.backgroundpic} /></td>
              <td>
                <tr className={styles.textprimarycolor}>bpx-13</tr>
                <tr className={`${statuscss[data[5].e]}`}>{status[data[5].e]}</tr>
                <tr className={`${statuscss[data[5].m]}`}>{status[data[5].m]}</tr>
                <tr className={styles.textprimarycolor}>{data[5].p}</tr>
              </td>
              <td>
                <tr className={styles.textprimarycolor}>{data[5].o}</tr>
                <tr className={styles.textprimarycolor}>%</tr>
              </td>
            </tr>
          </table>
        </Card>
      </Col>
    </Row>

{/*    </div>
    <div className={styles.border}> */}
    <Row gutter={12} style={{borderTop:'1px solid white',borderLeft:'1px solid white',borderBottom:'2px solid white',borderRight:'1px solid white'}}>
      <Col span={8}>
        <Card
          className={styles.layoutcard}
          bordered={false}
        >
          <table>
            <tr>
              <td><img alt="example" src={kdmc} className={styles.backgroundpic} /></td>
              <td>
                <tr className={styles.textprimarycolor}>kd-33</tr>
                <tr className={`${statuscss[data[0].e]}`}>{status[data[0].e]}</tr>
                <tr className={`${statuscss[data[0].m]}`}>{status[data[0].m]}</tr>
                <tr className={styles.textprimarycolor}>{data[0].p}</tr>
              </td>
              <td>
                <tr className={styles.textprimarycolor}>{data[0].o}</tr>
                <tr className={styles.textprimarycolor}>%</tr>
              </td>
            </tr>
          </table>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          className={styles.layoutcard}
          bordered={false}
        >
          <table>
            <tr>
              <td><img alt="example" src={kdmc} className={styles.backgroundpic} /></td>
              <td>
                <tr className={styles.textprimarycolor}>kd-34</tr>
                <tr className={`${statuscss[data[1].e]}`}>{status[data[1].e]}</tr>
                <tr className={`${statuscss[data[1].m]}`}>{status[data[1].m]}</tr>
                <tr className={styles.textprimarycolor}>{data[1].p}</tr>
              </td>
              <td>
                <tr className={styles.textprimarycolor}>{data[1].o}</tr>
                <tr className={styles.textprimarycolor}>%</tr>
              </td>
            </tr>
          </table>
        </Card>
      </Col>
      <Col span={8}>
        <Card
          className={styles.layoutcard}
          bordered={false}
        >
          <table>
            <tr>
              <td><img alt="example" src={kdmc} className={styles.backgroundpic} /></td>
              <td>
                <tr className={styles.textprimarycolor}>kd-35</tr>
                <tr className={`${statuscss[data[2].e]}`}>{status[data[2].e]}</tr>
                <tr className={`${statuscss[data[2].m]}`}>{status[data[2].m]}</tr>
                <tr className={styles.textprimarycolor}>{data[2].p}</tr>
              </td>
              <td>
                <tr className={styles.textprimarycolor}>{data[2].o}</tr>
                <tr className={styles.textprimarycolor}>%</tr>
              </td>
            </tr>
          </table>
        </Card>
      </Col>
    </Row>
    <Row style={{paddingTop:'40px',paddingBottom:'21px'}}>
      <Col span={7}>
        <Card
          className={styles.seconderycard}
        >
          <table align='center'>
            <tr>
              <td>
                <tr className={styles.textprimarycolor}>生产线主管</tr>
                <tr><img alt="example" src={linemanager} className={styles.manager} /></tr>
              </td>
              <td>
                <tr className={styles.textprimarycolor}>设备主管</tr>
                <tr><img alt="example" src={equipmentmanager} className={styles.manager} /></tr>
              </td>
            </tr>
          </table>
        </Card>
      </Col>
      <Col span={6} offset={2}>
        <ShowTime />
      </Col>
      <Col span={6} offset={3}>
        <Card
          className={styles.intend}
        >
          <p className={styles.textprimarycolor}>设备右侧信息说明</p>
          <table align='center'>
            <tr>
              <td>
                <tr className={styles.textprimarycolor}>设备名</tr>
                <tr className={styles.textprimarycolor}>设备运行状态</tr>
                <tr className={styles.textprimarycolor}>机械手运行状态</tr>
                <tr className={styles.textprimarycolor}>产量</tr>
              </td>
              <td>
                <tr className={styles.textprimarycolor}>设备实时</tr>
                <tr className={styles.textprimarycolor}>oee</tr>
              </td>
            </tr>
          </table>
        </Card>
      </Col>
    </Row>
  </Card>
));


export default ProductLayout;
