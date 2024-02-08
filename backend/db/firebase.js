
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1DM1UybWO7L5XxAHEEDXDk5F8psIMi-0",
  authDomain: "skillsync-34cb1.firebaseapp.com",
  projectId: "skillsync-34cb1",
  storageBucket: "skillsync-34cb1.appspot.com",
  messagingSenderId: "693956904078",
  appId: "1:693956904078:web:08b454b0d7e2ba1a1e75df"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;