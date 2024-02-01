import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'account',
  exposes: {
    './Routes': 'apps/account/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
