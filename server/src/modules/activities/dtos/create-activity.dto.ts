import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Activities } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, Matches } from 'class-validator';

export class CreateActivityDto implements Omit<Activities, 'id'> {
  @ApiProperty({ required: true, example: 'Consulta médica' })
  @IsNotEmpty({ message: "O campo 'Nome' é obrigatório" })
  name: string;

  @ApiProperty({ required: true, example: '2025-02-15' })
  @IsNotEmpty({ message: "O campo 'Data' é obrigatório" })
  @Type(() => Date)
  @IsDate({ message: "O campo 'Data' deve seguir o formato 'yyyy-mm-dd'" })
  date: Date;

  @ApiProperty({ required: true, example: 'HH:mm:ss' })
  @IsNotEmpty({ message: "O campo 'Hora de inicio' é obrigatório" })
  @Matches(/^\d{2}:\d{2}:\d{2}$/, {
    message: "O campo 'Hora de inicio' deve estar no formato HH:mm:ss",
  })
  inicialized_at: string;

  @ApiProperty({ required: true, example: 'HH:mm:ss' })
  @IsNotEmpty({ message: "O campo 'Hora de término' é obrigatório" })
  @Matches(/^\d{2}:\d{2}:\d{2}$/, {
    message: "O campo 'Hora de término' deve estar no formato HH:mm:ss",
  })
  finalized_at: string;
}
