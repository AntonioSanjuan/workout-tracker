import { ModuleFederationConfig } from '@nx/webpack';
const config: ModuleFederationConfig = {
  name: 'account',
  exposes: {
    './routes': 'apps/account/src/app/app.routes.ts',
  },
};

export default config;
