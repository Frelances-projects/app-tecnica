import { Body, Controller, Get, Param, Put, Post, Delete } from '@nestjs/common'

import { CreateDriverLicenseCategory } from '../../../application/use-cases/driver-license-category/create-driver-license-category'
import { GetDriverLicenseCategoryById } from '../../../application/use-cases/driver-license-category/get-driver-license-category-by-id'
import { GetManyDriverLicenseCategory } from '../../../application/use-cases/driver-license-category/get-many-driver-license-categories'
import { GetManyDriverLicenseCategoryBySchool } from '../../../application/use-cases/driver-license-category/get-many-driver-license-categories-by-school'
import { UpdateDriverLicenseCategory } from '../../../application/use-cases/driver-license-category/update-driver-license-category'
import { DeleteDriverLicenseCategory } from '../../../application/use-cases/driver-license-category/delete-driver-license-category'

import { DriverLicenseCategoryViewModel } from '../view-models/driver-license-category-view-model'

import { CreateDriverLicenseCategoryBody } from '../dtos/driver-license-category/create-driver-license-category-body'
import { UpdateDriverLicenseCategoryBody } from '../dtos/driver-license-category/update-driver-license-category-body'

@Controller('driver-license-category')
export class DriverLicenseCategoryController {
  constructor(
    private getDriverLicenseCategoryById: GetDriverLicenseCategoryById,
    private getManyDriverLicenseCategory: GetManyDriverLicenseCategory,
    private createDriverLicenseCategory: CreateDriverLicenseCategory,
    private getManyDriverLicenseCategoryBySchool: GetManyDriverLicenseCategoryBySchool,
    private updateDriverLicenseCategory: UpdateDriverLicenseCategory,
    private deleteDriverLicenseCategory: DeleteDriverLicenseCategory,
  ) {}

  @Get(':driverLicenseCategoryId')
  async getById(
    @Param('driverLicenseCategoryId') driverLicenseCategoryId: string,
  ) {
    const { driverLicenseCategory } =
      await this.getDriverLicenseCategoryById.execute(driverLicenseCategoryId)

    return {
      driverLicenseCategory: DriverLicenseCategoryViewModel.toHTTP(
        driverLicenseCategory,
      ),
    }
  }

  @Get()
  async getMany() {
    const { driverLicenseCategories } =
      await this.getManyDriverLicenseCategory.execute()

    const driverLicenseCategoriesToHTTP = driverLicenseCategories.map(
      (driverLicenseCategory) =>
        DriverLicenseCategoryViewModel.toHTTP(driverLicenseCategory),
    )

    return {
      driverLicenseCategories: driverLicenseCategoriesToHTTP,
    }
  }

  @Get('school/:schoolId')
  async getManyBySchool(@Param('schoolId') schoolId: string) {
    const { driverLicenseCategories } =
      await this.getManyDriverLicenseCategoryBySchool.execute(schoolId)

    const driverLicenseCategoriesToHTTP = driverLicenseCategories.map(
      (driverLicenseCategory) =>
        DriverLicenseCategoryViewModel.toHTTP(driverLicenseCategory),
    )

    return {
      driverLicenseCategories: driverLicenseCategoriesToHTTP,
    }
  }

  @Post()
  async create(@Body() body: CreateDriverLicenseCategoryBody) {
    const { driverLicenseCategory } =
      await this.createDriverLicenseCategory.execute(body)

    return {
      driverLicenseCategory: DriverLicenseCategoryViewModel.toHTTP(
        driverLicenseCategory,
      ),
    }
  }

  @Put(':driverLicenseCategoryId')
  async update(
    @Param('driverLicenseCategoryId') driverLicenseCategoryId: string,
    @Body() body: UpdateDriverLicenseCategoryBody,
  ) {
    const {
      name,
      price,
      vehicles,
      firstInstallment,
      secondInstallment,
      thirdInstallment,
      fourthInstallment,
    } = body

    const { driverLicenseCategory } =
      await this.updateDriverLicenseCategory.execute({
        driverLicenseCategoryId,
        name,
        vehicles,
        price,
        firstInstallment,
        secondInstallment,
        thirdInstallment,
        fourthInstallment,
      })

    return {
      driverLicenseCategory: DriverLicenseCategoryViewModel.toHTTP(
        driverLicenseCategory,
      ),
    }
  }

  @Delete(':driverLicenseCategoryId')
  async delete(
    @Param('driverLicenseCategoryId') driverLicenseCategoryId: string,
  ) {
    await this.deleteDriverLicenseCategory.execute(driverLicenseCategoryId)
  }
}
