import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
// import { UpdateProductDto } from './dto/update-product.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    create(createProductDto: CreateProductDto) {
        return this.prisma.products.create({
            data: {
                title: createProductDto.title,
                image: createProductDto.image,
                subtitle: createProductDto.subtitle,
                volume: {
                    connect: createProductDto.volume.map((el)=>{
                        return {id: el}
                    })
                },
                description: createProductDto.description,
                gallery: createProductDto.gallery,
                tag: {
                    connect: createProductDto.tag.map((el)=>{
                        return {id: el}
                    })
                }
            },
            include: {tag: true, volume: true}
        })
    }

    async findAll(get: number, page: number, tags?: number[]) {
        try {
            Number(get)
            Number(page)
        } catch {
            return 'get or page is not a number'
        }
        const n = Number(get) * Number(page)

        let response
        let count

        if(tags){
            response = await this.prisma.products.findMany({
                where: {
                    tag: {
                        some: {
                            id: {
                                in: [...tags]
                            }
                        }
                    }
                },
                orderBy: { id: 'desc' },
                take: Number(get),
                skip: Number(n),
                include: {tag: true, volume: true}
            })
            count = await this.prisma.products.count({
                where: {
                    tag: {
                        some: {
                            id: {
                                in: [...tags]
                            }
                        }
                    }
                },
            })
        }
        else{
            response = await this.prisma.products.findMany({
                orderBy: { id: 'desc' },
                take: Number(get),
                skip: Number(n),
                include: {tag: true, volume: true}
            })
            count = await this.prisma.products.count()
        }

        if (response.length > 0) {
            return {count: count, products: response}
        } else {
            return `Page number ${page} does not exist`
        }
    }

    findOne(id: number) {
        const item = this.prisma.products.findFirst({ where: { id: id } })
        if (item) {
            return item
        } else {
            return `Product with id ${id} does not exist`
        }
    }

    update(id: number, updateProductDto: CreateProductDto) {
        const item = this.prisma.products.findFirst({ where: { id: id } })
        if (item) {
            // return this.prisma.products.update({data: updateProductDto, where: {id: id}});
            return
        } else {
            return `Product with id ${id} does not exist`
        }
    }

    remove(id: number) {
        const item = this.prisma.products.findFirst({ where: { id: id } })
        if (item) {
            return this.prisma.products.delete({ where: { id: id } })
        } else {
            return `Product with id ${id} does not exist`
        }
    }

    removeAll(){
        return this.prisma.products.deleteMany()
    }
}
