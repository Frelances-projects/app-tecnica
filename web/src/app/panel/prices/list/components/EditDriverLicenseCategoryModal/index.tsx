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
}

export function EditDriverLicenseCategoryModal({
  driverLicenseCategory,
}: EditScheduledDrivingLessonModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger>
        <Pencil size={16} className="hover:cursor-pointer" />
      </AlertDialogTrigger>
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
