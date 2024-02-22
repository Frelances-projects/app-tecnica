'use client'
import { useState } from 'react'
import { Pencil, X } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { EditDriverLicenseCategoryForm } from './EditDriverLicenseCategoryForm'

import type { DriverLicenseCategory } from '@/utils/interfaces/driver-license-category'

interface EditScheduledDrivingLessonModalProps {
  driverLicenseCategory: DriverLicenseCategory
  trigger?: boolean
}

export function EditDriverLicenseCategoryModal({
  driverLicenseCategory,
  trigger,
}: EditScheduledDrivingLessonModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      {trigger ? (
        <AlertDialogTrigger className="w-full rounded-lg border px-4 py-2 transition-colors duration-200 ease-linear hover:bg-[#E86255] hover:text-white">
          Editar preço
        </AlertDialogTrigger>
      ) : (
        <AlertDialogTrigger>
          <Pencil size={16} className="hover:cursor-pointer" />
        </AlertDialogTrigger>
      )}
      <AlertDialogContent className="w-full max-w-xl overflow-y-auto">
        <div className="flex justify-between">
          <h1 className="text-lg font-bold">
            Editar preços da categoria: {driverLicenseCategory.name}
          </h1>
          <AlertDialogCancel className="border-0 shadow-none outline-none">
            <X size={20} />
          </AlertDialogCancel>
        </div>

        <EditDriverLicenseCategoryForm
          setIsModalOpen={setIsModalOpen}
          driverLicenseCategory={driverLicenseCategory}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
