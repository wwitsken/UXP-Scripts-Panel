import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Spectrum from 'react-uxp-spectrum';
// import uxp from 'uxp';
// import { doc, updateDoc } from 'firebase/firestore/lite';
// import { db } from '../firebase';
// import createUserSessionId from '../utils/userPluginSessionId';
// import { app } from 'indesign';

interface Props {
  auth: Auth;
}

export default function Authenticate({ auth }: Props) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (loginAuth: Auth) => {
    signInWithEmailAndPassword(loginAuth, user, password)
      .then(async (userCredential) => {
        console.log(`Signed in user: ${userCredential.user.email}`);
        // const crypto = window.crypto.randomUUID();
        // await createUserSessionId(userCredential, crypto);
        // uxp.storage.secureStorage.setItem('user', user);
        // uxp.storage.secureStorage.setItem('password', user);
        // uxp.storage.secureStorage.setItem('userPluginSessionId', crypto);
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
        setError(true);
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="panel flex-col center">
      <Spectrum.Detail size="M" className="element">
        Please login to use the plugin.
      </Spectrum.Detail>
      <Spectrum.Textfield
        className="element"
        invalid={error}
        value={user}
        placeholder="User Email"
        onInput={(e) => {
          if (e.target?.value) {
            setUser(e.target.value);
            setError(false);
          }
        }}
      />
      <Spectrum.Textfield
        className="element"
        type="password"
        invalid={error}
        value={password}
        placeholder="User Password"
        onInput={(e) => {
          if (e.target?.value) {
            setPassword(e.target.value);
            setError(false);
          }
        }}
      />
      <div className="element">
        <Spectrum.ActionButton onClick={() => handleLogin(auth)}>Login</Spectrum.ActionButton>
      </div>
    </div>
  );
}
