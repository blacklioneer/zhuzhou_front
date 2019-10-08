// data-set 可以按需引入，除此之外不要引入别的包
import React from 'react';
import { Chart, Axis, Coord, Geom, Guide, Shape } from 'bizcharts';
import autoHeight from '../autoHeight';

const { Html, Arc } = Guide;

// 下面的代码会被作为 cdn script 注入 注释勿删
// CDN START
Shape.registerShape('point', 'pointer', {
  drawShape(cfg, group) {
    let point = cfg.points[0]; // 获取第一个标记点
    point = this.parsePoint(point);
    const center = this.parsePoint({ // 获取极坐标系下画布中心点
      x: 0,
      y: 0,
    });
    // 绘制指针
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: point.x,
        y2: point.y - 20,
        stroke: cfg.color,
        lineWidth: 3,
        lineCap: 'round',
      },
    });
    return group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: 5,
        stroke: cfg.color,
        lineWidth: 3,
        fill: '#fff',
      },
    });
  },
});

@autoHeight()
class RotationGauge extends React.Component {
  render() {
    const {
      title,
      height,
      percent,
      forceFit = true,
      color = '#1890FF',
      bgColor = '#CBCBCB',
    } = this.props;
    const data = [
      { value: percent/1000 },
    ];
    const cols = {
      value: {
        min: 0,
        max: 9,
        tickInterval: 1,
        nice: false,
      },
    };

    return (
      <Chart height={height} data={data} scale={cols} padding={[-16, 0, 16, 0]} forceFit={forceFit}>
        <Coord type="polar" startAngle={-9 / 8 * Math.PI} endAngle={1 / 8 * Math.PI} radius={0.75} />
        <Axis
          name="value"
          zIndex={2}
          line={null}
          label={{
            offset: -16,
            textStyle: {
              fontSize: 18,
              textAlign: 'center',
              textBaseline: 'middle',
            },
          }}
          subTickCount={4}
          subTickLine={{
            length: -8,
            stroke: '#fff',
            strokeOpacity: 1,
          }}
          tickLine={{
            length: -18,
            stroke: '#fff',
            strokeOpacity: 1,
          }}
        />
        <Axis name="1" visible={false} />
        <Guide>
          <Arc
            zIndex={0}
            start={[0, 0.965]}
            end={[9, 0.965]}
            style={{ // 底灰色
              stroke: bgColor,
              lineWidth: 10,
            }}
          />
          <Arc
            zIndex={1}
            start={[0, 0.965]}
            end={[data[0].value, 0.965]}
            style={{
              stroke: color,
              lineWidth: 10,
            }}
          />
          <Html
            position={['50%', '95%']}
            html={() => (`<div style="width: 300px;text-align: center;font-size: 12px!important;"><p></p><p style="font-size: 1.75em; color: rgba(255, 255, 255, 0.85);margin: 0;">${title}</p><p style="font-size: 3em;color: rgba(255, 255, 255, 0.85);margin: 0;">${data[0].value*1000}rpm</p></div>`)}
          />
        </Guide>
        <Geom
          type="point"
          position="value*1"
          shape="pointer"
          color={color}
          active={false}
          style={{ stroke: '#fff', lineWidth: 1 }}
        />
      </Chart>
    );
  }
}

// CDN END
export default RotationGauge;
