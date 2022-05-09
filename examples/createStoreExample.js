// -- use example
import {createStore} from '../createStore.js';


var store = createStore({count:1});


// -- state should be only changed inside an action, but it is not enforced
// -- (state is a plain, not proxied, object, so direct change outside of actions wont trigger subscritions)
store.action.inc = function () {  
  this.state.count++;  // straightforward state manipulation, synchronous (react!) and 
  // no cumbersome state update function, receiving state + new state object merging + returning mew state
  // actions are bound to its store, so this works ok 
};

store.action.component = {
  inc2() {
    console.log('inc2 fired')
    store.state.count +=2;
  }
}

store.computed.countHtml = ()=>`<b>${store.state.count}</b>`;
store.computed.color = (color1='red',color2='green')=> store.state.count % 2 ? color1 : color2; 

export default store;