import { Controller, Post, Body, Get, Delete, Param, NotFoundException} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {

    return await this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  async getAll() {

    return await this.categoryService.getAllCategories();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    
    const Category = await this.categoryService.findCategoryById(id);
    
    if(!Category) {
      throw new NotFoundException('Categoria não encontrada');
    }
    
    return this.categoryService.deleteCategory(id);
  }
}
