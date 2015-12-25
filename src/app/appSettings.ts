import {ROUTER_DIRECTIVES} from "angular2/router";
/**
 * Created by @OverclockedTim on 12/24/15.
 */

declare var $: any

import {Component} from 'angular2/core';

@Component({
    selector: 'app-settings',
    directives: [ROUTER_DIRECTIVES],
    template: `
    <header>
    <nav class="top-nav">
    <div class="container">
      <div class="nav-wrapper">
      <div class="right" *ngIf="isLoggedIn">
        <app-settings style="margin-right: 20px"></app-settings>
        <a (click)="signOut()">Sign Out</a>
      </div>
      <a [routerLink]="['Home']">Lunchtime Voter</a></div>
    </div>
  </nav>
  </header>

  <main>
  <div class="container">

    <div>
      <br/>
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="" id="explanatoryText" type="text" class="validate" [(ngModel)]="explanatoryText" required>
              <label for="title">New explanatory text</label>
            </div>
           </div>
        </form>
        <div class="right-align">
          <a class="waves-effect waves-light btn" (click)="saveExplanatoryText(explanatoryText)">
            <i class="material-icons left">library_add</i>
            Save explanatory text
          </a>
        </div>

        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="" id="finishedInput" type="text" class="validate" [(ngModel)]="finishedInput" required>
              <label for="title">Type 'FINISHED' to be sure...</label>
            </div>
           </div>
        </form>
        <div class="right-align">
          <a class="waves-effect waves-light btn" (click)="setCurrentVoteFinished(explanatoryText)">
            <i class="material-icons left">library_add</i>
            Set current vote finished
          </a>
        </div>

        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="" id="deleteAllInput" type="text" class="validate" [(ngModel)]="deleteAllInput" required>
              <label for="title">Type 'DELETE ALL' to be sure...</label>
            </div>
           </div>
        </form>
        <div class="right-align">
          <a class="waves-effect waves-light btn" (click)="setCurrentVoteFinished(explanatoryText)">
            <i class="material-icons left">library_add</i>
            Clear everything and start anew
          </a>
        </div>

  </div>
</div>
</main>

<footer class="page-footer white-text">
<div class="container">
  LunchtimeVoter is an open source project, fork your own at <a class="white-text" style="text-decoration: underline" href="https://github.com/OverclockedTim/lunchtime-voter">Github</a>
</div>
</footer>
    `
})
export class AppSettingsComponent {
}