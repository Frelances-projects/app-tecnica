import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ListOfDriverLicenseCategory } from './components/ListOfDriverLicenseCategory'

import { api } from '@/lib/api'

import { User } from '@/utils/interfaces/user'
import { DriverLicenseCategory } from '@/utils/interfaces/driver-license-category'

type AxiosData = {
  driverLicenseCategories: DriverLicenseCategory[]
}

function formatValues(driverLicenseCategories: DriverLicenseCategory[]) {
  const formattedData = driverLicenseCategories.map((driverLicenseCategory) => {
    const euroFormat = new Intl.NumberFormat('en-DE', {
      style: 'currency',
      currency: 'EUR',
    })

    const formattedPrice = euroFormat.format(driverLicenseCategory.price / 100)
    const formattedInstallments = {
      firstInstallment: euroFormat.format(
        driverLicenseCategory.installments.firstInstallment / 100,
      ),
      secondInstallment: euroFormat.format(
        driverLicenseCategory.installments.secondInstallment / 100,
      ),
      thirdInstallment: driverLicenseCategory.installments.thirdInstallment
        ? euroFormat.format(
            driverLicenseCategory.installments.thirdInstallment / 100,
          )
        : undefined,
      fourthInstallment: driverLicenseCategory.installments.fourthInstallment
        ? euroFormat.format(
            driverLicenseCategory.installments.fourthInstallment / 100,
          )
        : undefined,
    }

    return {
      ...driverLicenseCategory,
      price: formattedPrice,
      installments: formattedInstallments,
    }
  })

  return formattedData
}

export default async function PricesList() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!) as User

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  let returnedData

  if (formattedUser.function === 'DIRECTOR') {
    const { data } = await api.get<AxiosData>(`/driver-license-category`)

    const formattedData = formatValues(data.driverLicenseCategories)

    returnedData = formattedData
  } else {
    const { data } = await api.get<AxiosData>(
      `/driver-license-category/school/${formattedUser.schoolId}`,
    )

    const formattedData = formatValues(data.driverLicenseCategories)

    returnedData = formattedData
  }

  return (
    <main className="mb-16 mt-14 flex w-full flex-col gap-10 px-4 lg:max-w-[90vw] lg:px-0">
      <h1 className="text-xl">Gerir Preços</h1>
      <div className="mx-auto -mt-9 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <ListOfDriverLicenseCategory
        driverLicenseCategories={
          returnedData as unknown as DriverLicenseCategory[]
        }
      />
    </main>
  )
}
