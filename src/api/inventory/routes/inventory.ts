/**
 * inventory router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::inventory.inventory', {
  prefix: '',
  only: ['find', 'findOne', 'create', 'update', 'delete'],
  except: [],
  config: {
    find: {
      auth: false,
      middlewares: [],
      policies: [],
    },
    findOne: {},
    create: {},
    update: {},
    delete: {},
  },
});
