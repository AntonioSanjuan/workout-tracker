import { ModuleFederationConfig } from '@nx/webpack';
const config: ModuleFederationConfig = {
  name: 'workout-exercises',
  exposes: {
    './routes': 'apps/workout-exercises/src/app/app.routes.ts',
  },
};

export default config;
