# react-vite-template

https://github.com/drodsou/react-vite-template

Minimal React/Vite starting template for quick development tinkering, based on Vite official template.


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