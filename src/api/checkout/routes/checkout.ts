/**
 * checkout router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::checkout.checkout', {
  prefix: '',
  only: ['find', 'findOne'],
  except: ['create', 'update', 'delete'],
  config: {
    find: {
      auth: false,
      policies: [],
      middlewares: [],
    },
    findOne: {},
    create: {},
    update: {},
    delete: {},
  },
});
