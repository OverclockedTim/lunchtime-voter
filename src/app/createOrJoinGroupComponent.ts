/**
 * Created by @OverclockedTim on 12/26/15.
 */

import {Component} from 'angular2/core';
import {FirebaseService} from "./services/firebaseService";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RouteParams} from "angular2/router";

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
        let myGroupRef : Firebase = this.firebaseRef.child("groups/" + this.authData.uid + "/");

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
        console.log('Attempting to save new group: ' + JSON.stringify(newGroup));
        myGroupRef.set(newGroup);

        //Setup user tree.
        let userRef : Firebase = this.firebaseRef.child("users/" + this.authData.uid + "/");

        //this.userRef.set({provider: user.provider, group: "default"});

        console.log('TODO: write membership info into user branch');
    }

    joinGroup(groupId, groupSecret){
        console.log('TODO: Join a group: ' + groupId + " (" + groupSecret + ")");


        let myGroupMembersEntryRef : Firebase = this.firebaseRef.child("groups/" + groupId + "/members");

        let membersEntryObject = {};
        membersEntryObject[this.authData.uid] = groupSecret;

        console.log('Members Entry Object: ' + JSON.stringify(membersEntryObject));

        myGroupMembersEntryRef.set(membersEntryObject);
    }

}