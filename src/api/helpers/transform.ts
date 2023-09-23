import { parseMultipartData } from '@strapi/utils';

export const parseBody = (ctx) => {
  if (ctx.is('multipart')) {
    return parseMultipartData(ctx);
  }

  const { data } = ctx.request.body || {};

  return { data };
}
