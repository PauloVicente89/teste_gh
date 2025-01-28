import { Injectable } from '@nestjs/common';
import { Reports, PrismaClient } from '@prisma/client';
import { FilterProps, ICriteria } from 'src/utils/types/filters.props';
import { CreateReportDto } from '../dtos/create-report.dto';
import { UpdateReportDto } from '../dtos/update-report.dto';
import { ReportRepository } from '../repositories/report.repository';

@Injectable()
export class PrismaReportRepository implements ReportRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(body: CreateReportDto): Promise<Reports> {
    return await this.prisma.reports.create({ data: body });
  }

  async findAll({ criteria, pagination }: FilterProps): Promise<Reports[]> {
    const page = pagination?.page || 1;
    const perPage = pagination?.perPage || 20;
    const skip = (page - 1) * perPage;
    return await this.prisma.reports.findMany({
      take: +perPage,
      skip: +skip,
      orderBy: {
        date: 'asc',
      },
    });
  }

  async findBy(criteria: ICriteria): Promise<Reports | null> {
    return await this.prisma.reports.findFirst({
      where: criteria,
    });
  }

  async update(id: string, body: UpdateReportDto): Promise<Reports> {
    return await this.prisma.reports.update({
      where: { id },
      data: body,
    });
  }
}
