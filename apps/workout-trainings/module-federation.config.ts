import { ModuleFederationConfig } from '@nx/webpack';
const config: ModuleFederationConfig = {
  name: 'workout-trainings',
  exposes: {
    './routes': 'apps/workout-trainings/src/app/app.routes.ts',
  },
};

export default config;
