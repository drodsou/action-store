# Svelte + Vite

Vite Svelte template + basic /pages routing

Start: 

> npm run dev

## Svelte store subscribing

As store.subscribe function is compatible with native Svelte stores interface, nothing special is needed 
to use Svelte $ autosubscriptions, both for state and computed props:

Several .svelte files could share same common store, of course

```js
<script> import store from './createStoreExample.js'; </script>

<button on:click={()=>store.action.inc()}>{$store.state.count}</button>
<div>{@html $store.computed.countHtml()}</div>
```