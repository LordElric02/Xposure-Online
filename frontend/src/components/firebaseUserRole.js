import { fstore } from "./firebase";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";

export const getFirebaseUserRole = async (userId) => {
  try {
    const db = fstore;
    console.log(`firestore instance: ${db}`);

    // Reference the 'users' document in the 'security' collection
    const usersDocRef = doc(db, "security", "users");

    // Reference the 'userslist' subcollection
    const userListColRef = collection(usersDocRef, "userList");

    // Fetch the documents in the 'userslist' subcollection
    const snapshot = await getDocs(userListColRef);

    // Filter the documents to find the one with the specified userId
    const userDoc = snapshot.docs.find(doc => doc.id === userId);

    if (userDoc) {
      // Get the RoleId from the user document
      const roleIdRef = userDoc.data().roleId;

      // Fetch the role document from the Roles collection
      console.log(`role id reference:${roleIdRef}`)
      const roleDoc = await getDoc(roleIdRef);
      
      if (roleDoc.exists()) {
        const roleName = roleDoc.data().name;  // Assuming 'name' is the field you want
        console.log(`User: ${userId}, Role Name: ${roleName}`);
        return roleName; // Return the role name
      } else {
        console.error("Role document does not exist");
      }
    } else {
      console.error("User document not found");
    }
  } catch (error) {
    console.error("Error fetching collection documents:", error);
  }

  return null; // Return null if no role name is found
};
