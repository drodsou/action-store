import {useReducer, useEffect} from 'react';

// -- to use a store from createStore.js in React hooks
export function useStore (givenStore) {
  const selfForceUpdate = useReducer(x=>!x, false)[1];  // can't be inside a conditional;
  useEffect(() => {
    const unsubscribe = givenStore.subscribe(selfForceUpdate, false); 
    return () => { unsubscribe(); }
  }, []);
  return givenStore;
}