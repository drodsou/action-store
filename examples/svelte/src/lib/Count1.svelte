<script>
  import store  from '../../../createStoreExample.js';
  globalThis.store = store;
</script>


<button on:click={()=>store.action.inc()}
  style="background-color: {$store.computed.color()}"
>
  C1: {$store.state.count}
</button>


  
