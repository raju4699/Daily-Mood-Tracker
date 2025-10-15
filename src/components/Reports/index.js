import {useState, useContext} from 'react'
import {IoIosArrowDown} from 'react-icons/io'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

import DailyMoodTracker from '../../context/DailyMoodTracker'
import Header from '../Header'
import './reports.css'

const Reports = () => {
  const {monthsList, emojisList} = useContext(DailyMoodTracker)

  const [selectedMonth, setSelectedMonth] = useState(monthsList[0].month)

  const usageMap = {}

  monthsList.forEach(month => {
    month.dates.forEach(date => {
      if (date.emojiName) {
        usageMap[date.emojiName] = (usageMap[date.emojiName] || 0) + 1
      }
    })
  })

  const emojiUsage = emojisList.map(each => ({
    ...each,
    count: usageMap[each.emojiName] || 0,
  }))

  const activeMonthObj = monthsList.find(month => month.month === selectedMonth)

  const monthlyEmojiUsage = emojisList.map(emoji => {
    const count = activeMonthObj.dates.reduce((acc, date) => {
      if (date.emojiName === emoji.emojiName) return acc + 1
      return acc
    }, 0)
    return {...emoji, count}
  })

  return (
    <div className="reports-bg-container">
      <Header />
      <div className="reports-content-container">
        <h1 className="reports-heading">Overall Emoji Report</h1>
        <ul className="report-card-list-container">
          {emojiUsage.map(each => (
            <li className="report-card-list-item" key={each.id}>
              <p className="reports-emoji-name">{each.emojiName}</p>
              <img className="reports-emoji-image" src={each.emojiUrl} />
              <p className="reports-emoji-name">{each.count}</p>
            </li>
          ))}
        </ul>
        <div className="reports-heading-container">
          <h1 className="reports-heading">Monthy Report</h1>
          <div className="reports-select-container">
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(Number(e.target.value))}
              className="reports-select"
            >
              {monthsList.map(each => (
                <option value={each.month} key={each.month}>
                  {each.monthName}
                </option>
              ))}
            </select>
            <IoIosArrowDown className="down-arrow" />
          </div>
        </div>
        <ResponsiveContainer
          className="recharts-emoji-chart"
          width="100%"
          height={400}
        >
          <BarChart
            data={monthlyEmojiUsage}
            margin={{top: 20, right: 20, bottom: 40, left: -30}}
          >
            <CartesianGrid stroke="#ccc" strokeDasharray="4 4" />

            <XAxis
              dataKey="emojiUrl"
              type="category"
              axisLine
              tickLine={false}
              interval={0}
              tick={({x, y, payload}) => (
                <image href={payload.value} x={x - 12} y={y + 10} />
              )}
            />

            <YAxis tickLine={false} domain={[0, 8]} ticks={[0, 2, 4, 6, 8]} />

            <Bar
              dataKey="count"
              fill="#FFBE38"
              radius={[8, 8, 0, 0]}
              barSize={40} // fixed width for bars
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Reports
