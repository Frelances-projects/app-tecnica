import { BadgeCheck } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import type { Student } from '@/utils/interfaces/student'
import type { ScheduleClass } from '@/utils/interfaces/schedule-class'

interface CompletedLessonsModalProps {
  student: Student
  completedLessons?: ScheduleClass[]
}

export function CompletedLessonsModal({
  student,
  completedLessons,
}: CompletedLessonsModalProps) {
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
      <AlertDialog>
        <AlertDialogTrigger>
          <BadgeCheck
            size={20}
            className="hover:cursor-pointer hover:text-green-600"
          />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex flex-col items-start gap-y-3">
              <div className="mt-4 flex gap-x-4">
                <span className="text-lg">Aulas de código completadas:</span>
                <strong className="text-lg">{completedCodeLessons}</strong>
              </div>

              {Object.entries(completedPracticalLessonsByVehicle).map(
                ([vehicle, count]) => (
                  <div className="flex gap-x-4" key={vehicle}>
                    <span className="text-lg">
                      Aulas de condução completadas ({vehicle}):
                    </span>
                    <strong className="text-lg">{count}</strong>
                  </div>
                ),
              )}
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#E3000F] text-white transition-colors duration-300 hover:text-white enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60">
              Ok
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  } else {
    const completedPracticalLessons =
      completedLessons?.filter(
        (lesson) => lesson.class.category === 'PRACTICAL',
      ).length || 0

    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <BadgeCheck
            size={20}
            className="hover:cursor-pointer hover:text-green-600"
          />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex flex-col items-start gap-y-3">
              <div className="mt-4 flex gap-x-4">
                <span className="text-lg">Aulas de código completadas:</span>
                <strong className="text-lg">{completedCodeLessons}</strong>
              </div>

              <div className="flex gap-x-4">
                <span className="text-lg">Aulas de condução completadas:</span>
                <strong className="text-lg">{completedPracticalLessons}</strong>
              </div>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#E3000F] text-white transition-colors duration-300 hover:text-white enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60">
              Ok
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
}
