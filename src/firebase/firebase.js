import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, remove, update, onValue, off, push, onChildRemoved, onChildChanged, onChildAdded } from "firebase/database";

// Your web app's Firebase configuration
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};


// Initialize Firebase
initializeApp(config);

const db = getDatabase()
export const auth = getAuth()
export const googleAuthProvider = new GoogleAuthProvider()

export { db as default }

// onChildRemoved(ref(db), (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// })

// onChildChanged(ref(db), (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// })

// onChildAdded(ref(db), (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// })

// onValue(ref(db), (snapshot) => {
//     const expenses = []
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     })
//     console.log(expenses);
// })


// push(ref(db), {
//     description: 'Rent',
//     note: 'dfgdfg',
//     amount: 4543,
//     createdAt: 543422454
// })


// push(ref(db), {
//     title: 'hello world', 
//     body: 'im stuck in a job i dont care for'
// })

// update(ref(db, '-NA1-LT2p6v6gvMoJbTA'), {
//     title: 'i am become death.'
// })

// onValue(ref(db), (snapshot) => {
//     const val = snapshot.val()
//     console.log(val);
// }, {
//     onlyOnce: false
// })

// setTimeout(() => {
//     set(ref(db, 'age'), 30)
// }, 3500);

// setTimeout(() => {
//     off(ref(db))
// }, 7000);

// setTimeout(() => {
//     set(ref(db, 'age'), 32)
// }, 10500);



// onValue(ref(db), (snapshot) => {
//     const name = snapshot.val().name
//     const title = snapshot.val().job.title
//     const company = snapshot.val().job.company

//     console.log(`${name} is a ${title} at ${company}.`);
// })

// setTimeout(() => {
//     set(ref(db, 'name'), 'Ahmed')
// }, 3500);


// set(ref(db), {
//     name: 'Abdallah',
//     age: 21,
//     stressLevel: 6,
//     job: {
//         title: 'Software Developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'cairo',
//         country: 'egypt'
//     },
//     isSingle: true
// }).then(() => {
//     console.log('Data is saved');
// }).catch((e) => {
//     console.log('this failed', e);
// })

// update(ref(db), {
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Smart Village'
// })

// // set(ref(db), 'this is my data')

// set(ref(db, 'age'), 27)

// set(ref(db, 'location/city'), 'helwan')

// set(ref(db, 'attributes'), {
//     height: '180cm',
//     weight: '65kg'
// }).then(() => {
//     console.log("data");
// }).catch((e) => {
//     console.log('Error', e);
// })

// remove(ref(db, 'isSingle')).then(() => {
//     console.log('data was removed');
// }).catch((e) => {
//     console.log('did not remove data', e);
// })