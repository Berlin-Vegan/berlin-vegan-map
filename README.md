# berlin-vegan-map

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](
    https://conventionalcommits.org
)

## Live Demo

<https://www.berlin-vegan.de/map/>

## Requirements

* Install a recent version of Node.js
* Change directory to `angular/`
* For deployment to the staging/production server from Windows, you need to install a Bash
  (e.g. [Git Bash](https://gitforwindows.org/)) and [rsync](https://serverfault.com/a/872557/124321).

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

In case your default browser does not open the app automatically, navigate to <http://localhost:4200/>.

Note that for this command, IE11 is not supported. (same for other legacy browsers)

## Build

```bash
npm run build
```

Alternatively (including lint):

```bash
npm run verify
```

The build artifacts will be stored in the `dist/` directory.

In order to manually test the build, run:

```bash
npm run serve-build
```

This also works for IE11.

In case your default browser does not open the app automatically, navigate to <http://localhost:8000/>.

## Build and Deploy

### Staging

```bash
sh deploy.sh
```

### Production

```bash
sh deploy.sh production
```

## Usage with other cities

If you want to use the app for other cities, you have to change some files, because it is not completely
configurable yet:

* `src/index.html`
* `src/manifest.json`
* `src/assets/*.json` (optional - useful for development)
* `src/assets/images/*`
* `src/environments/environment-default.ts`
* `src/environments/environment.prod.ts`
* `src/styles/_variables.scss` (optional)

## License

Copyright (C) 2015-2020  Berlin-Vegan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

## Contact

<https://www.berlin-vegan.de/>

karte@berlin-vegan.de

---

<a href="https://www.browserstack.com/">
  <img src="browserstack-logo-01.svg" alt="BrowserStack" width="300px;"/>
</a>
