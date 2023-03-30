import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"; // Import your firebase app instance

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(null);

  const [auth, setAuth] = useState(getAuth())

  // console.log(auth.currentUser)

  const updateProfileNameAndPicture = (displayName, photoURL) => {

    updateProfile(auth.currentUser, {
      displayName: "John Doe",
      photoURL: "https://example.com/john-doe.png"
    }).then(() => {
      // Profile updated successfully
    }).catch((error) => {
      // An error occurred while updating the profile
      console.log(error);
    });


  }

  const signup = (email, password, display) => {
    createUserWithEmailAndPassword(auth, email, password,)
      .then((userCredential) => {
        // Signed in
        console.log("Successful register!")
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: display, photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          // ...
        });
        setCurrentUser(user)
        // console.log(user)
        return user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        // ..
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        console.log("Successful login!")
        const user = userCredential.user;
        setCurrentUser(user)
        console.log(user)
        return user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {

      setCurrentUser(user);

      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    updateProfileNameAndPicture,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};