/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, SetStateAction, useEffect } from 'react'
import { ChevronLeft, ChevronRight, User2 } from 'lucide-react'
import useSWR from 'swr'
import { format } from 'date-fns-tz'

import { SearchInput } from '@/components/SearchInput'
import { ScheduledDrivingLessonsTable } from './ScheduledDrivingLessonsTable'
import { CreateScheduleDrivingClassModal } from './CreateScheduleDrivingClassModal'
import { CreateManyScheduleDrivingClassModal } from './CreateManyScheduleDrivingClassModal'

import { ScheduleClass } from '@/utils/interfaces/schedule-class'
import { Student } from '@/utils/interfaces/student'
import { Select } from '@/components/Select'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { EditScheduledDrivingLessonModal } from './ScheduledDrivingLessonsTable/EditScheduledDrivingLessonModal'
import { DeleteScheduledDrivingLesson } from './ScheduledDrivingLessonsTable/DeleteScheduledDrivingLesson'
import { Skeleton } from '@/components/ui/skeleton'

interface ScheduledDrivingLessonsListProps {
  students: Student[]
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
  schoolId: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function ScheduledDrivingLessonsList({
  students,
  userFunction,
  schoolId,
}: ScheduledDrivingLessonsListProps) {
  const [scheduledClasses, setScheduledClasses] = useState<
    ScheduleClass[] | undefined
  >(undefined)
  const [inputValueName, setInputValueName] = useState<string>('')
  const [inputValueCode, setInputValueCode] = useState<string>('')
  const [inputValueDate, setInputValueDate] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [total, setTotal] = useState(0)

  const itemsPerPage = 10

  const urlDirector = new URL(
    `${process.env.API_URL}/scheduled-class/classes/category`,
  )
  urlDirector.searchParams.append('category', 'PRACTICAL')
  urlDirector.searchParams.append('page', (currentPage + 1).toString())
  if (inputValueName && inputValueName.trim() !== '')
    urlDirector.searchParams.append('studentName', inputValueName)
  if (inputValueCode && inputValueCode.trim() !== '')
    urlDirector.searchParams.append('studentNumber', inputValueCode)
  // if (inputValueDate && inputValueDate !== 'all') urlDirector.searchParams.append('schedulingDate', inputValueDate);

  const url = new URL(
    `${process.env.API_URL}/scheduled-class/category/${schoolId}`,
  )
  url.searchParams.append('category', 'PRACTICAL')
  url.searchParams.append('page', (currentPage + 1).toString())
  if (inputValueName && inputValueName.trim() !== '')
    url.searchParams.append('studentName', inputValueName)
  if (inputValueCode && inputValueCode.trim() !== '')
    url.searchParams.append('studentNumber', inputValueCode)

  const { data, isLoading } = useSWR(
    userFunction === 'DIRECTOR' ? urlDirector.toString() : url.toString(),
    fetcher,
    {
      refreshInterval: 1000 * 60 * 35, // 35 minutes
    },
  )
  console.log('🚀 ~ data:', data)

  const filteredScheduledClasses = scheduledClasses?.filter(
    (scheduledClass) => {
      if (inputValueName === '') return scheduledClass

      const studentFiltered = scheduledClass.student?.name
        ?.toLocaleUpperCase()
        ?.startsWith(inputValueName.toLocaleUpperCase())

      return studentFiltered
    },
  )

  const filteredScheduledClassesByStudentNumber =
    filteredScheduledClasses?.filter((scheduledClass) => {
      if (inputValueCode === '') return filteredScheduledClasses

      const studentFiltered = String(scheduledClass.student?.number)
        ?.toLocaleUpperCase()
        ?.startsWith(inputValueCode.toLocaleUpperCase())

      return studentFiltered
    })

  const filteredScheduledClassesByDate =
    filteredScheduledClassesByStudentNumber?.filter((scheduledClass) => {
      if (inputValueDate === 'all') return filteredScheduledClasses

      const dateFiltered = scheduledClass.schedulingDate === inputValueDate

      return dateFiltered
    })

  const dates = scheduledClasses
    ?.map((scheduledClass) => {
      return {
        label: scheduledClass.schedulingDate!,
        value: scheduledClass.schedulingDate!,
      }
    })
    .filter((date) => date.value !== null && date.value !== undefined)

  const uniqueDates = dates?.filter(
    (date, index, self) =>
      index === self.findIndex((t) => t.value === date.value),
  )

  const startIndex = currentPage * itemsPerPage

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    if (data?.scheduledClasses) {
      const formattedData = data?.scheduledClasses?.map(
        (scheduledClass: any) => {
          if (scheduledClass.schedulingDate) {
            const formattedSchedulingDate = format(
              new Date(scheduledClass.schedulingDate),
              'dd/MM/yyyy',
            )

            return {
              ...scheduledClass,
              schedulingDate: formattedSchedulingDate,
              schedulingDateNotFormatted: scheduledClass.schedulingDate,
            }
          } else {
            return {
              ...scheduledClass,
            }
          }
        },
      )

      setTotal(data?.total)
      setScheduledClasses(formattedData)
    }
  }, [data?.scheduledClasses])

  if (isLoading) {
    return (
      <section className="-mt-4 w-full max-w-7xl xl:pl-10">
        <h1 className="mb-9 mt-6 text-lg font-medium">
          Listagem das aulas de condução marcadas
        </h1>

        <div className="flex max-w-3xl flex-col items-center xl:flex-row">
          <SearchInput
            setInputValue={setInputValueName}
            placeholder="Filtrar por nome de aluno"
            className="lg:!w-96"
          >
            {userFunction !== 'INSTRUCTOR' && (
              <>
                <CreateScheduleDrivingClassModal
                  students={students?.map((student) => {
                    return {
                      label: student.name,
                      value: student.id,
                      number: String(student.number),
                      vehicles: student.driverLicenseCategory?.vehicles,
                      school: student.school,
                    }
                  })}
                />

                <CreateManyScheduleDrivingClassModal
                  students={students?.map((student) => {
                    return {
                      label: student.name,
                      value: student.id,
                      number: String(student.number),
                      vehicles: student.driverLicenseCategory?.vehicles,
                      school: student.school,
                    }
                  })}
                />
              </>
            )}
          </SearchInput>
        </div>

        <SearchInput
          className="lg:!w-80"
          placeholder="Pesquisar pelo número do aluno"
          setInputValue={setInputValueCode}
          type="number"
        >
          <Select
            className="lg:!w-96"
            placeHolder="Filtrar por dia"
            data={[{ label: 'Todos', value: 'all' }, ...(uniqueDates ?? [])]}
            onChange={(event) =>
              setInputValueDate(event.target.value.split('T')[0])
            }
          />
        </SearchInput>

        <Skeleton className="mt-11 h-[28.688rem] w-full rounded-lg" />

        <div className="mt-4 flex items-center justify-center gap-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="">Página {currentPage + 1}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={startIndex + itemsPerPage >= total}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="-mt-4 w-full max-w-7xl xl:pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">
        Listagem das aulas de condução marcadas
      </h1>

      <div className="flex max-w-3xl flex-col items-center xl:flex-row">
        <SearchInput
          setInputValue={setInputValueName}
          placeholder="Filtrar por nome de aluno"
          className="lg:!w-96"
        >
          {userFunction !== 'INSTRUCTOR' && (
            <>
              <CreateScheduleDrivingClassModal
                students={students?.map((student) => {
                  return {
                    label: student.name,
                    value: student.id,
                    number: String(student.number),
                    vehicles: student.driverLicenseCategory?.vehicles,
                    school: student.school,
                  }
                })}
              />

              <CreateManyScheduleDrivingClassModal
                students={students?.map((student) => {
                  return {
                    label: student.name,
                    value: student.id,
                    number: String(student.number),
                    vehicles: student.driverLicenseCategory?.vehicles,
                    school: student.school,
                  }
                })}
              />
            </>
          )}
        </SearchInput>
      </div>

      <SearchInput
        className="lg:!w-80"
        placeholder="Pesquisar pelo número do aluno"
        setInputValue={setInputValueCode}
        type="number"
      >
        <Select
          className="lg:!w-96"
          placeHolder="Filtrar por dia"
          data={[{ label: 'Todos', value: 'all' }, ...(uniqueDates ?? [])]}
          onChange={(event) => setInputValueDate(event.target.value)}
        />
      </SearchInput>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {filteredScheduledClassesByDate?.map((schedule) => {
          return (
            <Dialog key={schedule?.id}>
              <DialogTrigger className="flex w-full gap-3 rounded-md border px-4 py-2 hover:border-[#E86255]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86255] text-white">
                  <User2 size={24} />
                </div>
                <div className="w-[80%] text-left">
                  <p className="w-[85%] truncate font-medium">
                    {schedule?.student?.name}
                  </p>
                  <p className="w-[85%] truncate text-sm text-[#b1b2bc]">
                    {schedule?.student?.email}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-[95vw] sm:max-w-96">
                <div className="mt-4 flex flex-col gap-4">
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E86255] text-white">
                      <User2 size={32} />
                    </div>
                    <h1 className="text-lg font-medium">
                      {schedule?.student?.name}
                    </h1>
                    <p className="text-[#b1b2bc]">{schedule?.student?.email}</p>
                    <p className="mt-2 rounded px-4 py-2">
                      {schedule?.status === 'COMPLETED'
                        ? 'COMPLETADA'
                        : schedule?.status === 'CONFIRMED'
                          ? 'CONFIRMADA'
                          : schedule?.status === 'CANCELED'
                            ? 'CANCELADA'
                            : schedule?.status === 'PENDING'
                              ? 'PENDENTE'
                              : schedule?.status === 'MISSED'
                                ? 'FALTOU'
                                : 'DESMARCADA'}
                    </p>

                    <div className="mt-2 flex flex-col gap-2 border-y py-2 text-left">
                      <p className="flex items-center justify-between">
                        Escola: <span>{schedule?.student.school.name}</span>
                      </p>

                      <p className="flex items-center justify-between">
                        Data:{' '}
                        <span>
                          {schedule?.schedulingDate} {schedule?.schedulingHour}
                        </span>
                      </p>

                      <p className="flex items-center justify-between">
                        Título: <span>{schedule?.class?.name}</span>
                      </p>

                      <p className="flex items-center justify-between">
                        Veículo:{' '}
                        <span>{schedule?.vehicle ?? 'Não informado'}</span>
                      </p>

                      <p className="flex items-center justify-between">
                        Instrutor:{' '}
                        <span>
                          {schedule?.instructor?.name ?? 'Não informado'}
                        </span>
                      </p>

                      <p className="flex items-center justify-between">
                        ID Escola:{' '}
                        <span>
                          {schedule?.student.imtId ?? 'Não informado'}
                        </span>
                      </p>

                      {schedule?.status === 'CANCELED' && (
                        <p className="flex items-center justify-between">
                          Justificação:{' '}
                          <span>
                            {schedule?.justification ?? 'Não informado'}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <EditScheduledDrivingLessonModal
                    scheduledClass={schedule}
                    trigger
                  />
                  <DeleteScheduledDrivingLesson
                    scheduledClass={schedule}
                    trigger
                  />
                </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>

      <div className="hidden lg:block">
        <ScheduledDrivingLessonsTable
          scheduledClasses={filteredScheduledClassesByDate ?? []}
        />
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="">Página {currentPage + 1}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={startIndex + itemsPerPage >= total}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
