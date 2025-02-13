import { Module } from '@nestjs/common';
import { PrismaDatabaseModule } from 'src/prisma-database/prisma.module';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';

@Module({
    imports: [PrismaDatabaseModule],
    providers: [AuthorService],
    controllers: [AuthorController],
    exports: [AuthorService],
})
export class AuthorModule {}
