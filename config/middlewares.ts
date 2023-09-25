import { METHOD } from "../src/middlewares/config";

export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'global::validations',
    config: [
      {
        path: ['api::inventory.inventory', 'inventories'],
        method: METHOD.POST,
        propertiesRequired: ['product', 'warehouse', 'available'],
        relationsRequired: ['product', 'warehouse'],
      },
      {
        path: ['api::inventory.inventory/:id', 'inventories/:id'],
        method: METHOD.PUT,
        propertiesRequired: ['product', 'warehouse', 'available'],
        relationsRequired: ['product', 'warehouse'],
      }
    ]
  }
];
