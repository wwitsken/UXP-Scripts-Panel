import { app, ImportFormat } from 'indesign';
import uxp from 'uxp';

export default async function importStyles() {
  const fs = uxp.storage.localFileSystem;
  const folder = await fs.getEntryWithUrl('R:/RFP-Driven-Opportunities/Proposals/Proposal-Templates');
  const file = await uxp.storage.localFileSystem.getFileForOpening({
    allowMultiple: false,
    initialLocation: folder,
  });
  //   const file = new File('R:/RFP-Driven-Opportunities/Proposals/Proposal-Templates/Proposal-Template-USE-ME.indt');
  app.activeDocument.importStyles(ImportFormat.PARAGRAPH_STYLES_FORMAT, file);
  console.log('imported styles');
}
