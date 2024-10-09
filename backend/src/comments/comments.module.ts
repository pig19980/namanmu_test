import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentProviders } from './entities/comment.providers';
import { UsersModule } from 'src/users/users.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule],
  controllers: [CommentsController],
  providers: [CommentsService, ...CommentProviders],
  exports: [CommentsService],
})
export class CommentsModule {}
