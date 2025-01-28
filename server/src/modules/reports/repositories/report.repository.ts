import { Reports } from '@prisma/client';
import { FilterProps, ICriteria } from 'src/utils/types/filters.props';
import { CreateReportDto } from '../dtos/create-report.dto';
import { UpdateReportDto } from '../dtos/update-report.dto';

export abstract class ReportRepository {
  abstract findAll({ criteria, pagination }: FilterProps): Promise<Reports[]>;
  abstract findBy(criteria: ICriteria): Promise<Reports | null>;
  abstract create(body: CreateReportDto): Promise<Reports>;
  abstract update(id: string, body: UpdateReportDto): Promise<Reports>;
}
