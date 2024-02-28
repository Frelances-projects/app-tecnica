import { User2 } from 'lucide-react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import type { Test } from '@/utils/interfaces/tests'
import type { ScheduleClass } from '@/utils/interfaces/schedule-class'

interface InstructorScheduledMobileModalProps {
  data: Test | ScheduleClass
}

export function InstructorScheduledMobileModal({
  data,
}: InstructorScheduledMobileModalProps) {
  if (data.slug === 'scheduled-class') {
    const schedule = data as ScheduleClass

    return (
      <Dialog>
        <DialogTrigger className="flex w-full gap-3 rounded-md border px-4 py-2 hover:border-[#E86255]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86255] text-white">
            <User2 size={24} />
          </div>

          <div className="w-[80%] text-left">
            <p className="w-[85%] truncate font-medium">Aula prática</p>

            <p className="w-[85%] truncate text-sm text-[#b1b2bc]">
              {schedule?.student?.name}
            </p>
          </div>
        </DialogTrigger>

        <DialogContent className="w-full max-w-[95vw] sm:max-w-96">
          <div className="mt-4 flex flex-col gap-4">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E86255] text-white">
                <User2 size={32} />
              </div>

              <h1 className="text-lg font-medium">{schedule?.student?.name}</h1>
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
                  Veículo: <span>{schedule?.vehicle ?? 'Não informado'}</span>
                </p>

                <p className="flex items-center justify-between">
                  Instrutor:{' '}
                  <span>{schedule?.instructor?.name ?? 'Não informado'}</span>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  } else {
    const test = data as Test

    return (
      <Dialog>
        <DialogTrigger className="flex w-full gap-3 rounded-md border px-4 py-2 hover:border-[#E86255]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86255] text-white">
            <User2 size={24} />
          </div>

          <div className="w-[80%] text-left">
            <p className="w-[85%]  truncate font-medium">
              {test.category === 'THEORETICAL'
                ? 'Teste Teórico'
                : 'Teste Prático'}
            </p>

            <p className="w-[85%] truncate text-sm text-[#b1b2bc]">
              {test?.student?.name}
            </p>
          </div>
        </DialogTrigger>

        <DialogContent className="w-full max-w-[95vw] sm:max-w-96">
          <div className="mt-4 flex flex-col gap-4">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E86255] text-white">
                <User2 size={32} />
              </div>

              <h1 className="text-lg font-medium">{test?.student?.name}</h1>
              <p className="text-[#b1b2bc]">{test?.student?.email}</p>

              <p className="mt-2 rounded px-4 py-2">
                {test.category === 'THEORETICAL'
                  ? 'Teste Teórico'
                  : 'Teste Prático'}
              </p>

              <div className="mt-2 flex flex-col gap-2 border-y py-2 text-left">
                <p className="flex items-center justify-between">
                  Escola: <span>{test?.student.school.name}</span>
                </p>

                <p className="flex items-center justify-between">
                  Data:{' '}
                  <span>
                    {test.testDate} {test.testHour}
                  </span>
                </p>

                <p className="flex items-center justify-between">
                  Instrutor:{' '}
                  <span>{test?.instructor?.name ?? 'Não informado'}</span>
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}
