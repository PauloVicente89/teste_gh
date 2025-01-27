import { Module } from '@nestjs/common';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { PrismaActivityRepository } from './prisma/prisma-activity.repository';
import { ActivityRepository } from './repositories/activity.repository';

@Module({
  imports: [],
  controllers: [ActivityController],
  providers: [
    ActivityService,
    { provide: ActivityRepository, useClass: PrismaActivityRepository },
  ],
})
export class ActivityModule {}
