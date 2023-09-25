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
        path: ['api::product.product', 'products'],
        method: METHOD.POST,
        propertiesRequired: ['product', 'price', 'available', 'category'],
        relationsRequired: ['category'],
      },
      {
        path: ['api::product.product/:id', 'products/:id'],
        method: METHOD.PUT,
        propertiesRequired: ['product', 'price', 'available', 'category'],
        relationsRequired: ['category'],
      },
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
      },
      {
        path: ['api::checkout.checkout', 'checkouts'],
        method: METHOD.POST,
        propertiesRequired: ['quantity', 'price', 'total', 'status'],
        relationsRequired: ['basket', 'inventory'],
      },
      {
        path: ['api::checkout.checkout/:id', 'checkouts/:id'],
        method: METHOD.PUT,
        propertiesRequired: ['quantity', 'price', 'total', 'status'],
        relationsRequired: ['basket', 'inventory'],
      }
    ]
  }
];
