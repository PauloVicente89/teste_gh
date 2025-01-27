import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Activities } from "@prisma/client";

export class CreateActivityDto implements
  Omit<
    Activities,
    | 'id'
  >
{
    @ApiProperty({ required: true, example: "Consulta médica"})
    name: string;

    @ApiProperty({ required: true, example: "2025-02-15"})
    date: Date;
    
    @ApiProperty({ required: true, example: "15:00"})
    inicialized_at: Date;

    @ApiProperty({ required: true, example: "15:45"})
    finalized_at: Date;
}
