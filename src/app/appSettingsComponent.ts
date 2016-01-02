import {ROUTER_DIRECTIVES} from "angular2/router";
/**
 * Created by @OverclockedTim on 12/24/15.
 */

declare var Materialize: any;

import {Component} from 'angular2/core';
import {FirebaseService} from "./services/firebaseService";
import {Router} from "angular2/router";

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
              <input placeholder="" id="explanatoryText" type="text" class="validate" (keyup.enter)="saveExplanatoryText(explanatoryText)" [(ngModel)]="explanatoryText" required>
              <label for="title">New explanatory text</label>
            </div>
           </div>
        </form>
        <div class="right-align">
          <a class="waves-effect waves-light btn" (click)="saveExplanatoryText(explanatoryText)">
            <i class="material-icons left">info_outline</i>
            Save explanatory text
          </a>
        </div>

        <div *ngIf="!isVoteFinished">
            <form class="col s12">
              <div class="row">
                <div class="input-field col s12">
                  <input placeholder="" id="finishedInput" type="text" class="validate" (keyup.enter)="setCurrentVoteFinished(finishedInput)" [(ngModel)]="finishedInput" required>
                  <label for="title">Type 'FINISHED' to be sure...</label>
                </div>
               </div>
            </form>
            <div class="right-align">
              <a class="waves-effect waves-light btn" (click)="setCurrentVoteFinished(finishedInput)">
                <i class="material-icons left">done</i>
                Set current vote finished
              </a>
            </div>
        </div>

        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="" id="deleteAllInput" type="text" class="validate" (keyup.enter)="clearVote(deleteAllInput)" [(ngModel)]="deleteAllInput" required>
              <label for="title">Type 'DELETE ALL' to be sure...</label>
            </div>
           </div>
        </form>
        <div class="right-align">
          <a class="waves-effect waves-light btn" (click)="clearVote(deleteAllInput)">
            <i class="material-icons left">delete</i>
            Clear everything and start anew
          </a>
        </div>

        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="" id="leaveGroupInput" type="text" class="validate" (keyup.enter)="leaveGroup(leaveGroupInput)" [(ngModel)]="leaveGroupInput" required>
              <label for="title">Type 'GOODBYE!' to be sure...</label>
            </div>
           </div>
        </form>
        <div class="right-align">
          <a class="waves-effect waves-light btn" (click)="leaveGroup(leaveGroupInput)">
            <i class="material-icons left">call_split</i>
            Leave your group. You won't be able to come back without getting the secret again.
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
    firebaseRef : Firebase;
    introTextRef : Firebase;
    voteFinishedRef : Firebase;
    groupChoicesRef : Firebase;
    explanatoryText;
    isVoteFinished : Boolean = false;
    authData : any;
    groupId : any; //TODO: String?
    constructor(_router:Router, firebaseService : FirebaseService){
        this.firebaseRef = firebaseService.getFirebaseRef();
        this.firebaseRef.onAuth((user) => {
            if (user) {
                this.authData = user;

                //Setup user tree.
                let userRef = this.firebaseRef.child("users/" + user.uid + "/");

                userRef.on("value",function(userSnapshot){
                    //TODO: Type User.
                    let user = userSnapshot.val();
                    if (user == null){
                        //Redirect to home. This user needs a group before they can do settings.
                        _router.navigate(['Home']);
                    }
                    else {
                        this.groupId = user.group;
                        console.log('Logged into group: ' + user.group);
                        this.introTextRef = firebaseService.getIntroTextRef(user.group);
                        this.voteFinishedRef = firebaseService.getVoteFinishedRef(user.group);
                        this.groupChoicesRef = firebaseService.getGroupChoicesRef(user.group);

                        this.introTextRef.on("value",this.onIntroTextChanged.bind(this),function (errorObject){
                            console.log("Couldn't read intro text: " + errorObject.code)
                        });

                        this.voteFinishedRef.on("value",this.onVoteFinishedRefChanged.bind(this),function(errorObject){
                            console.log("Couldn't read vote finished text: " + errorObject.code);
                        });
                    }

                }.bind(this),function(errorObject){
                    console.log('Failed to get user object: ' + errorObject.code);
                })


            }
        });






    }

    saveExplanatoryText = function(newExplanatoryText){
        this.introTextRef.set(newExplanatoryText,function(error){
            if (error){
                Materialize.toast('Could not set explanatory text. Are you sure you are the administrator for this lunch group?');
            }
            else{
                Materialize.toast('New explanatory text has been saved.', 4000) // 4000 is the duration of the toast
            }

        });


    }

    onIntroTextChanged(snapshot){
        this.explanatoryText = snapshot.val();
    }

    onVoteFinishedRefChanged(snapshot){
        this.isVoteFinished = snapshot.val();

    }

    setCurrentVoteFinished(finishedText){
        if (finishedText === undefined || finishedText.toLowerCase() !== 'finished'){
            Materialize.toast('Please type "FINISHED" in the box so we know you are sure. This action is not reversible.', 4000) // 4000 is the duration of the toast
        } else {
            this.voteFinishedRef.set(true,function(error){
                if (error){
                    Materialize.toast('Error setting vote to finished. Are you sure you are the administrator for this lunch group?');
                }
                else{
                    Materialize.toast('Current vote has been set to finished.');
                }

            });

        }
    }

    clearVote(deleteAllText){
        if (deleteAllText === undefined || deleteAllText.toLowerCase() !== 'delete all'){
            Materialize.toast('Please type "DELETE ALL" in the box so we know you are sure. This action is not reversible.', 4000) // 4000 is the duration of the toast
        } else {
            this.groupChoicesRef.set({});
            this.voteFinishedRef.set(false,function(error){
                if (error){
                    Materialize.toast('Error clearing vote. Are you sure you are the administrator for this lunch group?');
                }
                else{
                    Materialize.toast('The vote has been cleared.');
                }

            });

        }
    }

    leaveGroup(leaveGroupText){
        if (leaveGroupText === undefined || leaveGroupText.toLowerCase() !== 'goodbye!'){
            Materialize.toast('Please type "GOODBYE!" in the box so we know you are sure. This action is not reversible.', 4000) // 4000 is the duration of the toast
        } else {
            var updatedUserData = {};
            updatedUserData["groups/" + this.groupId + "/members/" + this.authData.uid] = null;
            updatedUserData["users/" + this.authData.uid + "/group"] = null;

            this.firebaseRef.update(updatedUserData,function(error){
                if (error){
                    //TODO: Rework this to use Angular's new form error functionality.
                    Materialize.toast('Invalid group ID or Secret. Please try again.', 4000) // 4000 is the duration of the toast
                }

            });
        }
    }
}