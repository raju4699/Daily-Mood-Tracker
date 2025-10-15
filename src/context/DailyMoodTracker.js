import React from 'react'

const DailyMoodTracker = React.createContext({
  monthsList: [],
  setMonthsList: () => {},
  emojisList: [],
  daysList: [],
  activeBtn: '',
  onChangeActive: () => {},
})

export default DailyMoodTracker
