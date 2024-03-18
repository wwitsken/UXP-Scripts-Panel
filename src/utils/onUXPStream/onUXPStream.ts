import { DatabaseReference } from 'firebase/database';
import { Auth } from 'firebase/auth';
import readStream from './_readStream';
import DataStore, { JsonObject } from '../../types/firebase/DataStore';

export default function onUXPStream(ref: DatabaseReference, auth: Auth, callback: (data: JsonObject) => void) {
  const url = `${ref.toString()}.json`;
  const state = new DataStore();
  let controller: AbortController;

  console.log('Listening to event stream ', url);
  const beginStream = async () => {
    controller = new AbortController(); // Update the controller variable each time beginStream is called
    const { signal } = controller;
    try {
      const headers = new Headers({ Accept: 'text/event-stream' });

      if (auth.currentUser !== null) {
        const token = await auth.currentUser.getIdToken();
        headers.append('Authorization', `Bearer ${token}`);
      }

      const response = await fetch(url, {
        headers,
        signal,
      });

      // Set a timer for 2 minutes (120000 milliseconds)
      const timer = setTimeout(() => {
        console.log('No response received in 2 minutes. Aborting...');
        controller.abort();
        beginStream();
      }, 120000);

      const reader = response.body.getReader();

      // Start reading
      readStream(reader, controller, state, timer, callback);
    } catch (err) {
      console.error('Fetch error:', err);
      console.log('Retrying...');
      controller.abort();
      beginStream();
    }
  };

  beginStream();
  return () => controller?.abort();
}
