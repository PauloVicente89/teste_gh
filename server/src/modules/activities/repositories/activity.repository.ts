import { Activities } from "@prisma/client";
import { FilterProps } from "src/utils/types/filters.props";
import { CreateActivityDto } from "../dtos/create-activity.dto";
import { UpdateActivityDto } from "../dtos/update-activity.dto";

export abstract class ActivityRepository {
  abstract findAll({criteria, pagination}: FilterProps): Promise<Activities[]>;
  abstract create(body: CreateActivityDto): Promise<Activities>;
  abstract update(id: string, body: UpdateActivityDto): Promise<Activities>;
  abstract delete(id: string): Promise<void>;
}