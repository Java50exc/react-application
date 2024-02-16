import React, { useEffect } from 'react';
import { getAuth, getRedirectResult } from 'firebase/auth';
import { firebaseApp } from "../../config/firebase-config";


const CallbackPage: React.FC =() => {
  useEffect(() => {
    // Get the Firebase Authentication instance
    const auth = getAuth(firebaseApp);

    // Call getRedirectResult to retrieve the authentication result
    getRedirectResult(auth)
      .then((result) => {
        // The user is signed in
        const user = result!.user;
        console.log('User signed in:', user);
        
        // Redirect the user to the desired page
        // Example: window.location.href = '/dashboard';
      })
      .catch((error) => {
        // Handle any errors that occurred during sign-in
        console.error('Sign-in with redirect failed:', error);
      });
  }, []);

  return (
    <div>
      <h1>Callback Page</h1>
      {/* Add any content for the callback page */}
    </div>
  );
}

export default CallbackPage;
