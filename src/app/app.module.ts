import { module } from 'angular';

import AppComponent from './app.component';
import configure from './app.config';
import Core from './core/core.module';
import Shared from './shared/shared.module';


import 'leaflet';
import 'leaflet/dist/leaflet.css';

//import '../../node_modules/leaflet/dist/leaflet.js';
//import '../../node_modules/leaflet/dist/leaflet-src.js';
import '../../node_modules/angular-simple-logger/dist/';
import '../../node_modules/ui-leaflet/dist/ui-leaflet.min.js';
import '../../node_modules/angular-leaflet-directive/dist/angular-leaflet-directive.min.js';


const root = module('app', [
    'ui-leaflet',
    Core,
    Shared,
]).component('appComponent', AppComponent)
    .config(configure)
    .run(['$state', function ($state) {
        $state.go('auth');
    }])
    .name;

export default root;