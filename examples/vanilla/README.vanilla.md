
Open index.html with VSCode live-server extension

## vanilla js subscribing

```js
<button onClick="store.action.inc()"></button>

<script type="module">
  import store from 'createStoreExample.js';
  window.store = store;
  store.subscribe(({state,computed})=>{
    document.querySelector('button').innerText = state.count;
  });
</script>
```

Or more declarative/sofisticated, you can use optional `createStoreVanilla.js` helpers for autobinding






