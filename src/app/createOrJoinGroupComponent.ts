/**
 * Created by @OverclockedTim on 12/26/15.
 */

import {Component} from 'angular2/core';
import {FirebaseService} from "./services/firebaseService";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteParams} from "angular2/router";

declare var Materialize: any;

@Component({
    selector: 'create-or-join-group',
    directives: [ROUTER_DIRECTIVES],
    template: `
  <div class="container">
    <p>Important Note: It is only possible to be a member of one group at a time. If you create a new group, you will leave any group your are a part of.
    Also, as creator of a group, if you join another group, you will delete the group that you left.</p>
    <h3>Create Group</h3>

    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="" id="newGroupName" type="text" class="validate" (keyup.enter)="createGroup(newGroupName)" [(ngModel)]="newGroupName" required>
          <label for="title">New group name</label>
        </div>
       </div>
    </form>
    <div class="right-align">
      <a class="waves-effect waves-light btn" (click)="createGroup(newGroupName)">
        <i class="material-icons left">library_add</i>
        Create Group
      </a>
    </div>

    <h3>Join Group</h3>

    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="" id="groupId" type="text" class="validate" (keyup.enter)="joinGroup(groupId, groupSecret)" [(ngModel)]="groupId" required>
          <label for="title">Group ID</label>
        </div>
       </div>
       <div class="row">
        <div class="input-field col s12">
          <input placeholder="" id="groupSecret" type="text" class="validate" (keyup.enter)="joinGroup(groupId, groupSecret)" [(ngModel)]="groupSecret" required>
          <label for="title">Group Secret</label>
        </div>
       </div>
    </form>
    <div class="right-align">
      <a class="waves-effect waves-light btn" (click)="joinGroup(groupId, groupSecret)">
        <i class="material-icons left">group_work</i>
        Join Group
      </a>
    </div>
  </div>
    `
})
export class CreateOrJoinGroupComponent {
    firebaseRef: Firebase;
    isLoggedIn: boolean;
    authData: any;
    routeParams : RouteParams;
    groupId : any;
    groupSecret : any;
    constructor(firebaseService : FirebaseService, routeParams: RouteParams) {
        this.groupId = routeParams.get('groupId');
        this.groupSecret = routeParams.get('groupSecret');

        this.routeParams = routeParams;
        this.firebaseRef = firebaseService.getFirebaseRef()
        this.firebaseRef.onAuth((user) => {
            if (user) {
                this.authData = user;
                this.isLoggedIn = true;
                console.log("user logged in.");
            }
        });
    }

    makeSecret()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 20; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    createGroup(newGroupName){
        //TODO: If we're deleting an old group, we need to remove all references via the users/group branch.
        let newSecret = this.makeSecret();

        let myMembersEntry : any = {};

        myMembersEntry[this.authData.uid] = this.makeSecret();

        let newGroup = {
            "savedSecretMembersStrings" : newSecret,
            "isVoteFinished" : false,
            "groupName" : newGroupName,
            "introText" : "Enter your votes or suggestions for where we want to go to lunch!",
            "members" : myMembersEntry,

        };

        var updatedUserData = {};
        updatedUserData["groups/" + this.authData.uid] = newGroup;
        updatedUserData["users/" + this.authData.uid + "/group"] = this.authData.uid;

        this.firebaseRef.update(updatedUserData,function(error){
            if (error){
                Materialize.toast('Error creating group. Please try again later.', 4000) // 4000 is the duration of the toast
            }

        });
    }

    joinGroup(groupId, groupSecret){
        var updatedUserData = {};
        updatedUserData["groups/" + groupId + "/members/" + this.authData.uid] = groupSecret;
        updatedUserData["users/" + this.authData.uid + "/group"] = groupId;

        this.firebaseRef.update(updatedUserData,function(error){
            if (error){
                //TODO: Rework this to use Angular's new form error functionality.
                Materialize.toast('Invalid group ID or Secret. Please try again.', 4000) // 4000 is the duration of the toast
            }

        });
    }

}