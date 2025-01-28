import { Controller, Get, Query } from '@nestjs/common';
import { Reports } from '@prisma/client';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async findAll(@Query() filters: any): Promise<{ data: Reports[]; count: number }> {
    try {
      return await this.reportService.findAll(filters);
    } catch {
      throw Error("Erro ao consultar o relatório")
    }
  }
}
