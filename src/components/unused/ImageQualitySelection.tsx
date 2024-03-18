import React from 'react';
import Spectrum from 'react-uxp-spectrum';

export default function ImageQualitySelection() {
  // Todo: Render dropdown options based on firebase storage folders
  return (
    <div className="element">
      <Spectrum.Detail>SELECT IMAGE QUALITY</Spectrum.Detail>
      <div className="flex-row begin">
        <Spectrum.Dropdown className="dropdown" placeholder="Make a selection...">
          <Spectrum.Menu slot="options">
            <Spectrum.MenuItem key="1">Thumbnail</Spectrum.MenuItem>
            <Spectrum.MenuItem key="2">Medium Quality</Spectrum.MenuItem>
            <Spectrum.MenuItem key="3">High Quality</Spectrum.MenuItem>
          </Spectrum.Menu>
        </Spectrum.Dropdown>
      </div>
    </div>
  );
}
