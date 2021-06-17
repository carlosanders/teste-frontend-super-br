// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    test: false,
    production: false,
    hmr: false,
    base_url: 'http://localhost:8000/',
    base_url_x509: '',
    jnlp: 'jnlp://localhost:8000/',
    api_url: 'http://localhost:8000/v1/',
    mercure_hub: 'http://localhost:4000/.well-known/mercure',
    xdebug: '?XDEBUG_SESSION_START=docker',
    barramento: true
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
