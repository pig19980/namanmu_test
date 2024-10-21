import { ArgumentMetadata, Injectable, PipeTransform, ValidationPipe } from '@nestjs/common';

@Injectable()
export class PostsPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata);
    const validPipe = new ValidationPipe({
      disableErrorMessages: true,
    });
    try {
      const val = await validPipe.transform(value, metadata);
      console.log(val, '????');
      return val;
    } catch (error) {
      console.log('catched in local pipe');
      throw error;
    }
  }
}
