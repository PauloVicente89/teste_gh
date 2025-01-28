import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Activities } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, Matches } from 'class-validator';

export class UpdateActivityDto
  implements
    Omit<Activities, 'id' | 'name' | 'date' | 'inicialized_at' | 'finalized_at'>
{
  @ApiProperty({ example: 'Consulta médica' })
  @IsOptional()
  name: string;

  @ApiProperty({ example: '2025-02-15' })
  @Type(() => Date)
  @IsOptional()
  @IsDate({ message: "O campo 'Data' deve seguir o formato 'yyyy-mm-dd'" })
  date: Date;

  @ApiProperty({ example: 'HH:mm:ss' })
  @IsOptional()
  @Matches(/^\d{2}:\d{2}:\d{2}$/, {
    message: "O campo 'Hora de inicio' deve estar no formato 'HH:mm:ss'",
  })
  inicialized_at: string;

  @ApiProperty({ example: 'HH:mm:ss' })
  @IsOptional()
  @Matches(/^\d{2}:\d{2}:\d{2}$/, {
    message: "O campo 'Hora de término' deve estar no formato 'HH:mm:ss'",
  })
  finalized_at: string;
}
