import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { StaticPageModule } from './static-page.module';

@Module({
  imports: [AuthModule, PostsModule, UsersModule, StaticPageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
