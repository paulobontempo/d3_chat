import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messages: FirebaseListObservable<any[]>;
  user: any;
  message: "";

  constructor(public navCtrl: NavController, private afDatabase: AngularFireDatabase, private afAuth: AngularFireAuth) {
    //this.afAuth.authState.subscribe(usr => {
    	this.user = 'Test User';
    	
    	this.messages = this.afDatabase.list('/messages', {
    		query: {
    			limitToLast: 10,
    		}
    	})
    //});

  }

  sendMessage(msg){
  	console.log(msg);
  	this.messages.push({ message: msg, user: 'Test User' })
  	this.message = "";
  }

  login(){
  	this.afAuth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider())
  	.then(res => this.user = res.user)
  }

  logoff(){
  	this.afAuth.auth.signOut();
  }

}
