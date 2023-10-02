'use client'

import { CalendarDays } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Calendar } from "@/components/ui/calendar"

import { Student } from '@/app/panel/students/list/page'
import { ptBR } from 'date-fns/locale';
import { DeleteModal } from './deleteModal'
import { EditModal } from './editModal'

interface StudentsTableProps {
  students: Student[]
}

export function StudentsTable({ students }: StudentsTableProps) {
  const pathName = usePathname()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [hour, setHour] = useState<string>('')

  const haveCalendar = pathName !== '/panel/students/list'
  
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Data inscrição</TableHead>
            <TableHead>Escola de registro</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Deletar</TableHead>
            {haveCalendar && (
              <TableHead>Agendar</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.number}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.enrolledAt}</TableCell>
              <TableCell>{student.school.name}</TableCell>
              <TableCell>
                <EditModal id={student?.id} name={student?.name} />
              </TableCell>
              <TableCell>
                <DeleteModal id={student?.id} title={student?.name} />
              </TableCell>
              {haveCalendar && (
                <TableCell>
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
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </div>
  )
}