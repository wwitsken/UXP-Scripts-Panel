import React, { useState } from 'react';
import Spectrum from 'react-uxp-spectrum';
import { app } from 'indesign';
import { ref } from 'firebase/database';
import { auth, rtdb } from '../firebase';
import onUXPStream from '../utils/onUXPStream';

import './Panel1.css';

export default function Panel1() {
  const [counter, setCounter] = useState<number>(0);
  const [unsub, setUnsub] = useState<() => void>(() => () => {});

  const handleClick = () => {
    const u = onUXPStream(ref(rtdb, 'server/userSelections/sample_user_id/photoIdSelection'), auth, (data) => {
      console.log('Data received. Updated cache:\n', data);
    });
    setUnsub(() => u);
  };

  return (
    <div className="panel">
      <div className="element">
        <Spectrum.Heading size="L">UXP Firebase React Template</Spectrum.Heading>
      </div>
      <Spectrum.Divider size="medium" className="element" />
      <Spectrum.Body size="M" className="element">
        Counter: {counter}
      </Spectrum.Body>
      <div className="flex-col element">
        <Spectrum.Button variant="primary" className="flex-item" onClick={() => app.documents.add()}>
          Create Doc
        </Spectrum.Button>
        <Spectrum.Button variant="primary" className="flex-item" onClick={() => setCounter(counter + 1)}>
          Increment
        </Spectrum.Button>
        <Spectrum.Button variant="primary" className="flex-item" onClick={() => handleClick()}>
          Subscribe
        </Spectrum.Button>
        <Spectrum.Button variant="primary" className="flex-item" onClick={() => unsub()}>
          Unsbuscribe
        </Spectrum.Button>
      </div>
    </div>
  );
}
