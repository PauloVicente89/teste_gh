import { ApiProperty } from '@nestjs/swagger';
import { Activities } from '@prisma/client';

export class ActivityEntity implements Activities {
  constructor(partial: Partial<ActivityEntity>) {
    Object.assign(this, partial)
  }
  
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  inicialized_at: Date;

  @ApiProperty()
  finalized_at: Date;
}
