export default ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  auth: {
    events: {
      onConnectionSuccess(e) {
        console.log(e.user, e.provider);
      },
      onConnectionError(e) {
        console.error(e.error, e.provider);
      },
    },
    options: {
      expiresIn: env('ADMIN_JWT_EXPIRES_IN', '7d'),
    },
    secret: env('ADMIN_JWT_SECRET'),
  },
  url: env('ADMIN_PUBLIC_URL', 'admin'),
  autoOpen: env.bool('AUTO_OPEN', false),
  host: env('HOST', 'localhost'),
  port: env.int('ADMIN_PORT', 8003),
  serveAdminPanel: env.bool('ADMIN_SERVE', true)
});
