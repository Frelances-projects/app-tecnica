import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteDriverLicenseCategoryModal } from "./DeleteDriverLicenseCategoryModal";
import { EditDriverLicenseCategoryModal } from "./EditDriverLicenseCategoryModal";

import { DriverLicenseCategory } from '@/utils/interfaces/driver-license-category';

interface DriverLicenseCategoriesTableProps {
  driverLicenseCategories: DriverLicenseCategory[]
}

export function DriverLicenseCategoriesTable({ driverLicenseCategories }: DriverLicenseCategoriesTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>Nome da categoria</TableHead>
            <TableHead>Preço de cada parcela</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Escola</TableHead>
            <TableHead>Editar</TableHead>
            <TableHead>Apagar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {driverLicenseCategories?.map(driverLicenseCategory => (
            <TableRow key={driverLicenseCategory.id}>
              <TableCell>{driverLicenseCategory.name}</TableCell>
              <TableCell className='flex flex-col'>
                <div>1ª {driverLicenseCategory.installments.firstInstallment}</div>
                <div>2ª {driverLicenseCategory.installments.secondInstallment}</div>
                {
                  driverLicenseCategory.installments.thirdInstallment && 
                  <div>3ª {driverLicenseCategory.installments.thirdInstallment}</div>
                }
                {
                  driverLicenseCategory.installments.fourthInstallment && 
                  <div>4ª {driverLicenseCategory.installments.fourthInstallment}</div>
                }
              </TableCell>
              <TableCell>{driverLicenseCategory.price}</TableCell>
              <TableCell>{driverLicenseCategory.school.name}</TableCell>
              <TableCell>
                <EditDriverLicenseCategoryModal
                  driverLicenseCategory={driverLicenseCategory}
                />
              </TableCell>
              <TableCell>
                <DeleteDriverLicenseCategoryModal
                  id={driverLicenseCategory?.id}
                  title={driverLicenseCategory.name}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </div>
  )
}