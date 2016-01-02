import {Directive, Component, ElementRef} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {NgIf, NgModel} from 'angular2/common';

import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Inject} from "angular2/core";

import {AppSettingsComponent} from './appSettingsComponent';
import {VoteFinishedComponent} from './voteFinishedHomeComponent';
import {FirebaseService} from './services/firebaseService';
import {VotingHomeComponent} from './votingHomeComponent';
import {CreateOrJoinGroupComponent} from "./createOrJoinGroupComponent";

declare var Materialize: any;


/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ROUTER_DIRECTIVES, AppSettingsComponent, VoteFinishedComponent, VotingHomeComponent, CreateOrJoinGroupComponent ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [`
    .title {
      font-family: Arial, Helvetica, sans-serif;
    }
    main {
      padding: 1em;
    }
  `],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  <header>
    <nav class="top-nav">
      <div class="container">
        <div class="nav-wrapper">
        <div class="right" *ngIf="isLoggedIn">

          <a [routerLink]="['Settings']" style="margin-right: 20px">Settings</a>
          <a (click)="signOut()">Sign Out</a>
        </div>
        Lunchtime Voter</div>
      </div>
    </nav>
  </header>

  <div class="container" *ngIf="!isLoggedIn">
    <br/>
    <div *ngIf="!isLoggedIn" class="center row">
      <a class="waves-effect waves-light btn" (click)="authenticateWithGoogle()" >Sign In With Google</a>
    </div>
  </div>

  <create-or-join-group *ngIf="isLoggedIn && !hasGroup"></create-or-join-group>
  <voting-home *ngIf="isLoggedIn && hasGroup && !isVoteFinished"></voting-home>
  <vote-finished-home *ngIf="isLoggedIn && hasGroup && isVoteFinished"></vote-finished-home>



  <footer class="page-footer white-text">
    <div class="container">
      LunchtimeVoter is an open source project, fork your own at <a class="white-text" style="text-decoration: underline" href="https://github.com/OverclockedTim/lunchtime-voter">Github</a>
    </div>
  </footer>
  `
})
export class HomeComponent {
  firebaseService : FirebaseService;
  firebaseRef: Firebase;
  userRef: Firebase;
  isLoggedIn: boolean;
  hasGroup: boolean;
  authData: any;
  isVoteFinished : Boolean = false;
  constructor(firebaseService : FirebaseService) {
    this.firebaseService = firebaseService;
    this.firebaseRef = firebaseService.getFirebaseRef()
    this.firebaseRef.onAuth((user) => {
      if (user) {
        this.authData = user;
        this.isLoggedIn = true;
        console.log("user logged in.");

        //Setup user tree.
        this.userRef = this.firebaseRef.child("users/" + user.uid + "/");

        this.userRef.on("value",this.onUserChanged.bind(this),function(errorObject){
          console.log('Failed to get user object: ' + errorObject.code);
        })

      }
    });
  }
  onVoteFinishedChanged(snapshot){
    this.isVoteFinished = snapshot.val();
  }

  onUserChanged(snapshot){
    if (snapshot.val() !== undefined && snapshot.val() !== null && snapshot.val().group !== undefined && snapshot.val().group !== null){
      this.hasGroup = true;

      this.firebaseService.getVoteFinishedRef(snapshot.val().group).on("value",this.onVoteFinishedChanged.bind(this),function (errorObject){
        console.log("Could get vote finished status: " + errorObject.code);
      })

    }
  }

  authenticateWithGoogle(){
    this.firebaseRef.authWithOAuthPopup("google", (error) => {
      if(error){
        console.log(error); // todo improve error handling
      }
    });
  }

  signOut(){
    console.log('Signing out...');
    this.firebaseRef.unauth();
    this.isLoggedIn = false;
  }



}

