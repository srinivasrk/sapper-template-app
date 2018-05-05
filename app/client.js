import { init } from 'sapper/runtime.js';
import { routes } from './manifest/client.js';

import jquery from 'jquery';

// export for others scripts to use

window.$ = jquery;

window.jQuery = jquery;

import 'bootstrap';

import "bootstrap/scss/bootstrap.scss";

// `routes` is an array of route objects injected by Sapper
init(document.querySelector('#sapper'), routes);

if (module.hot) module.hot.accept();
