import { Copy, User2 } from 'lucide-react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { EditStudentModal } from '../EditStudentModal'
import { DeleteStudentModal } from '../DeleteStudentModal'
import { useToast } from '../ui/use-toast'

import type { Student } from '@/utils/interfaces/student'

interface StudentMobileModalProps {
  student: Student
  categoryCard?: {
    value: string
    label: string
    schoolId: string
  }[]
  schools?: {
    value: string
    label: string
  }[]
}

export function StudentMobileModal({
  student,
  categoryCard,
  schools,
}: StudentMobileModalProps) {
  const { toast } = useToast()

  function handleCopyStudentId(id: string) {
    navigator.clipboard.writeText(id)

    toast({
      title: 'ID copiado com sucesso!',
      description: 'ID copiado para a área de transferência com sucesso',
    })
  }

  const completedLessons = student.scheduledClass?.filter(
    (scheduledClass) =>
      scheduledClass.status === 'COMPLETED' ||
      scheduledClass.status === 'CONFIRMED',
  )
  const completedCodeLessons =
    completedLessons?.filter(
      (lesson) => lesson.class.category === 'THEORETICAL',
    ).length || 0

  if (
    student.driverLicenseCategory &&
    student.driverLicenseCategory.vehicles &&
    student.driverLicenseCategory.vehicles.length > 1
  ) {
    const completedPracticalLessonsByVehicle: Record<string, number> = {}

    student.driverLicenseCategory.vehicles.forEach((vehicle) => {
      completedPracticalLessonsByVehicle[vehicle] = 0
    })

    completedLessons?.forEach((lesson) => {
      if (
        lesson.class.category === 'PRACTICAL' &&
        lesson.vehicle &&
        student.driverLicenseCategory!.vehicles!.includes(lesson.vehicle)
      ) {
        completedPracticalLessonsByVehicle[lesson.vehicle]++
      }
    })

    return (
      <Dialog key={student?.id}>
        <DialogTrigger className="flex w-full gap-3 rounded-md border px-3 py-2 hover:border-[#E86255]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86255] text-white">
            <User2 size={24} />
          </div>

          <div className="w-[80%] text-left">
            <p className="w-[85%] truncate font-medium">{student?.name}</p>
            <p className="w-[85%] truncate text-sm text-[#b1b2bc]">
              {student?.email}
            </p>
          </div>
        </DialogTrigger>

        <DialogContent className="w-full max-w-[95vw] sm:max-w-96">
          <div className="mt-4 flex flex-col gap-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E86255] text-white">
              <User2 size={32} />
            </div>

            <div className="text-center">
              <h1 className="text-lg font-medium">{student?.name}</h1>
              <p className="text-[#b1b2bc]">{student?.email}</p>

              <div className="mt-4 flex flex-col gap-2 border-y py-2 text-left">
                <p className="mt-2 flex items-center justify-between">
                  ID
                  <button
                    onClick={() => handleCopyStudentId(student.imtId ?? '')}
                  >
                    <Copy
                      size={20}
                      className="hover:cursor-pointer hover:text-green-600"
                    />
                  </button>
                </p>

                <p className="mt-2 flex items-center justify-between">
                  Data: <span>{student?.enrolledAt}</span>
                </p>

                <p className="flex items-center justify-between">
                  Número: <span>{student?.number}</span>
                </p>

                <p className="flex items-center justify-between">
                  Escola: <span>{student?.school?.name}</span>
                </p>

                <p className="flex items-center justify-between">
                  Aulas de código: <span>{completedCodeLessons}</span>
                </p>

                {Object.entries(completedPracticalLessonsByVehicle).map(
                  ([vehicle, count]) => (
                    <p
                      className="flex items-center justify-between"
                      key={vehicle}
                    >
                      Aulas de condução ({vehicle}): {count}
                    </p>
                  ),
                )}
              </div>

              <div className="mt-4 flex gap-4">
                <EditStudentModal
                  student={student}
                  schools={schools!}
                  categoryCard={categoryCard!}
                  trigger
                />
                <DeleteStudentModal
                  id={student?.id}
                  title={student?.name}
                  trigger
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  } else {
    const completedPracticalLessons =
      completedLessons?.filter(
        (lesson) => lesson.class.category === 'PRACTICAL',
      ).length || 0

    return (
      <Dialog key={student?.id}>
        <DialogTrigger className="flex w-full gap-3 rounded-md border px-3 py-2 hover:border-[#E86255]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86255] text-white">
            <User2 size={24} />
          </div>

          <div className="w-[80%] text-left">
            <p className="w-[85%] truncate font-medium">{student?.name}</p>
            <p className="w-[85%] truncate text-sm text-[#b1b2bc]">
              {student?.email}
            </p>
          </div>
        </DialogTrigger>

        <DialogContent className="w-full max-w-[95vw] sm:max-w-96">
          <div className="mt-4 flex flex-col gap-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E86255] text-white">
              <User2 size={32} />
            </div>

            <div className="text-center">
              <h1 className="text-lg font-medium">{student?.name}</h1>
              <p className="text-[#b1b2bc]">{student?.email}</p>

              <div className="mt-4 flex flex-col gap-2 border-y py-2 text-left">
                <p className="mt-2 flex items-center justify-between">
                  ID
                  <button
                    onClick={() => handleCopyStudentId(student.imtId ?? '')}
                  >
                    <Copy
                      size={20}
                      className="hover:cursor-pointer hover:text-green-600"
                    />
                  </button>
                </p>

                <p className="mt-2 flex items-center justify-between">
                  Data: <span>{student?.enrolledAt}</span>
                </p>

                <p className="flex items-center justify-between">
                  Número: <span>{student?.number}</span>
                </p>

                <p className="flex items-center justify-between">
                  Escola: <span>{student?.school?.name}</span>
                </p>

                <p className="flex items-center justify-between">
                  Aulas de código: <span>{completedCodeLessons}</span>
                </p>

                <p className="flex items-center justify-between">
                  Aulas de condução: <span>{completedPracticalLessons}</span>
                </p>
              </div>

              <div className="mt-4 flex gap-4">
                <EditStudentModal
                  student={student}
                  schools={schools!}
                  categoryCard={categoryCard!}
                  trigger
                />
                <DeleteStudentModal
                  id={student?.id}
                  title={student?.name}
                  trigger
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
}
