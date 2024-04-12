import { ModuleFederationConfig } from '@nx/webpack';
const config: ModuleFederationConfig = {
  name: 'workout-exercise-templates',
  exposes: {
    './routes': 'apps/workout-exercise-templates/src/app/app.routes.ts',
  },
};

export default config;
