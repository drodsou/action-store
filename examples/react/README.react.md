# react-vite-template

Minimal react vite template, with basic /pages routing added

Start: 

> npm run dev


## React/preact subscribing
```js
import store from './createStoreExample'; 

constructor () {
  ...
  store.subscribe(({state,computed})=>{
    this.forceUpdate();  
  });
}
```

Or if using hooks use `createStoreReact.js`

```js
import _store from './createStoreExample';
import {useStore} from './createStoreReact';

function Component () {
  const store = useStore(_store);  // or {..._store} for independent one
  return <button onClick={()=>store.action.inc()}>{store.state.count}</button>
}
```