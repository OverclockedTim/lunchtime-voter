import {Directive, Component, ElementRef} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {NgIf, NgModel} from 'angular2/common';

import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Inject} from "angular2/core";

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
  directives: [ ROUTER_DIRECTIVES ],
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
  <nav class="top-nav">
    <div class="container">
      <div class="nav-wrapper"><div class="right" *ngIf="isLoggedIn"><a (click)="signOut()">Sign Out</a></div>Lunchtime Voter</div>
    </div>
  </nav>

  <div class="container" *ngIf="!isLoggedIn">
    <br/>
    <div *ngIf="!isLoggedIn" class="center row">
      <a class="waves-effect waves-light btn" (click)="authenticateWithGoogle()" >Sign In With Google</a>
    </div>
  </div>

  <div class="container" *ngIf="isLoggedIn">

    <div>
      <br/>
      <div>Add your suggestion or vote on other people's suggestions until 11:30.  At 11:30, voting stops and a spot is chosen!</div>

      <h4>Add a Lunch Option</h4>
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input placeholder="" id="title" type="text" class="validate" [(ngModel)]="mySuggestionTitle" required>
            <label for="title">Title</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="" id="description" type="text" class="validate" [(ngModel)]="mySuggestionDescription">
            <label for="description">Description / Selling It</label>
          </div>
        </div>
      </form>

      <div class="right-align">
        <a class="waves-effect waves-light btn" (click)="setMySuggestion(mySuggestionTitle,mySuggestionDescription)">
          <i class="material-icons left">library_add</i>
          <span *ngIf="hasSuggestion">Update</span>
          <span *ngIf="!hasSuggestion">Add</span>
        </a>
      </div>
    </div>

    <h4>Rate other people's suggestions</h4>

    <li *ngFor="#suggestion of groupChoices">
      <strong>{{suggestion.title}}</strong>: {{suggestion.description}}
    </li>

    <table class="bordered">
        <thead>
          <tr>
              <th data-field="id">Place</th>
              <th data-field="name">Description</th>
              <th data-field="price">My Rating</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Thai Siam</td>
            <td>The best Thai Food In the World</td>
            <td>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
            </td>
          </tr>
          <tr>
            <td>Not Thai Siam</td>
            <td>Bad Thai Food</td>
            <td>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
            </td>
          </tr>
        </tbody>
      </table>
  </div>

  <footer class="page-footer white-text">
    <div class="container">
      LunchtimeVoter is an open source project, fork your own at <a class="white-text" style="text-decoration: underline" href="https://github.com/OverclockedTim/lunchtime-voter">Github</a>
    </div>
  </footer>
  `
})
export class App {
  firebaseUrl: string;
  firebaseRef: Firebase;
  userRef: Firebase;
  mySuggestionRef: Firebase;
  isLoggedIn: boolean;
  authData: any;
  hasSuggestion: boolean;
  mySuggestionTitle: String = "";
  mySuggestionDescription: String = "";
  groupChoicesRef: Firebase;
  groupChoices =  new Array<String >();
  constructor() {
    this.firebaseUrl = "https://lunchtimevoter.firebaseio.com/";
    this.firebaseRef = new Firebase(this.firebaseUrl);
    this.firebaseRef.onAuth((user) => {
      if (user) {
        this.authData = user;
        this.isLoggedIn = true;
        console.log("user logged in.");

        //Setup user tree.
        this.userRef = new Firebase(this.firebaseUrl + "users/" + user.uid + "/");
        this.userRef.set({provider: user.provider, group: "default"});

        //Setup choice ref.
        this.mySuggestionRef = new Firebase(this.firebaseUrl + "groups/default/choices/" + user.uid);

        this.mySuggestionRef.on("value",this.onMySuggestionChanged.bind(this), function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });

        //Setup Group Suggestions Ref
        this.groupChoicesRef = new Firebase(this.firebaseUrl + "groups/default/choices/");
        this.groupChoicesRef.on("value",this.onGroupChoicesChanged.bind(this), function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });

      }
    });
  }

  setMySuggestion(suggestionTitle,suggestionDescription){
    if (this.mySuggestionRef && suggestionTitle ){
      if (suggestionDescription){
        this.mySuggestionRef.set({title: suggestionTitle, description: suggestionDescription});
      }
      else{
        this.mySuggestionRef.set({title: suggestionTitle, description: ""});
      }
    }
    Materialize.toast('Your suggestion has been saved.', 4000) // 4000 is the duration of the toast
  }

  onMySuggestionChanged(snapshot){
    var myFirebaseSuggestion = snapshot.val();
    if (myFirebaseSuggestion === undefined || myFirebaseSuggestion.title === undefined || myFirebaseSuggestion.title === ''){
      this.hasSuggestion = false;
    } else{
      console.log('there');
      this.hasSuggestion = true;
      console.log("Changing internal vars to: " + JSON.stringify(myFirebaseSuggestion));
      this.mySuggestionTitle = myFirebaseSuggestion.title;
      this.mySuggestionDescription = myFirebaseSuggestion.description;
    }
  }

  onGroupChoicesChanged(snapshot){
    console.log('TODO: Do something about rendering group choices: ' + JSON.stringify(snapshot.val()));
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

