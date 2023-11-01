import { Module } from '@nestjs/common';
import { VolumesService } from './volumes.service';
import { VolumesController } from './volumes.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [VolumesController],
  providers: [VolumesService, PrismaService],
})
export class VolumesModule {}
