const Strapi = require('@strapi/strapi');
const fs = require('fs');

let instance;

async function setupStrapi() {
  if (!instance) {
    const strapiInstance = await Strapi().load();
    instance = strapiInstance;

    await instance.server.mount();
  }
  return instance;
}

async function cleanupStrapi() {
  const dbSettings = instance.config.get('database.connection');

  //close server to release the db-file
  await instance.server.httpServer.close();

  // close the connection to the database before deletion
  await instance.db.connection.destroy();

  //delete test database after all tests have completed
  if (dbSettings && dbSettings.connection && dbSettings.connection.filename) {
    const tmpDbFile = dbSettings.connection.filename;
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
}

module.exports = { setupStrapi, cleanupStrapi };
