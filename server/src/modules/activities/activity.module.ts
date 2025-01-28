import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { PrismaActivityRepository } from './prisma/prisma-activity.repository';
import { ActivityRepository } from './repositories/activity.repository';
import { ReportService } from '../reports/report.service';
import { PrismaReportRepository } from '../reports/prisma/prisma-report.repository';
import { ReportRepository } from '../reports/repositories/report.repository';

@Module({
  imports: [],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    { provide: ActivityRepository, useClass: PrismaActivityRepository },
    ReportService,
    { provide: ReportRepository, useClass: PrismaReportRepository },
  ],
})
export class ActivityModule {}
