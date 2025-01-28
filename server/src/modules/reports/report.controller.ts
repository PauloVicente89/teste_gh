import { Controller, Get, Query } from '@nestjs/common';
import { Reports } from '@prisma/client';
import { FilterProps } from 'src/utils/types/filters.props';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async findAll(
    @Query() filters: FilterProps,
  ): Promise<{ data: Reports[]; count: number }> {
    try {
      return await this.reportService.findAll(filters);
    } catch {
      throw Error('Erro ao consultar o relatório');
    }
  }
}
