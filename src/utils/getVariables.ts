import { app } from 'indesign';

export interface Variable {
  name: string;
  contents: string;
}

export const getVariables = () => {
  const customVariables = app.activeDocument.textVariables
    .everyItem()
    .properties.filter((variable) => variable.variableOptions?.constructorName === 'CustomTextVariablePreference');

  const initialVariables: Variable[] = [];

  customVariables.forEach((variable) => {
    initialVariables.push({
      name: variable.name,
      contents: variable.variableOptions.properties.contents,
    });
  });
  return initialVariables;
};
