import { Activities } from '@prisma/client';
import { FilterProps, ICriteria } from 'src/utils/types/filters.props';
import { CreateActivityDto } from '../dtos/create-activity.dto';
import { UpdateActivityDto } from '../dtos/update-activity.dto';

export abstract class ActivityRepository {
  abstract findAll({
    criteria,
    pagination,
  }: FilterProps): Promise<Activities[]>;
  abstract findBy(criteria: ICriteria): Promise<Activities | null>;
  abstract create(body: CreateActivityDto): Promise<Activities>;
  abstract update(id: string, body: UpdateActivityDto): Promise<Activities>;
  abstract delete(id: string): Promise<void>;
}
