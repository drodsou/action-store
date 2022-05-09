import createStore from "./store.js";
import Mod from "./mod.js";

const store = createStore({count:1});

// -- main client
const scMain = store.createClient({clientName:"main"})

// action
scMain.register("add",({payload,model})=>{
  model.count++;
})

// update
scMain.subscribe(({model})=>{
  document.querySelector('#count').innerText = model.count
});

// link action to event
document.querySelector('#add').addEventListener('click',()=>scMain.dispatch('add'));


// -- init mod
Mod(store.createClient({clientName:"mod"}))



// -- start
scMain.dispatch('start');


