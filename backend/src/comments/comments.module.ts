import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentProviders } from './entities/comment.providers';
import { UsersModule } from 'src/users/users.module';
import { PostsModule } from 'src/posts/posts.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [UsersModule, PostsModule, DatabaseModule],
  controllers: [CommentsController],
  providers: [CommentsService, ...CommentProviders],
})
export class CommentsModule {}
