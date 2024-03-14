import { environment } from '@env';
import  { setRemoteDefinitions } from '@nx/angular/mf';
let manifest = 'assets/module-federation.manifest.json'

if(environment.production) {
    manifest = 'assets/module-federation.manifest.prod.json'
}
fetch(manifest)
    .then((resp) => resp.json())
    .then((definitions) => setRemoteDefinitions(definitions))
    .then(() => import('./bootstrap').catch((err) => { console.error(err)}))