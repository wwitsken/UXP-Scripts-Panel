import { app, VariableTypes } from 'indesign';
import { Dispatch, SetStateAction } from 'react';

export default function addVariable(
  name: string,
  refresh: () => void,
  setErrorMsg: Dispatch<SetStateAction<string>>,
  closinator: () => void
) {
  if (name === '') {
    setErrorMsg('Variable name cannot be empty');
    return;
  }
  if (app.activeDocument.textVariables.itemByName(name).isValid) {
    setErrorMsg('Variable name already exists');
    return;
  }
  setErrorMsg('');
  app.activeDocument.textVariables.add({
    name,
    variableType: VariableTypes.CUSTOM_TEXT_TYPE,
  });
  refresh();
  closinator();
}
