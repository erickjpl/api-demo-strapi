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

## ⚙️ Deployment

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
