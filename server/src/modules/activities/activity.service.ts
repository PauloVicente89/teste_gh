import { Injectable } from '@nestjs/common';
import { FilterProps } from 'src/utils/types/filters.props';
import { ActivityRepository } from './repositories/activity.repository';
import { CreateActivityDto } from './dtos/create-activity.dto';
import { Activities } from '@prisma/client';
import { UpdateActivityDto } from './dtos/update-activity.dto';

@Injectable()
export class ActivityService {
    constructor(
        private readonly activityRepository: ActivityRepository
    ) {}

    async create(body: CreateActivityDto): Promise<Activities> {
        return await this.activityRepository.create(body)
    }

    async findAll({criteria, pagination}: FilterProps): Promise<Activities[]> {
        return await this.activityRepository.findAll({criteria, pagination})
    }
    
    async update(id: string, body: UpdateActivityDto): Promise<Activities> {
        return await this.activityRepository.update(id, body)
    }
    
    async delete(id: string): Promise<void> {
        return await this.activityRepository.delete(id)
    }
}
