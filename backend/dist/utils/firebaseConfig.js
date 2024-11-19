"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const storage_1 = require("firebase/storage");
const firebaseConfig = {
    apiKey: "AIzaSyCX3dk3i9k3yrhAKPHVHzl30mGJgPdxRRQ",
    authDomain: "lms-p-e1b10.firebaseapp.com",
    projectId: "lms-p-e1b10",
    storageBucket: "lms-p-e1b10.appspot.com",
    messagingSenderId: "666650184296",
    appId: "1:666650184296:web:0a68bd2eb230065a61c9dd",
    measurementId: "G-GKQPMQ232E",
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
exports.storage = (0, storage_1.getStorage)(app);
