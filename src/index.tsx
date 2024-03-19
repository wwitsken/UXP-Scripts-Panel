import ReactDOM from 'react-dom';
import React from 'react';
import { entrypoints } from 'uxp';
import { app } from 'indesign';
import Variables from './panels/Variables';
import { getVariables } from './utils/getVariables';

const listenerName: string = 'RRMUtils.TextVariableActiveDocumentListener';

entrypoints.setup({
  plugin: {
    create() {
      return new Promise<void>((resolve) => {
        resolve();
      });
    },
    destroy() {
      return new Promise<void>((resolve) => {
        resolve();
      });
    },
  },
  panels: {
    'RRM.VariablePanel': {
      show() {
        return new Promise<void>((resolve) => {
          ReactDOM.render(
            <Variables getVariables={getVariables} listenerName={listenerName} />,
            document.getElementById('root')
          );
          resolve();
        });
      },
      hide() {
        return new Promise<void>((resolve) => {
          const success = app.eventListeners.itemByName(listenerName).remove();
          console.log('able to remove listener:', success, listenerName);
          resolve();
        });
      },
      destroy() {
        return new Promise<void>((resolve) => {
          const success = app.eventListeners.itemByName(listenerName).remove();
          console.log('able to remove listener:', success, listenerName);
          resolve();
        });
      },
    },
  },
});
