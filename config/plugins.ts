export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn:env('JWT_EXPIRES_IN', '7d'), // "45m", "10h", "2 days", "7d", "2y"
      },
    },
  },
});
