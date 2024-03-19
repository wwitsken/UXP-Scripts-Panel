import React from 'react';
import { app } from 'indesign';
import { Variable } from '../utils/getVariables';

export default function useActiveDocumentVariables(
  callback: () => Variable[],
  listenerName: string = 'RRMUtils.TextVariableActiveDocumentListener'
) {
  const memoizedCallback = React.useCallback(callback, []);

  const [variables, setVariables] = React.useState<Variable[]>(memoizedCallback());

  React.useEffect(() => {
    const oldListener = app.eventListeners.itemByName(listenerName);

    if (oldListener.isValid) {
      oldListener.remove();
      console.log('old listener removed', listenerName);
    }

    const listener = app.eventListeners.add(
      'afterContextChanged',
      () => {
        setVariables(callback());
      },
      false,
      { name: listenerName }
    );

    console.log('listener added', listenerName);

    return () => {
      listener.remove();
      console.log('listener removed', listenerName);
    };
  }, [memoizedCallback]);

  return { variables, setVariables };
}
