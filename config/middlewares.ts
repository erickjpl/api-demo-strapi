import { rulesWarehouse } from "../src/api/warehouse/rules";
import { rulesCategory } from "../src/api/category/rules";
import { rulesProduct } from "../src/api/product/rules";
import { rulesInventory } from "../src/api/inventory/rules";

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
    name: 'global::validation-rules',
    config: [
      ...rulesWarehouse,
      ...rulesCategory,
      ...rulesProduct,
      ...rulesInventory,
    ]
  }
];
