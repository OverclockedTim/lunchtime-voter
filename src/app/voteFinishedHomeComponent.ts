/**
 * Created by @OverclockedTim on 12/26/15.
 */

import {Component} from 'angular2/core';
import {FirebaseService} from "./services/firebaseService";
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
    selector: 'vote-finished-home',
    directives: [ROUTER_DIRECTIVES],
    template: `
  <div class="container">
    <h1>Rock a by baby, the vote is finished!</h1>
  </div>
    `
})
export class VoteFinishedComponent {
    constructor(){
        console.log('VoteFinishedComponent was here.');
    }
}