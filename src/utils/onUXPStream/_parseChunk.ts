import { StreamResponse, isStreamEvent } from '../../types/firebase/streamResponse';

export default function parseChunk(value: Uint8Array) {
  // Convert the Uint8Array to a string without TextDecoder
  const chunk = new Uint8Array(value);
  let chunkAsString = '';
  for (let i = 0; i < chunk.length; i += 1) {
    chunkAsString += String.fromCharCode(chunk[i]);
  }
  // Split the chunk by newline characters
  const lines = chunkAsString.split('\n');

  // Initialize an empty variable to store the event and data
  const responseObj = { event: null, data: null };

  // Iterate over each line
  lines.forEach((line) => {
    // Check if the line contains a colon
    if (line.includes(':')) {
      // Split the line by the first colon
      const [key, lineValue] = line.split(/:(.+)/);

      // Use trim() to remove leading and trailing whitespace
      const trimmedLine = lineValue.trim();

      // If the key is 'data', parse the value as JSON
      if (key === 'data') {
        responseObj.data = JSON.parse(trimmedLine);
      } else if (key === 'event' && isStreamEvent(trimmedLine)) {
        // If the key is 'event' and the event is recognized, set the event property
        responseObj.event = trimmedLine;
      }
    }
  });

  return responseObj as StreamResponse;
}
