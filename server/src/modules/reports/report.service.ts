import { Injectable, NotFoundException } from '@nestjs/common';
import { Reports } from '@prisma/client';
import { CreateReportDto } from './dtos/create-report.dto';
import { UpdateReportDto } from './dtos/update-report.dto';
import { ReportEntity } from './entities/report.entity';
import { ReportRepository } from './repositories/report.repository';
import { ICriteria } from 'src/utils/types/filters.props';
import { calculateTimeSum } from 'src/utils/calculate-hours';

@Injectable()
export class ReportService {
  constructor(private readonly reportRepository: ReportRepository) {}

  async create(body: CreateReportDto): Promise<Reports> {
    return await this.reportRepository.create(body);
  }

  async findAll(filters: any): Promise<{ data: Reports[]; count: number }> {
    const query: Reports[] = await this.reportRepository.findAll({
      pagination: {
        page: filters?.page || 1,
        perPage: filters?.perPage || 10,
      },
      criteria: filters,
    });
    const count: number = query.length;
    const data = query.map((activity: Reports) => new ReportEntity(activity));
    return { data, count };
  }

  async findBy(criteria: ICriteria): Promise<Reports | null> {
    const query = await this.reportRepository.findBy(criteria);
    if (!query) throw new NotFoundException('Registro não encontrado.');
    return query;
  }

  async handlingReportCreation(body: CreateReportDto): Promise<Reports | null> {
    const query = await this.reportRepository.findBy({ date: body.date });
    if (!query) {
      return await this.reportRepository.create(body);
    }
    const hours = calculateTimeSum(query.hours, body.hours);
    return await this.reportRepository.update(query.id, { hours: hours });
  }

  async update(id: string, body: UpdateReportDto): Promise<Reports> {
    const query = await this.reportRepository.findBy({ id });
    if (!query) throw new NotFoundException('Registro não encontrado.');
    return await this.reportRepository.update(id, body);
  }
}
