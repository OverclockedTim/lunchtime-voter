export class FirebaseService {
    private firebaseUrl: string;
    private firebaseRef: Firebase;
    constructor() {
        this.firebaseUrl = "https://lunchtimevoter.firebaseio.com/";
        this.firebaseRef = new Firebase(this.firebaseUrl);
    }

    public getFirebaseRef = function(){
        return this.firebaseRef;
    }

    public getIntroTextRef = function(groupId : String){
        return this.firebaseRef.child('groups/'+groupId+'/introText');
    }

    public getVoteFinishedRef = function(groupId : String){
        return this.firebaseRef.child('groups/'+groupId+'/isVoteFinished');
    }

    public getGroupChoicesRef = function(groupId : String){
        return this.firebaseRef.child('groups/'+groupId+'/choices/');
    }


}