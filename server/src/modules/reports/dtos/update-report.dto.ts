import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Reports } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateReportDto 
  implements
    Omit<Reports, 'id' | 'date' | 'hours' >
{
  @ApiProperty({ example: '2025-02-15' })
  @Type(() => Date)
  @IsDate({ message: "O campo 'Data' deve seguir o formato 'yyyy-mm-dd'" })
  @IsOptional()
  date?: Date;

  @ApiProperty({ example: 'HH:mm:ss' })
  @IsOptional()
  hours?: string;
}
