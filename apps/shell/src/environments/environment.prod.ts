export let environment = {
    production: true,
    firebase: { 
        apiKey: "AIzaSyBhhHpDC4WYqu9iDr9toWoLvtp93GJ3qbk",
        authDomain: "workout-tracker-44de7.firebaseapp.com",
        projectId: "workout-tracker-44de7",
        storageBucket: "workout-tracker-44de7.appspot.com",
        messagingSenderId: "561887133867",
        appId: "1:561887133867:web:eb57a678346b432c84b7ee",
        // measurementId: "G-PH5WRD86VQ"
    }
}

export const assignEnv = (env: any) => environment = env;