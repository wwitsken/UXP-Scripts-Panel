import ReactDOM from 'react-dom';
import React from 'react';
import { entrypoints } from 'uxp';
import Panel1 from './panels/Panel1';

entrypoints.setup({
  plugin: {
    create() {
      return new Promise<void>((resolve) => {
        console.log('created');
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
    panel1: {
      show() {
        return new Promise<void>((resolve) => {
          console.log('showed panel 1');
          ReactDOM.render(<Panel1 />, document.getElementById('root'));
          resolve();
        });
      },
      hide() {
        return new Promise<void>((resolve) => {
          console.log('hidden');
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
  },
});
