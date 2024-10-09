import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PostProviders } from './entities/post.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, ...PostProviders],
})
export class PostsModule {}
