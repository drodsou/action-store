<script>
  import store  from '../../../createStoreExample.js';
  globalThis.store = store;
</script>


<button on:click={()=>store.action.inc()}
  style="color: {$store.computed.color()}"
>
  C2: {$store.state.count}
</button>


  
