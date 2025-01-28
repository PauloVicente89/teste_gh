import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './modules/activities/activity.module';
import { ReportModule } from './modules/reports/report.module';

@Module({
  imports: [ActivityModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
