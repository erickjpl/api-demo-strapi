# 🚀 Getting started with Strapi

Testing the Headless CMS Strapi, setting up a small online store.

*Important Note: _You must use Node.js in version greater than 16 and less than 20._*

### `development`

Start the app in development mode.

```
npm run dev
# or
yarn dev
```

### `start`

Launch the app in preview mode.

```
npm run start
# or
yarn start
```

### `build`

Build the app so you can deploy it in production.

```
npm run build
# or
yarn build
```

## ⚙️ Add functionality with the Strapi console

With this command, you can use the Strapi console to create controllers, services, plugins, and more.

```
npx strapi generate
```

## ⚙️ Example for relationships 

To add or update a relationship you must send an object like the one seen in the example in the body of the request.

```
{
  "data": {
    "addRelated": {
      "connect": [{ id: 1 }]
    },
    "updateRelated": {
      "connect": [{ id: 2 }]
      "disconnect": [{ id: 1 }]
    }
  }
}
```

## ⚙️ Add Validation Rule

___To add a validation rule to the dashboard and API, you need to follow these steps.___

1. Create an interface in the module.
  > src/api/module-name/interface/model.ts
```
import { Relations } from "../../../middlewares/interfaces"

export interface Model {
  attributeModel: string
  related: Relations
  other: number
}
```
2. Create the module validation rules.
  > src/api/module-name/rules/index.ts
```
import { Config, METHOD } from "../../../middlewares/interfaces";
import { Model } from "../interfaces/model";

export const rulesModel: Config<Model>[] = [
  {
    path: ['api::api-name.controller-name', 'path-api-route'], // routes you want validation to be performed
    method: METHOD.POST, // the http method in which validation is required
    validations: [ // rules: src/middlewares/interfaces/Rule
      {
        attribute: 'attributeModel',
        rules: [
          { rule: 'required' },
          { rule: 'string' }
        ]
      },
      {
        attribute: 'related',
        rules: [
          { rule: 'relation_creating' },
          { rule: 'required' },
          { rule: 'numeric' }
        ]
      },
      {
        attribute: 'other',
        rules: [
          { rule: 'numeric' },
          { rule: 'required' },
          { rule: 'min_digits', value: 1 }
        ]
      }
    ]
  },
  {
    path: ['api::api-name.controller-name/:id', 'path-api-route/:id'],
    method: METHOD.PUT,
    validations: [
      {
        attribute: 'attributeModel',
        rules: [
          { rule: 'sometimes' },
          { rule: 'string' }
        ]
      },
      {
        attribute: 'related',
        rules: [
          { rule: 'relation_updating' },
          { rule: 'sometimes' },
          { rule: 'numeric' }
        ]
      },
      {
        attribute: 'other',
        rules: [
          { rule: 'numeric' },
          { rule: 'sometimes' }
        ]
      }
    ]
  }
]
```
3. Register the rules in the middleware configurations.
  > config/middlewares.ts
```
export default [
  ...,
  {
    name: 'global::validation-rules',
    config: [
      ...rulesModel
    ]
  }
];
```
