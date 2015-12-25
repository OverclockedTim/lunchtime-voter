/// <reference path="../typings/_custom.d.ts" />

/*
 * Providers provided by Angular
 */import {Component} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS,RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

// include for development builds
import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
// include for production builds
// import {enableProdMode} from 'angular2/core';

/*
 * These are our root level components for routing.
 */
import {App} from './app';
import {AppSettingsComponent} from './appSettings'
import {FirebaseService} from "./services/firebaseService";


/*
 People do this different ways, but I like to make my shell empty and add other necessities such as
 navbars as a reusable top bar as a component. That way if you ever have to crate a screen without a
 top bar, it's dirt simple instead of forcing you to rewrite your whole app or hook deep into the routing
 system.
 */
@Component({
  selector: 'shell',
  template: `
    <router-outlet></router-outlet>
    `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', component: App, name: 'Home' },
  { path: '/settings', component: AppSettingsComponent, name: 'Settings'}
])
export class ShellComponent {
}

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
bootstrap(ShellComponent, [
  // These are dependencies of our App
  FORM_PROVIDERS,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  ELEMENT_PROBE_PROVIDERS,
  FirebaseService
]);
