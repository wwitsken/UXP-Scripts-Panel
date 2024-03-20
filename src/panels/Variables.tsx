import React from 'react';
import ReactDOM from 'react-dom';
import Spectrum from 'react-uxp-spectrum';
import { CustomTextVariablePreference, app } from 'indesign';
import Refresh from '../components/icons/Refresh';
import TextAdd from '../components/icons/Textadd';
import LinkPage from '../components/icons/LinkPage';
import { Variable } from '../utils/getVariables';
import TextVariableDeleteDialog from '../components/TextVariableDeleteDialog';
import TextVariableDialog from '../components/TextVariableDialog';
import useActiveDocumentVariables from '../hooks/useActiveDocumentVariables';
import Delete from '../components/icons/Delete';
import removeVariable from '../utils/removeVariable';
import linkVariable from '../utils/linkVariable';

import './Variables.css';

interface Props {
  getVariables: () => Variable[];
  listenerName?: string;
}

export default function Variables({ getVariables, listenerName }: Props) {
  const { variables, setVariables } = useActiveDocumentVariables(getVariables, listenerName);

  const refresh = () => setVariables(getVariables());

  const renderAddTextDialog = () => {
    const dialogElement = document.createElement('dialog');
    document.appendChild(dialogElement);
    ReactDOM.render(<TextVariableDialog dialogElement={dialogElement} refresh={refresh} />, dialogElement);
    dialogElement.addEventListener('close', () => {
      document.removeChild(dialogElement);
    });
    dialogElement.showModal();
  };

  const renderDeleteTextDialog = (variableName: string, instances: number) => {
    const dialogElement = document.createElement('dialog');
    document.appendChild(dialogElement);
    ReactDOM.render(
      <TextVariableDeleteDialog
        dialogElement={dialogElement}
        refresh={refresh}
        variableName={variableName}
        instances={instances}
      />,
      dialogElement
    );
    dialogElement.addEventListener('close', () => {
      document.removeChild(dialogElement);
    });
    dialogElement.showModal();
  };

  const countVariableInstances = (variableName: string): number => {
    const instances = app.activeDocument.textVariables.itemByName(variableName).associatedInstances;
    if (!instances) return 0;
    if (Array.isArray(instances)) return instances.length;
    return 1;
  };

  const handleDelete = (variableName: string) => {
    const variableInstances = countVariableInstances(variableName);
    if (variableInstances > 0) {
      renderDeleteTextDialog(variableName, variableInstances);
    } else {
      removeVariable(variableName, refresh);
    }
  };

  return (
    <div className="panel">
      <div className="scrollable-content">
        <div className="element">
          <Spectrum.Heading size="L">Update Variables</Spectrum.Heading>
          <Spectrum.Divider size="medium" />
          <div className="flex-row" style={{ marginTop: '10px' }}>
            <Spectrum.ActionButton onClick={refresh}>
              <Refresh />
            </Spectrum.ActionButton>
            <Spectrum.ActionButton onClick={renderAddTextDialog}>
              <TextAdd />
            </Spectrum.ActionButton>
          </div>
        </div>

        <div className="main-content">
          {variables.map((variable, i) => {
            return (
              <div className="flex-item element" key={variable.name}>
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
                <div className="flex-row" style={{ alignSelf: 'flex-end', margin: '0 0 4 4' }}>
                  <Spectrum.ActionButton onClick={() => handleDelete(variable.name)}>
                    <Delete />
                  </Spectrum.ActionButton>
                  <Spectrum.ActionButton
                    onClick={() => {
                      linkVariable(variable.name);
                    }}
                  >
                    <LinkPage />
                  </Spectrum.ActionButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
