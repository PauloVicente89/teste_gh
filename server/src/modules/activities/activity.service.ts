import { Injectable, NotFoundException } from '@nestjs/common';
import { Activities } from '@prisma/client';
import { FilterProps } from 'src/utils/types/filters.props';
import { CreateActivityDto } from './dtos/create-activity.dto';
import { UpdateActivityDto } from './dtos/update-activity.dto';
import { ActivityRepository } from './repositories/activity.repository';

@Injectable()
export class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async create(body: CreateActivityDto): Promise<Activities> {
    return await this.activityRepository.create(body);
  }

  async findAll({ criteria, pagination }: FilterProps): Promise<Activities[]> {
    return await this.activityRepository.findAll({ criteria, pagination });
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
