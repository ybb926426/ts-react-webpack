import React, { Component } from 'react';
import classnames from 'classnames';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import styles from './Analysis.less';

class Analysis extends Component {
  render() {
    const sales = [
      {
        name: 2008,
        '订单数': 1,
        '商品笔数': 1,
      },
      {
        name: 2009,
        '订单数': 156,
        '商品笔数': 545,
      },
      {
        name: 2009,
        '订单数': 34,
        '商品笔数': 453,
      },
      {
        name: 2010,
        '订单数': 66,
        '商品笔数': 997,
      }
    ]
    const Color = {
      'green' : '#64ea91',
      'blue' : '#8fc9fb',
      'purple' : '#d897eb',
      'red':'#f69899',
      'yellow':'#f8c82e',
      'peach':'#f797d6',
      'borderBase':'#e5e5e5',
      'borderSplit' : '#f4f4f4',
      'grass' : '#d6fbb5',
      'sky' :'#c1e0fc',
    }
    return (
      <>
        <ResponsiveContainer minHeight={360}>
          <LineChart data={sales}>
            <Legend
              verticalAlign="top"
              content={prop => {
                const { payload } = prop
                return (
                  <ul
                    className={classnames({
                      legend: true,
                      clearfix: true,
                    })}
                  >
                    {payload!.map((item, key) => (
                      <li key={key} className="legend-item">
                        <span
                          className="radiusdot"
                          style={{ background: item.color }}
                        />
                        {item.value}
                      </li>
                    ))}
                  </ul>
                )
              }}
            />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: Color.borderBase, strokeWidth: 1 }}
              tickLine={false}
            />
            <YAxis axisLine={false} tickLine={false} />
            <CartesianGrid
              vertical={false}
              stroke={Color.borderBase}
              strokeDasharray="3 3"
            />
            <Tooltip
              wrapperStyle={{
                border: 'none',
                boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)',
              }}
              content={(content:any) => {
                const list = content.payload.map((item:any, key:any) => (
                  <li key={key} className="tipitem">
                    <span
                      className={styles.radiusdot}
                      style={{ background: item.color }}
                    />
                    {`${item.name}:${item.value}`}
                  </li>
                ))
                return (
                  <div className="tooltip">
                    <p className="tiptitle">{content.label}</p>
                    <ul>{list}</ul>
                  </div>
                )
              }}
            />
            <Line
              type="monotone"
              dataKey="订单数"
              stroke={Color.purple}
              strokeWidth={3}
              dot={{ fill: Color.purple }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="商品笔数"
              stroke={Color.red}
              strokeWidth={3}
              dot={{ fill: Color.red }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </>
    )
  }
}

export default Analysis;
