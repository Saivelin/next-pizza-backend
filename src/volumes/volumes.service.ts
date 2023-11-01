import { Injectable } from '@nestjs/common';
import { CreateVolumeDto } from './dto/create-volume.dto';
import { UpdateVolumeDto } from './dto/update-volume.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VolumesService {
    constructor(private prisma: PrismaService) {}
    create(createVolumeDto: CreateVolumeDto) {
    return this.prisma.volumes.create({data: {
        price: createVolumeDto.price,
        volume:  createVolumeDto.volume,
    }});
  }

  findAll() {
    return `This action returns all volumes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} volume`;
  }

  update(id: number, updateVolumeDto: UpdateVolumeDto) {
    return `This action updates a #${id} volume`;
  }

  remove(id: number) {
    return `This action removes a #${id} volume`;
  }
}
