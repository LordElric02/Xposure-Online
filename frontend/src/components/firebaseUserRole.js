import { fstore } from "./firebase";
import { collection, getDocs } from "firebase/firestore"; 

const setUserRole = () => {
  try {
    const db =fstore;
    console.log(`firestore instance:${db}`);
    // Reference the collection
    const colRef = collection(db, "security");
    console.log(`collection fetched:${colRef}`);

    // Fetch the documents
    getDocs(colRef).then((snapshot) => {
        console.log(`documents fetched`);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Documents:", docs);
  }).catch((error) => {
      console.error("Error getting documents:", error);
  });
  } catch (error) {
     console.log('error fetching collection documents')
  }
 
  return (
    <div>
      
    </div>
  )
}

export default setUserRole
