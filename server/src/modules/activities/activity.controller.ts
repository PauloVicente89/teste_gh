import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { Activities } from '@prisma/client';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dtos/create-activity.dto';
import { UpdateActivityDto } from './dtos/update-activity.dto';
import { ActivityEntity } from './entities/activity.entity';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async create(@Body() body: CreateActivityDto): Promise<Activities> {
    return new ActivityEntity(await this.activityService.create(body));
  }

  @Get()
  async findAll(@Query() filters: any): Promise<{ activities: Activities[]; count: number }> {
    try {
      const query: Activities[] = await this.activityService.findAll({
        pagination: {
          page: filters?.page || 1,
          perPage: filters?.perPage || 10,
        },
        criteria: filters,
      });
      const count: number = query.length;
      const activities = query.map((activity: Activities) => new ActivityEntity(activity));
      return { activities, count };
    } catch (error) {
      throw(error)
    }
  }

  @Patch(':id')
  async update(@Body() body: UpdateActivityDto, @Param('id') id: string) {
    try {
      const query = await this.activityService.update(id, body);
      return new ActivityEntity(query);
    } catch (error) {
      throw(error)
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.activityService.delete(id);
    } catch (error) {
      throw(error)
    }
  }
}
