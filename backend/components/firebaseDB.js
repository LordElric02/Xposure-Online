// Function to create a record
export const createRecord = async (admin, path, data) => {
  // Get a reference to the database
  const db = admin.database();
  
  try {
    const ref = db.ref(path);
    await ref.set(data);
    console.log('Record created successfully:', data);
  } catch (error) {
    console.error('Error creating record:', error);
  }
};