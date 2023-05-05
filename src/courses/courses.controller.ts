import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './schemas/course.schema';

@Controller('courses')
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  @Get()
  async getCourses(): Promise<Course[]> {
    return this.courseService.getCourses();
  }

  @Get('bootcamps/:bootcampId/courses')
  async getCoursesByBootcamp(
    @Param('bootcampId') bootcampId: string,
  ): Promise<Course[]> {
    return this.courseService.getCoursesByBoootcamp(bootcampId);
  }
}
