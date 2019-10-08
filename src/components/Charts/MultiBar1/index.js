import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";

class Multibar extends React.Component {
  render() {
    const {
      titleMap={
        y1:'y1',
        y2:'y2',
        y3:'y3',
      },
      data: sourecData,
    }=this.props;
    const data =Array.isArray(sourecData) ? sourecData: [{x:0,y1:0,y2:0,y3:0}];
    const ds = new DataSet();
    const dv = ds.createView();
    dv.source(data)
      .transform({
        type:'map',
        callback(row) {
          const newRow = { ...row };
          newRow[titleMap.y1] = row.y1;
          newRow[titleMap.y2] = row.y2;
          newRow[titleMap.y3] = row.y3;
          return newRow;
        }
      })
      .transform({
        type: "fold",
        fields: [titleMap.y1,titleMap.y2,titleMap.y3],
        // 展开字段集
        key: "key",
        // key字段
        value: "value",
        // value字段
    })
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Legend />
          <Coord transpose />
          <Axis
            name="x"
            label={{
              offset: 12
            }}
          />
          <Axis name="value" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="x*value"
            color="key"
          />
        </Chart>
      </div>
    );
  }
}

export default Multibar;
