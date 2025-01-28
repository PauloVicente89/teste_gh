import { Module } from '@nestjs/common';
import { PrismaReportRepository } from './prisma/prisma-report.repository';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { ReportRepository } from './repositories/report.repository';

@Module({
  controllers: [ReportController],
  providers: [
    ReportService,
    { provide: ReportRepository, useClass: PrismaReportRepository },
  ],
})
export class ReportModule {}
