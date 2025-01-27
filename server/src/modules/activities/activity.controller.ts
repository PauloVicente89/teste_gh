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
      return await this.activityService.findAll(filters);
    } catch {
      throw Error("Erro ao consultar atividades")
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
