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
    const data = [
      {
        State: "WY",
        当月合格数量: 25635,
        "当月不合格数量": 1890,
        "当月未完成数量": 9314
      },
      {
        State: "DC",
        当月合格数量: 30352,
        "当月不合格数量": 1000,
        "当月未完成数量": 10225
      },
      {
        State: "VT",
        当月合格数量: 38253,
        "当月不合格数量": 300,
        "当月未完成数量": 15757
      },
      {
        State: "ND",
        当月合格数量: 51896,
        "当月不合格数量": 400,
        "当月未完成数量": 18794
      },
      {
        State: "AK",
        当月合格数量: 72083,
        "当月不合格数量": -2000,
        "当月未完成数量": 22153
      }
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["当月合格数量", "当月不合格数量", "当月未完成数量"],
      // 展开字段集
      key: "产品",
      // key字段
      value: "产品数量",
      // value字段
      retains: ["State"] // 保留字段集，默认为除fields以外的所有字段
    });
    return (
      <div>
        <Chart height={400} data={dv} forceFit>
          <Legend />
          <Coord transpose />
          <Axis
            name="State"
            label={{
              offset: 12
            }}
          />
          <Axis name="产品数量" />
          <Tooltip />
          <Geom
            type="intervalStack"
            position="State*产品数量"
            color="产品"
          />
        </Chart>
      </div>
    );
  }
}

export default Multibar;
