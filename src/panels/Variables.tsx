import React, { useState, useEffect } from 'react';
import Spectrum from 'react-uxp-spectrum';
import { app } from 'indesign';
import Refresh from '../components/icons/refresh';

import './Variables.css';

export default function Variables() {
  const getVariables = () => {
    const customVariables: any = app.activeDocument.textVariables
      .everyItem()
      .properties.filter(
        (variable: any) => variable.variableOptions?.constructorName === 'CustomTextVariablePreference'
      );
    const initialVariables = [];
    customVariables.forEach((variable: any) => {
      initialVariables.push({
        name: variable.name,
        contents: variable.variableOptions.properties.contents,
      });
    });
    return initialVariables;
  };
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    setVariables(getVariables());
  }, []);

  return (
    <div className="panel">
      <div className="scrollable-content">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="element">
          <div className="element">
            <Spectrum.Heading size="L">Update Variables</Spectrum.Heading>
          </div>
          <div style={{ marginTop: '15px', marginLeft: '15px' }}>
            <Spectrum.ActionButton onClick={() => setVariables(getVariables())}>
              <Refresh />
            </Spectrum.ActionButton>
          </div>
        </div>
        <Spectrum.Divider size="medium" className="element" />
        <div className="main-content">
          {variables.map((variable, i) => {
            return (
              <div className="flex-item" key={variable.name}>
                <Spectrum.Textfield
                  className="element"
                  value={variable.contents}
                  onInput={(e) => {
                    const newVariable = { name: variable.name, contents: e.target.value };
                    app.activeDocument.textVariables.itemByName(variable.name).variableOptions.contents =
                      e.target.value;
                    setVariables([...variables.slice(0, i), newVariable, ...variables.slice(i + 1)]);
                  }}
                >
                  <Spectrum.Label slot="label">{variable.name}</Spectrum.Label>
                </Spectrum.Textfield>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
