import React from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyBw1Er7O-BNjdktz-CSqWQEkbtpXNvLYWw",
  authDomain: "firechat-3237c.firebaseapp.com",
  databaseURL: "https://firechat-3237c.firebaseio.com",
  projectId: "firechat-3237c",
  storageBucket: "firechat-3237c.appspot.com",
  messagingSenderId: "895604026390",
  appId: "1:895604026390:web:379f2ffe3706f652de9937"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section className="App-main">
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <div>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/> )}
      </div>
    </div>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  return <p>{text}</p>
}


export default App;
