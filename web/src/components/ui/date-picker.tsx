/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps {
  placeholder: string
  field: any
}

export function DatePicker({ placeholder, field }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'flex-1 border border-[#C6C6C6] pl-3 text-left',
            !field.value && 'text-muted-foreground',
          )}
        >
          {field.value ? (
            format(field.value, 'PPP', { locale: pt })
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          locale={pt}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
