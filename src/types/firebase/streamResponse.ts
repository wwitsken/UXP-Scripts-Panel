import { JsonObject } from './DataStore';

interface Response {
  event: StreamEvent;
  data: string | UpdateData;
}

interface UpdateData {
  path: string;
  data: JsonObject;
}

interface PutResponse extends Response {
  event: 'put';
  data: {
    path: string;
    data: JsonObject;
  };
}

interface PatchResponse extends Response {
  event: 'patch';
  data: {
    path: string;
    data: JsonObject;
  };
}

interface KeepAliveResponse extends Response {
  event: 'keep-alive';
  data: null;
}

interface CancelResponse extends Response {
  event: 'cancel';
  data: string;
}

interface AuthRevokedResponse extends Response {
  event: 'auth_revoked';
  data: null;
}

type StreamEvent = 'put' | 'patch' | 'keep-alive' | 'cancel' | 'auth_revoked';

const StreamEventValues: StreamEvent[] = ['put', 'patch', 'keep-alive', 'cancel', 'auth_revoked'];

export function isStreamEvent(value: string): value is StreamEvent {
  return StreamEventValues.includes(value as StreamEvent);
}

export type StreamResponse = PutResponse | PatchResponse | KeepAliveResponse | CancelResponse | AuthRevokedResponse;
