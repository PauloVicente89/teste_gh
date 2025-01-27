import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Activities } from "@prisma/client";

export class UpdateActivityDto implements
  Omit<
    Activities,
    | 'id'
    | 'name'
    | 'date'
    | 'inicialized_at'
    | 'finalized_at'
  >
{
    @ApiProperty({ example: "Consulta médica"})
    name: string;

    @ApiProperty({ example: "2025-02-15"})
    date: Date;
    
    @ApiProperty({ example: "15:00"})
    inicialized_at: Date;

    @ApiProperty({ example: "15:45"})
    finalized_at: Date;
}
