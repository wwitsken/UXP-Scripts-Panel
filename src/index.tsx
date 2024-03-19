import ReactDOM from 'react-dom';
import React from 'react';
import { entrypoints } from 'uxp';
import Variables from './panels/Variables';

entrypoints.setup({
  plugin: {
    create() {
      return new Promise<void>((resolve) => {
        resolve();
      });
    },
    destroy() {
      return new Promise<void>((resolve) => {
        console.log('destroyed');
        resolve();
      });
    },
  },
  panels: {
    'RRM.VariablePanel': {
      show() {
        return new Promise<void>((resolve) => {
          ReactDOM.render(<Variables />, document.getElementById('root'));
          resolve();
        });
      },
      hide() {
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
  },
});
