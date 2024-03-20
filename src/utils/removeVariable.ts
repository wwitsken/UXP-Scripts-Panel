import { app } from 'indesign';

export default function removeVariable(name: string, refresh: () => void) {
  try {
    const variable = app.activeDocument.textVariables.itemByName(name);
    variable.remove();
  } catch (e) {
    console.error(e);
  }
  refresh();
}
