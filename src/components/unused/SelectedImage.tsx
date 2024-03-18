import React, { useState } from 'react';
import Spectrum from 'react-uxp-spectrum';
// import { ref, onValue, DataSnapshot, off } from 'firebase/database';
// import { auth, rtdb } from '../firebase';
// import listenToSelection from '../utils/listenToDatabase';

// import useCache from '../hooks/useCache';

export default function SelectedImage() {
  const [images, setImages] = useState<string[]>([]);
  // const images = [];
  // useCache(images);

  // const userId = auth.currentUser.uid;

  // useEffect(() => {
  //   const selectionRef = ref(rtdb, `server/userSelections/${userId}`);
  //   onValue(selectionRef, (snapshot: DataSnapshot) => {
  //     const data = snapshot.val();
  //     console.log('data', data);
  //     if (data) {
  //       console.log(`I heard some data! ${data.photoIdSelection}`);
  //     }
  //   });
  //   return () => off(selectionRef);
  // }, []);

  return (
    <div>
      {images.length > 0 ? (
        images.map((img, i) => <img id={`image-preview-${i}`} className="image-border" alt="selected" src={img} />)
      ) : (
        <div className="image-border image-not-selected center">
          <Spectrum.Body size="S">SELECT AN IMAGE</Spectrum.Body>
        </div>
      )}
    </div>
  );
}
