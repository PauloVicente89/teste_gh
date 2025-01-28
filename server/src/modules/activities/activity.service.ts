import { Injectable, NotFoundException } from '@nestjs/common';
import { Activities } from '@prisma/client';
import { CreateActivityDto } from './dtos/create-activity.dto';
import { UpdateActivityDto } from './dtos/update-activity.dto';
import { ActivityEntity } from './entities/activity.entity';
import { ActivityRepository } from './repositories/activity.repository';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async create(body: CreateActivityDto): Promise<Activities> {
    return await this.activityRepository.create(body);
  }

  async findAll(filters: any): Promise<{ data: Activities[]; count: number }> {
    const query: Activities[] = await this.activityRepository.findAll({
      pagination: {
        page: filters?.page || 1,
        perPage: filters?.perPage || 10,
      },
      criteria: filters,
    });
    const count: number = query.length;
    const data = query.map((activity: Activities) => new ActivityEntity(activity));
    return { data, count };
  }

  async update(id: string, body: UpdateActivityDto): Promise<Activities> {
    const query = await this.activityRepository.findBy({ id })
    if(!query) throw new NotFoundException("Registro não encontrado.")
    return await this.activityRepository.update(id, body);
  }

  async delete(id: string): Promise<void> {
    const query = await this.activityRepository.findBy({ id })
    if(!query) throw new NotFoundException("Registro não encontrado.")
    return await this.activityRepository.delete(id);
  }
}
