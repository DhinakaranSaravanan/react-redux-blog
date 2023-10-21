import { parseISO, formatDistanceToNow } from 'date-fns'
import React from 'react'


const TimeAgo = ({timeStamp}) => {
    const date = parseISO(timeStamp)
    const timePeriod = formatDistanceToNow(date)
    const timeAgo = `${timePeriod} ago`
  return (
    <span title={timeStamp}><i> {timeAgo}</i></span>
  )
}

export default TimeAgo