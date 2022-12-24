import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const className: string = context.getClass().name;
    const methodName: string = context.getHandler().name;
    const methodArguments: object = context.getArgByIndex(1);
    this.logger.log(
      `${className}.${methodName} method called with arguments: ${JSON.stringify(
        methodArguments,
      )}`,
    );
    return next.handle();
  }
}
