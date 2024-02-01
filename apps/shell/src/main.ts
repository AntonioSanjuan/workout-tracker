import  { setRemoteDefinitions } from '@nx/angular/mf';
const manifest = 'assets/module-federation.manifest.json'

fetch(manifest)
    .then((resp) => resp.json())
    .then((definitions) => setRemoteDefinitions(definitions))
    .then(() => import('./bootstrap').catch((err) => { console.error(err)}))