import {Directive, Component, ElementRef} from 'angular2/core';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {NgIf, NgModel} from 'angular2/common';

import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Inject} from "angular2/core";

import {AppSettingsComponent} from './appSettingsComponent';
import {FirebaseService} from './services/firebaseService'

declare var Materialize: any;
declare var $ : any;

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'voting-home', // <voting-home></voting-home>
    directives: [ ROUTER_DIRECTIVES, AppSettingsComponent ],
    // Every Angular template is first compiled by the browser before Angular runs it's compiler
    template: `
    <div class="container">
        <div>
          <br/>
          <em *ngIf="groupSecret">Link for Sharing: {{linkRoot}}/?groupId={{groupId}}&groupSecret={{groupSecret}}</em>
          <br/><br/>
          <div>{{introText}}</div>

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

        <table class="bordered">
            <thead>
              <tr>
                  <th data-field="id">Place</th>
                  <th data-field="name">Description</th>
                  <th data-field="price">My Rating</th>
              </tr>
            </thead>

            <tbody>
              <tr *ngFor="#suggestion of groupChoices">
                <td>{{suggestion.title}}</td>
                <td>{{suggestion.description}}</td>
                <td>
                  <i [style.color]="getRatingColor(suggestion,1)"
                  class="material-icons dp48"
                  (click)="clickStar(suggestion,1)"
                  (mouseleave)="mouseLeaveStar(suggestion,1)"
                  (mouseenter)="mouseEnterStar(suggestion,1)">
                    star
                  </i>

                  <i [style.color]="getRatingColor(suggestion,2)"
                  class="material-icons dp48"
                  (click)="clickStar(suggestion,2)"
                  (mouseleave)="mouseLeaveStar(suggestion,2)"
                  (mouseenter)="mouseEnterStar(suggestion,2)">
                    star
                  </i>

                  <i [style.color]="getRatingColor(suggestion,3)"
                  class="material-icons dp48"
                  (click)="clickStar(suggestion,3)"
                  (mouseleave)="mouseLeaveStar(suggestion,3)"
                  (mouseenter)="mouseEnterStar(suggestion,3)">
                    star
                  </i>

                  <i [style.color]="getRatingColor(suggestion,4)"
                  class="material-icons dp48"
                  (click)="clickStar(suggestion,4)"
                  (mouseleave)="mouseLeaveStar(suggestion,4)"
                  (mouseenter)="mouseEnterStar(suggestion,4)">
                    star
                   </i>
                </td>
              </tr>
            </tbody>
          </table>

      <!-- Modal Structure -->
      <div id="mySuggestionTitleChangeConfirmation" class="modal">
        <div class="modal-content">
          <h4>Are you sure?</h4>
          <p>Changing the title of your suggestion will clear all votes for it - yours and anyone else who has voted for it. Are you sure you want to go ahead?</p>
        </div>
        <div class="modal-footer">
            <a (click)="agreeToPendingSuggestionUpdate()"  class="modal-action modal-close waves-effect waves-green btn-flat ">Change my suggestion and clear the votes.</a>
            <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat ">Cancel</a>

          </div>
      </div>
  </div>
  `
})
export class VotingHomeComponent {
    firebaseRef: Firebase;
    userRef: Firebase;
    mySuggestionRef: Firebase;
    authData: any;
    hasSuggestion: boolean;
    mySuggestionTitle: String = "";
    mySuggestionDescription: String = "";
    savedMySuggestionTitle: String = "";
    savedMySuggestionDescription: String = "";
    groupChoicesRef: Firebase;
    groupChoices =  [];
    introText: String = "Loading intro text...";
    groupId : String;
    groupSecret: String;
    linkRoot : String = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
    constructor(firebaseService : FirebaseService) {
        this.firebaseRef = firebaseService.getFirebaseRef()
        this.firebaseRef.onAuth((user) => {
            if (user) {
                this.authData = user;

                //Setup user tree.
                this.userRef = this.firebaseRef.child("users/" + user.uid + "/");

                this.userRef.on("value",function(userSnapshot) {

                    //TODO: Type User.
                    let user = userSnapshot.val();
                    if (user != null) {
                        this.groupId = user.group;

                        //If this is my group, I'm the admin, and I'll get the secret for the sharing link
                        if (user.group == this.authData.uid){
                            let secretRef = firebaseService.getFirebaseRef().child('groups/' + this.groupId + '/savedSecretMembersStrings');
                            secretRef.on("value",function(snapshot){
                                this.groupSecret = snapshot.val();
                            }.bind(this),function(errorObject){
                                console.log('Error reading group secret ' + errorObject);
                            })
                        }

                        //Setup Group Suggestions Ref
                        this.groupChoicesRef = firebaseService.getGroupChoicesRef(this.groupId);


                        this.groupChoicesRef.on("value", this.onGroupChoicesChanged.bind(this), function (errorObject) {
                            console.log("The read failed: " + errorObject.code);
                        });

                        firebaseService.getIntroTextRef(this.groupId).on("value", this.onIntroTextChanged.bind(this), function (errorObject) {
                            console.log("Couldn't read intro text: " + errorObject.code);
                        })

                        //Setup choice ref.
                        this.mySuggestionRef = this.firebaseRef.child('groups/'+this.groupId+'/choices/' + this.authData.uid);

                        this.mySuggestionRef.on("value",this.onMySuggestionChanged.bind(this), function (errorObject) {
                            console.log("The read failed: " + errorObject.code);
                        });
                    }
                }.bind(this));


            }
        });
    }

    mouseEnterStar(suggestion,numStars){
        suggestion.hoverLevel = numStars;
    }

    mouseLeaveStar(suggestion){
        suggestion.hoverLevel = 0;
    }

    clickStar(suggestion,numStars){
        suggestion.myRating = numStars;

        var ratingRef = this.groupChoicesRef.child(suggestion.key + "/rating/" + this.authData.uid);

        ratingRef.set(numStars);


    }

    getRatingColor(suggestion,starNumber){
        if (suggestion.hoverLevel > 0 ){
            if (suggestion.hoverLevel >= starNumber) {
                return '#EFB200';
            }
        }
        else{
            if (suggestion.myRating >= starNumber){
                return '#EFB200';
            }
        }


        return '#f5f5f5';
    }

    agreeToPendingSuggestionUpdate(){
        if (this.mySuggestionDescription){
            this.mySuggestionRef.set({title: this.mySuggestionTitle, description: this.mySuggestionDescription});
        }
        else{
            this.mySuggestionRef.set({title: this.mySuggestionTitle, description: ""});
        }

        Materialize.toast('Your suggestion has been saved.', 4000) // 4000 is the duration of the toast
    }

    setMySuggestion(suggestionTitle,suggestionDescription){
        if (this.mySuggestionRef && suggestionTitle ){
            //If the title is changed, we use 'set' which wipes all out descendants (the choices).
            if (suggestionTitle != this.savedMySuggestionTitle){
                if (this.savedMySuggestionTitle != ""){
                    $('#mySuggestionTitleChangeConfirmation').openModal();
                }
                else{
                    this.agreeToPendingSuggestionUpdate();
                }
            }
            else {
                //If the title hasn't changed, we use 'update' instead which will not wipe out the votes.
                if (suggestionDescription != this.savedMySuggestionDescription){
                    this.mySuggestionRef.update({description: suggestionDescription});
                    Materialize.toast('Description updated.', 4000) // 4000 is the duration of the toast
                }
                else{
                    Materialize.toast('No changes detected.', 4000) // 4000 is the duration of the toast
                }

            }

        }

    }

    onIntroTextChanged(snapshot){
        this.introText = snapshot.val();
    }


    onMySuggestionChanged(snapshot){
        var myFirebaseSuggestion = snapshot.val();
        if (myFirebaseSuggestion === undefined || myFirebaseSuggestion === null ||
            myFirebaseSuggestion.title === undefined || myFirebaseSuggestion.title === null ||
            myFirebaseSuggestion.title === ''){
            this.hasSuggestion = false;
        } else{
            this.hasSuggestion = true;
            this.mySuggestionTitle = myFirebaseSuggestion.title;
            this.mySuggestionDescription = myFirebaseSuggestion.description;

            this.savedMySuggestionTitle = myFirebaseSuggestion.title;
            this.savedMySuggestionDescription = myFirebaseSuggestion.description;

        }
    }

    onGroupChoicesChanged(snapshot){
        // This is going to come back as an associative array of choices vs user ID.
        // However, angular 2 does not support iterating over an associative array, so
        // we must first sort this into an array and then set it to this.groupChoices
        // which is the variable that the template is using to render the choices.

        function keys(obj)
        {
            var keys = [];

            for(var key in obj)
            {
                if(obj.hasOwnProperty(key))
                {
                    keys.push(key);
                }
            }

            return keys;
        }

        //By sorting the keys first, we make the order reliable for rendering.
        var groupChoicesKeysArray = keys(snapshot.val()).sort();


        var groupChoicesArray = [];

        for (var choiceKey of groupChoicesKeysArray){
            var choice = snapshot.val()[choiceKey];
            choice.key = choiceKey; // Save the key into the object for back referencing it later.

            //Simply retrieving my rating for the star template.
            if (choice.rating && choice.rating[this.authData.uid]){
                choice.myRating = choice.rating[this.authData.uid];
            }
            groupChoicesArray.push(choice);
        }

        this.groupChoices = groupChoicesArray;
    }
}

