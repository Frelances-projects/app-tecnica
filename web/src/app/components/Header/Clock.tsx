'use client'
import { useState, useEffect } from 'react'
import { format, utcToZonedTime } from 'date-fns-tz'

export function Clock() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 10 * 1000) // 10 seconds

    return () => clearInterval(intervalId)
  }, [])

  const zonedDateTime = utcToZonedTime(currentDateTime, userTimeZone)

  const formattedDate = format(zonedDateTime, 'dd/MM/yyyy')
  const formattedTime = format(zonedDateTime, 'HH:mm')

  return (
    <div className="flex flex-row gap-5">
      <span>{formattedDate}</span>
      <span>{formattedTime}</span>
    </div>
  )
}
