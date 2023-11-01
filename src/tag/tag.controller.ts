import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common'
import { TagService } from './tag.service'
import { ValidationTypes } from 'class-validator'
import { TagDto } from './tag.dto'

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    async get() {
        return this.tagService.getAll()
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() dto: TagDto) {
        return this.tagService.create(dto)
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.tagService.delete(+id)
    }
    //   @Post()
    //   create(@Body() createTagDto: CreateTagDto) {
    //     return this.tagService.create(createTagDto);
    //   }

    //   @Get()
    //   findAll() {
    //     return this.tagService.findAll();
    //   }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tagService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTagDto: TagDto) {
        return this.tagService.update(+id, updateTagDto)
    }

    //   @Delete(':id')
    //   remove(@Param('id') id: string) {
    //     return this.tagService.remove(+id);
    //   }
}
