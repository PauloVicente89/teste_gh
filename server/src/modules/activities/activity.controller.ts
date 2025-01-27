import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Activities } from '@prisma/client';
import { FilterProps } from 'src/utils/types/filters.props';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dtos/create-activity.dto';
import { UpdateActivityDto } from './dtos/update-activity.dto';
import { ActivityEntity } from './entities/activity.entity';

@Controller('activities')
export class ActivityController {
  constructor(
      private readonly activityService: ActivityService
  ) {}

  @Post()
  async create(@Body() body: CreateActivityDto): Promise<Activities> {
    return new ActivityEntity(await this.activityService.create(body))
  }
  
  @Get()
  async findAll(@Query() filters: FilterProps): Promise<{activities: Activities[], count: number}> {
    const query: Activities[] = await this.activityService.findAll({
      pagination: {
        page: filters?.pagination?.page || 1,
        perPage: filters?.pagination?.perPage || 10,
      },
      criteria: filters?.criteria,
    });
    const count: number = query.length
    const activities = query.map((activity: Activities) => new ActivityEntity(activity));
    return {activities, count}
  }

  @Patch(':id')
  async update(
    @Body() body: UpdateActivityDto, 
    @Param('id') id: string
  ) {
    const query = await this.activityService.update(id, body)
    return new ActivityEntity(query)
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.activityService.delete(id);
  }

}
