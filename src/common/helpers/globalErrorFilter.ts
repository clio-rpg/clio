import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryErrorFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    const detail = exception.detail;
    if (typeof detail === 'string' && detail.includes('already exists')) {
      const messageStart =
        exception.table.replace(/s$/, '').split('_').join(' ') + ' with';
      throw new BadRequestException(
        exception.detail
          .replace('Key', messageStart)
          .split('=')
          .join(' ')
          .replace(/[^\w\s]/gi, ''),
      );
    }
    return super.catch(exception, host);
  }
}
