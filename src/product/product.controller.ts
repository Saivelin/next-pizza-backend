import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

//   @Get()
//   findAll() {
//     return this.productService.findAll();
//   }

  @Get()
    findAll(@Query() query) {
        if(!query.get || !query.page){
            return "Missing params get or page"
        }
        let tags = undefined
        if(query.tags){
            try{
                tags = JSON.parse(query.tags).map((el)=>{
                    return Number(el)
                })
            }
            catch{
                return `Tags is not number[]`
            }
        }
        return this.productService.findAll(query.get, query.page, tags);
    }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: CreateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
