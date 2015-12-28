

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

    public getIntroTextRef = function(){
        return this.firebaseRef.child('groups/default/introText');
    }

    public getVoteFinishedRef = function(){
        return this.firebaseRef.child('groups/default/isVoteFinished');
    }

    public getGroupChoicesRef = function(){
        return this.firebaseRef.child("groups/default/choices/");
    }


}