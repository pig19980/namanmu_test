import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { PostProviders } from './entities/post.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [AuthModule, UsersModule, CommentsModule, DatabaseModule],
  controllers: [PostsController],
  providers: [PostsService, ...PostProviders],
  exports: [PostsService],
})
export class PostsModule {}
