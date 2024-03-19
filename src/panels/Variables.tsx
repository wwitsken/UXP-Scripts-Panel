import React from 'react';
import Spectrum from 'react-uxp-spectrum';
import { CustomTextVariablePreference, app } from 'indesign';
import Refresh from '../components/icons/refresh';
import { Variable } from '../utils/getVariables';

import './Variables.css';
import useActiveDocumentVariables from '../hooks/useActiveDocumentVariables';

interface Props {
  getVariables: () => Variable[];
  listenerName?: string;
}

export default function Variables({ getVariables, listenerName }: Props) {
  const { variables, setVariables } = useActiveDocumentVariables(getVariables, listenerName);

  // const getVariables = () => {
  //   const customVariables = app.activeDocument.textVariables
  //     .everyItem()
  //     .properties.filter((variable) => variable.variableOptions?.constructorName === 'CustomTextVariablePreference');

  //   const initialVariables: Variable[] = [];

  //   customVariables.forEach((variable) => {
  //     initialVariables.push({
  //       name: variable.name,
  //       contents: variable.variableOptions.properties.contents,
  //     });
  //   });
  //   return initialVariables;
  // };

  const refresh = () => setVariables(getVariables());

  // useEffect(() => {
  //   const listener = app.addEventListener('afterContextChanged', () => {
  //     setVariables(getVariables());
  //   });

  //   return () => listener.remove();
  // });

  return (
    <div className="panel">
      <div className="scrollable-content">
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} className="element">
          <div className="element">
            <Spectrum.Heading size="L">Update Variables</Spectrum.Heading>
          </div>
          <div style={{ marginTop: '15px', marginLeft: '15px' }}>
            <Spectrum.ActionButton onClick={refresh}>
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
                    const variablepref = app.activeDocument.textVariables.itemByName(variable.name)
                      .variableOptions as CustomTextVariablePreference;
                    variablepref.contents = e.target.value;
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
