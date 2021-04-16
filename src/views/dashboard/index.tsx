import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';

import './marketAnalysis.less';

class MarketAnalysis extends Component {

  render() {
    const dataList = [
      {
        zh: '访问人数',
        dataInfo: {
          day: {
            abs: "-1",
            ratio: "-1.000000"
          },
          month: {
            abs: "-1",
            ratio: "-1.000000"
          },
          week: {
            abs: "-1",
            ratio: "-1.000000"
          },
          ratio: "",
          refdate: "20200623",
          value: "0",
        }
      },
      {
        zh: '新访问人数',
        dataInfo: {
          day: {
            abs: "-1",
            ratio: "-1.000000"
          },
          month: {
            abs: "-1",
            ratio: "-1.000000"
          },
          week: {
            abs: "-1",
            ratio: "-1.000000"
          },
          ratio: "",
          refdate: "20200623",
          value: "0",
        }
      },
      {
        zh: '总添加人数',
        dataInfo: {
          day: {
            abs: "-1",
            ratio: "-1.000000"
          },
          month: {
            abs: "-1",
            ratio: "-1.000000"
          },
          week: {
            abs: "-1",
            ratio: "-1.000000"
          },
          ratio: "",
          refdate: "20200623",
          value: "0",
        }
      },
      {
        zh: '新添加人数',
        dataInfo: {
          day: {
            abs: "-1",
            ratio: "-1.000000"
          },
          month: {
            abs: "-1",
            ratio: "-1.000000"
          },
          week: {
            abs: "-1",
            ratio: "-1.000000"
          },
          ratio: "",
          refdate: "20200623",
          value: "0",
        }
      }
    ]
    return (
      <>
        <Card title="今日流量" style={{ marginBottom: 24 }}>
          <div className="data_overview_list">
            {
              dataList.map((value, index) => {
                return <div key={index} className="data_overview_item">
                  <p className="data_overview_title">{value.zh}</p>
                  <p className="data_overview_desc">{value.dataInfo.value}</p>
                  <ul className="data_overview_percent">
                    <li className="data_overview_percent_item">
                      <div className="data_overview_percent_item_inner">
                        <label>日</label>
                        <p className="tips_global">
                          <span className="mini_tips warn">{value.dataInfo.value}</span>
                        </p>
                      </div>
                    </li>
                    <li className="data_overview_percent_item">
                      <div className="data_overview_percent_item_inner">
                        <label>周</label>
                        <p className="tips_global">
                          <span className="mini_tips warn">{value.dataInfo.value}</span>
                        </p>
                      </div>
                    </li>
                    <li className="data_overview_percent_item">
                      <div className="data_overview_percent_item_inner">
                        <label>月</label>
                        <p className="tips_global">
                          <span className="mini_tips warn">{value.dataInfo.value}</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              })
            }
          </div>
        </Card>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="趋势图">
              MarketAnalysis
            </Card>
          </Col>
          <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="Top10入口页面">
              MarketAnalysis
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default MarketAnalysis;
