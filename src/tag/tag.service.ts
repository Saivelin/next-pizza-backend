import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TagDto } from './tag.dto';

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService){}

    getAll(){
        return this.prisma.tags.findMany({include: {product: true}})
    }

    create(dto: TagDto){
        return this.prisma.tags.create({
            data: dto
        })
    }

    async delete(id){
        const exist = await this.prisma.tags.findFirst({where:{id:id}})
        console.log(exist)
        if(exist){
            return this.prisma.tags.delete({where: {id: id}})
        }
        else{
            return `The tag with id ${id} does not exist`
        }
    }
//   create(createTagDto: CreateTagDto) {
//     return 'This action adds a new tag';
//   }

//   findAll() {
//     return `This action returns all tag`;
//   }

  findOne(id: number) {
    return this.prisma.tags.findFirst({where:{id:id}});
  }

  update(id: number, updateTagDto: TagDto) {
    return this.prisma.tags.update({data: updateTagDto, where: {id: id}});
  }

//   remove(id: number) {
//     return `This action removes a #${id} tag`;
//   }
}
