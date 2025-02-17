import { Controller, Post, Body, Patch, Param, HttpCode, NotFoundException, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Post()
  @HttpCode(201)
  async createProfile(@Body() profileDescription: CreateProfileDto) {
    console.log(profileDescription);
        
    return await this.profileService.createProfile(profileDescription);
  }

  @Patch(':id')
  @HttpCode(200)
  async patchProfile(@Param('id') id: string, @Body() profile: CreateProfileDto) {
    console.log(profile);
      
    return await this.profileService.updateAuthorProfile(Number(id), profile);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    
    return this.profileService.deleteProfile(id);
  }
}
