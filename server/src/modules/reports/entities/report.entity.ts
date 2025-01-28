import { ApiProperty } from '@nestjs/swagger';
import { Reports } from '@prisma/client';

export class ReportEntity implements Reports {
  constructor(partial: Partial<ReportEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  hours: string;
}
