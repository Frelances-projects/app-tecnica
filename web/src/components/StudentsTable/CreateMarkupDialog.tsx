'use client'
import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import { ptBR } from 'date-fns/locale';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Calendar } from "@/components/ui/calendar"

export function CreateMarkupDialog() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [hour, setHour] = useState<string>('')

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <CalendarDays size={16} className="hover:cursor-pointer hover:text-red-500" />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[370px] mx-auto">
        <Tabs defaultValue="New Marking" className="w-max">
          <TabsList className='gap-4'>
            <TabsTrigger value="New Marking">Nova Marcação</TabsTrigger>
            <TabsTrigger value="password">Marcações Existentes</TabsTrigger>
          </TabsList>
          <TabsContent value="New Marking" className='w-max mx-auto'>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              weekStartsOn={0}
              locale={ptBR}
              className="rounded-md border mx-auto"
            />
          </TabsContent>
          <TabsContent value="password" className='w-max mx-auto'>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              className="rounded-md border"
            />
          </TabsContent>
        </Tabs>
        <AlertDialogFooter className='justify-between'>
          <fieldset form='time' className='flex gap-2 mr-auto items-center'>
            <span className='font-bold'>Hora</span>
            <input id='time' type="time" onChange={(e) => setHour(e?.target?.value)} />
          </fieldset>
          <AlertDialogAction disabled={date === undefined || hour === ''} className='bg-[#E3000F] enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60'>Marcar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}