import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { ProductModule } from './product/product.module';
import { VolumesModule } from './volumes/volumes.module';

@Module({
  imports: [TagModule, ProductModule, VolumesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
