/**
 * Created by @OverclockedTim on 12/26/15.
 */

import {Component} from 'angular2/core';
import {FirebaseService} from "./services/firebaseService";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Router} from "angular2/router";

@Component({
    selector: 'vote-finished-home',
    directives: [ROUTER_DIRECTIVES],
    template: `
  <div class="container">
    <h1>Voting complete, decision reached.</h1>
    <h2>WINNER:
      <span *ngIf="winningChoice">{{winningChoice.title}} ({{winningChoice.averageRating}})</span>
    </h2>
    <br/>
    <h3>Runners Up: </h3>
    <div *ngFor="#runnerUp of groupChoices">
    <p>{{runnerUp.title}} ({{runnerUp.averageRating}})</p>
    </div>
  </div>
    `
})
export class VoteFinishedComponent {
    groupChoices : any;
    winningChoice : any;
    constructor(_router:Router, firebaseService : FirebaseService) {
        firebaseService.getFirebaseRef().onAuth((user) => {
            if (user) {
                let authData = user;

                //Setup user tree.
                let userRef = firebaseService.getFirebaseRef().child("users/" + user.uid + "/");

                userRef.on("value",function(userSnapshot){
                    //TODO: Type User.
                    let user = userSnapshot.val();
                    if (user == null){
                        //Redirect to home. This user needs a group before they can do settings.
                        _router.navigate(['Home']);
                    }
                    else {
                        this.groupId = user.group;
                        firebaseService.getGroupChoicesRef(this.groupId).on("value",this.onGroupChoicesChanged.bind(this), function (errorObject) {
                            console.log("The read failed: " + errorObject.code);
                        });
                    }

                }.bind(this),function(errorObject){
                    console.log('Failed to get user object: ' + errorObject.code);
                })


            }
        });


    }

    onGroupChoicesChanged = function(snapshot){

        var groupChoicesArray : Array<any> = [];

        for (var key in snapshot.val()){
            var groupChoice = snapshot.val()[key];
            var runningTotal = 0;
            var runningCount = 0;
            for(var ratingKey in groupChoice.rating){
                runningCount++;
                runningTotal = runningTotal + groupChoice.rating[ratingKey];
            }

            //The + is to coerce the results of toFixed back into a number type.
            groupChoice.averageRating = +((runningTotal/runningCount).toFixed(2));

            groupChoicesArray.push(groupChoice);
        }

        function groupChoiceCompare(a,b) {
            let difference = b.averageRating - a.averageRating;

            if (difference != 0){
                return difference;
            }
            return b.title.localeCompare(a.title);

        }

        groupChoicesArray = groupChoicesArray.sort(groupChoiceCompare);

        this.winningChoice = groupChoicesArray[0];

        this.groupChoices = groupChoicesArray.slice(1);
    }

}