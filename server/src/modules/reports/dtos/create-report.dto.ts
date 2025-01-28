import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Reports } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateReportDto 
  implements
    Omit<Reports, 'id' >
{
  @ApiProperty({ required: true, example: '2025-02-15' })
  @IsNotEmpty({ message: "O campo 'Data' é obrigatório" })
  @Type(() => Date)
  @IsDate({ message: "O campo 'Data' deve seguir o formato 'yyyy-mm-dd'" })
  date: Date;

  @ApiProperty({ required: true, example: 'HH:mm:ss' })
  @IsNotEmpty({ message: "O campo 'Horas' é obrigatório" })
  hours: string;
}
