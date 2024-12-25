
export const firebaseName  = (storageUrl) =>  {
  // Function to extract the file name from the Firebase Storage URL
  const getFileNameFromUrl = (url) => {
    if (!url) return '';

    // Create a URL object
    const urlObj = new URL(url);
    
    // Split the pathname to get the last segment as the file name
    const pathSegments = urlObj.pathname.split('/');
    
    // Return the last segment (the file name)
    return pathSegments[pathSegments.length - 1];
  };

  const fileName = getFileNameFromUrl(storageUrl);

  return fileName;
}