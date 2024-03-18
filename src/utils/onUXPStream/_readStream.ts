/* eslint-disable @typescript-eslint/indent */
import DataStore, { JsonObject } from '../../types/firebase/DataStore';
import parseChunk from './_parseChunk';

export const PermissionDenied = new Error('Permission denied.');
export const PayloadTooLarge = new Error('Payload too large.');
export const UnknownError = new Error('Unknown error');
export const AuthRevoked = new Error('Auth revoked');
export const UnknownEvent = new Error('Unknown event');

export default function readStream(
  reader: ReadableStreamDefaultReader,
  controller: AbortController,
  state: DataStore,
  timer: NodeJS.Timeout,
  callback: (data: JsonObject) => void
) {
  reader
    .read()
    .then(({ done, value }: { done: boolean; value: Uint8Array }) => {
      clearTimeout(timer);

      if (done) {
        console.log('Stream finished.');
        controller.abort();
        return;
      }

      const responseObj = parseChunk(value);

      switch (responseObj.event) {
        case 'put': {
          state.updatePut(responseObj.data.path, responseObj.data.data);
          callback(state.data);
          //   console.log('PUT:', state.data);
          break;
        }
        case 'patch': {
          state.updatePatch(responseObj.data.path, responseObj.data.data);
          //   console.log('PATCH:', state.data);
          callback(state.data);
          break;
        }
        case 'keep-alive': {
          break;
        }
        case 'cancel': {
          if (responseObj.data === 'Permission denied.') {
            throw PermissionDenied;
          } else if (
            responseObj.data === 'The specified payload is too large, please request a location with less data.'
          ) {
            throw PayloadTooLarge;
          } else {
            throw UnknownError;
          }
        }
        case 'auth_revoked': {
          throw AuthRevoked;
        }
        default: {
          throw UnknownEvent;
        }
      }

      // Keep reading
      readStream(reader, controller, state, timer, callback);
    })
    .catch((err) => {
      if (err.message === 'aborted') {
        console.log('Stream aborted');
      } else {
        console.error(err);
      }
    });
}
