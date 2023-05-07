import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const user = request.userAuth;
    // console.log('user id' + user[data]);

    return data ? user[data] : user;
  },
);
