/**
 * Created by @OverclockedTim on 12/26/15.
 */

import {Component} from 'angular2/core';
import {FirebaseService} from "./services/firebaseService";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'create-or-join-group',
    directives: [ROUTER_DIRECTIVES],
    template: `
  <div class="container">
    <h1>Create or Join A Group</h1>
  </div>
    `
})
export class CreateOrJoinGroupComponent {
    constructor(firebaseService : FirebaseService) {
    }

}