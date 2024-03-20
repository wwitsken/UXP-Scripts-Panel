import {
  app,
  Text,
  InsertionPoint,
  Character,
  Word,
  Line,
  TextColumn,
  TextStyleRange,
  TextFrame,
  EndnoteTextFrame,
  Footnote,
  XmlStory,
  Change,
  Note,
  Table,
  Cell,
  Paragraph,
  Story,
  TextVariableInstance,
} from 'indesign';

export default function linkVariable(variableName: string) {
  const variable = app.activeDocument.textVariables.itemByName(variableName);

  if (!variable.isValid) {
    return;
  }

  let selection = app.selection[0];

  // The following check verifies that the selection is a text-like thing.
  // https://www.indesignjs.de/extendscriptAPI/indesign-latest/#TextVariableInstances.html#d1e572024
  if (!selection.textVariableInstances) {
    return;
  }

  selection = selection as
    | Text
    | InsertionPoint
    | Cell
    | Table
    | Character
    | Word
    | Line
    | TextColumn
    | Paragraph
    | TextStyleRange
    | InsertionPoint
    | TextFrame
    | Story
    | EndnoteTextFrame
    | Change
    | Note
    | Footnote
    | XmlStory;

  const instance = selection.textVariableInstances.add() as TextVariableInstance;
  instance.associatedTextVariable = variable;
}
