const firebaseAPI = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
};

const possiblePantryAPI = {
    baseURL: process.env.REACT_APP_BASE_URL 
}

const EdamamAppID = process.env.REACT_APP_EdamamAppID;

const EdamamAPIKey = process.env.REACT_APP_EdamamAPIKey;

export { firebaseAPI, possiblePantryAPI, EdamamAppID, EdamamAPIKey }