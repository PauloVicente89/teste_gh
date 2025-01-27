import { Injectable } from '@nestjs/common';
import { Activities, PrismaClient } from '@prisma/client';
import { FilterProps, ICriteria } from 'src/utils/types/filters.props';
import { CreateActivityDto } from '../dtos/create-activity.dto';
import { UpdateActivityDto } from '../dtos/update-activity.dto';
import { ActivityRepository } from '../repositories/activity.repository';

interface IFilters {
  name?: any;
}

@Injectable()
export class PrismaActivityRepository implements ActivityRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(body: CreateActivityDto): Promise<Activities> {
    return await this.prisma.activities.create({ data: body });
  }

  async findAll({ criteria, pagination }: FilterProps): Promise<Activities[]> {
    const page = pagination?.page || 1;
    const perPage = pagination?.perPage || 20;
    const skip = (page - 1) * perPage;
    const where: IFilters = {};

    if (criteria?.name) {
      where.name = { contains: criteria?.name, mode: 'insensitive' };
    }

    return await this.prisma.activities.findMany({
      where: where,
      take: +perPage,
      skip: +skip,
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findBy(criteria: ICriteria): Promise<Activities | null> {
    return await this.prisma.activities.findFirst({
      where: criteria,
    });
  }

  async update(id: string, body: UpdateActivityDto): Promise<Activities> {
    return await this.prisma.activities.update({
      where: { id },
      data: body,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.activities.delete({
      where: { id },
    });
  }
}
