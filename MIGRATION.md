# Migration Notes for Angular 18.2 Upgrade

Upgraded the workspace to Angular 18.2 (CLI/build/devkit, Material/CDK, RxJS 7.8, TypeScript 5.5, tslib 2.6) and 
refreshed npm scripts in package.json:23-69, together with the new application builder configuration, CommonJS allow 
list, and service worker definition in angular.json:18-92.

Replaced the removed @marco-eckstein/angular-lib-common with an internal external‑link helper: new options/ 
directive/module live at src/app/shared/external-href/external-href-options.ts:1-47, external-href.directive.ts:1-98, 
external-href.module.ts:1-22, and AppModule now wires it up via provideHttpClient at src/app/app.module.ts:54-104.

Modernised tooling by dropping TSLint, introducing project-wide ESLint config (eslint.config.js:1-52), 
updating Karma coverage setup (karma.conf.js:1-37), and aligning TypeScript targets & 
shared type aliases (tsconfig.json:3- 33, src/tsconfig.app.json:1-15, src/tsconfig.spec.json:1-19, src/types.d.ts:1-2); 
.browserslistrc:1-14 now reflects supported evergreen browsers.

Runtime fixes for stricter compilation: switched Moment to default imports (src/app/location.service.ts:4, src/app/ 
model/location.ts:2), added HAMMER tweaks and optional markers (src/app/hammer-provider.ts:1-25, src/app/pages/main/ 
google-map/google-map.component.ts:50-90), and cleaned up legacy directives and globals (src/app/pages/main/info-box/ 
info-box.component.ts:19-22, src/app/app.component.ts:7-60, src/main.ts:1-28).

Heads-up: @kolkov/ngx-gallery still carries outdated peer requirements; it installs via legacy peer deps but should 
be exercised carefully in the upgraded app. If further hardening is needed, consider migrating to a maintained gallery 
alternative.

