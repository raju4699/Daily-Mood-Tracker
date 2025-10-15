import {useState, useContext, useEffect} from 'react'
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md'
import {IoIosArrowDown} from 'react-icons/io'

import DailyMoodTracker from '../../context/DailyMoodTracker'
import Header from '../Header'
import './home.css'

const Home = props => {
  const {monthsList, setMonthsList, daysList, emojisList} = useContext(
    DailyMoodTracker,
  )
  const [activeMonth, setActiveMonth] = useState(monthsList[0].month)
  const [activeEmoji, setActiveEmoji] = useState(emojisList[0].emojiName)
  const [activeDate, setActiveDate] = useState('')

  const [activeEmojiOption, setEmojiOption] = useState('Very Happy')
  const [activeDayOption, setDayOption] = useState('Sun')

  const activeMonthObj = monthsList.find(each => each.month === activeMonth)

  console.log(activeMonthObj)

  const onLeftChange = () =>
    activeMonth === 1 ? setActiveMonth(12) : setActiveMonth(prev => prev - 1)

  const onRightChange = () =>
    activeMonth === 12 ? setActiveMonth(1) : setActiveMonth(prev => prev + 1)

  const onEmojiOptionhange = emojiName => {
    setEmojiOption(emojiName)
  }

  const onDayOptionChange = dayName => {
    setDayOption(dayName)
  }

  const onEmojiClick = name => {
    setActiveEmoji(name)
  }

  const onDateClick = date => {
    setActiveDate(date)

    const selectedEmojiObj = emojisList.find(
      each => each.emojiName === activeEmoji,
    )

    const updatedMonthsList = monthsList.map(monthObj => {
      if (monthObj.month === activeMonth) {
        const updatedDates = monthObj.dates.map(dateObj => {
          if (dateObj.date === date) {
            if (dateObj.emojiName === activeEmoji) {
              return {...dateObj, emojiUrl: '', emojiName: ''}
            }
            return {
              ...dateObj,
              emojiUrl: selectedEmojiObj.emojiUrl,
              emojiName: selectedEmojiObj.emojiName,
            }
          }

          return dateObj
        })

        return {...monthObj, dates: updatedDates}
      }

      return monthObj
    })

    setMonthsList(updatedMonthsList)
  }

  const getFilterCount = () => {
    const activeDayIndex = daysList.findIndex(
      each => each.day === activeDayOption,
    )

    const count = activeMonthObj.dates.reduce((acc, dateObj, idx) => {
      if (
        activeDayIndex === (activeMonthObj.carry - 1 + idx) % 7 &&
        dateObj.emojiName === activeEmojiOption
      ) {
        return acc + 1
      }
      return acc
    }, 0)

    return count
  }

  return (
    <div className="home-bg-container">
      <Header />
      <div className="home-content-container">
        <h1 className="home-content-heading">Moods in a Month</h1>
        <div className="month-emoji-container">
          <div className="emoji-container-sm">
            <ul className="emoji-list-container">
              {emojisList.map(each => (
                <li className="emoji-list-item" key={each.id}>
                  <button
                    onClick={() => onEmojiClick(each.emojiName)}
                    className="empty-button"
                  >
                    <p className="emoji-name">{each.emojiName}</p>
                    <img
                      className={`emoji-image ${
                        activeEmoji === each.emojiName && 'active-image'
                      }`}
                      src={each.emojiUrl}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="month-container">
            <div className="month-name-container">
              <button
                onClick={onLeftChange}
                className="arrow-icon-buttons"
                data-testid="previous-button"
              >
                <MdOutlineKeyboardArrowLeft />
              </button>
              <h1 className="month-name">{activeMonthObj.monthName}</h1>
              <button
                onClick={onRightChange}
                className="arrow-icon-buttons"
                data-testid="next-button"
              >
                <MdOutlineKeyboardArrowRight />
              </button>
            </div>
            <ul className="day-list-container">
              {daysList.map(each => (
                <li className="days-list-item" key={each.id}>
                  <p>{each.day.slice(0, 2)}</p>
                </li>
              ))}
            </ul>
            <ul
              className="dates-list-container"
              style={{
                '--start-column': activeMonthObj.carry,
              }}
            >
              {activeMonthObj.dates.map(each => (
                <li className="dates-list-item" key={each.id}>
                  <button
                    onClick={() => onDateClick(each.date)}
                    className="empty-date-button"
                  >
                    <p>{each.date}</p>
                    <img
                      alt={each.date}
                      className="date-emoji-image"
                      src={each.emojiUrl}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="temp-container">
            <div className="emoji-container">
              <ul className="emoji-list-container">
                {emojisList.map(each => (
                  <li className="emoji-list-item" key={each.id}>
                    <button
                      onClick={() => onEmojiClick(each.emojiName)}
                      className="empty-button"
                    >
                      <p className="emoji-name">{each.emojiName}</p>
                      <img
                        className={`emoji-image ${
                          activeEmoji === each.emojiName && 'active-image'
                        }`}
                        src={each.emojiUrl}
                        alt={each.emojiName}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="drop-down-container">
              <div className="drop-down-sub-container">
                <div className="select-element-container">
                  <select
                    onChange={event => onEmojiOptionhange(event.target.value)}
                    value={activeEmojiOption}
                    className="select-element"
                  >
                    {emojisList.map(each => (
                      <option key={each.id} value={each.emojiName}>
                        {each.emojiName}
                      </option>
                    ))}
                  </select>
                  <IoIosArrowDown className="arrow-icon" />
                </div>
                <div className="select-element-container">
                  <select
                    onChange={event => onDayOptionChange(event.target.value)}
                    value={activeDayOption}
                    className="select-element"
                  >
                    {daysList.map(each => (
                      <option key={each.id} value={each.day}>
                        {each.day}
                      </option>
                    ))}
                  </select>
                  <IoIosArrowDown className="arrow-icon" />
                </div>
              </div>
              <h1 className="count-text">{getFilterCount()}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
