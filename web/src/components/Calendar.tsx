"use client"

import { useState } from "react"

interface CalendarProps {

}

export function CalendarComponent({ ...rest }: CalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
 
return (
  <></>
  // <Calendar
  //   mode="single"
  //   selected={date}
  //   onSelect={setDate}
  //   className="rounded-md border"
  // />
)
}