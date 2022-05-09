import createStore from "./store.js";
import Mod from "./mod.js";

// -- all modules actions
type Model = typeof model;
const model = {count:1}

type Actions = typeof actions
const actions = {
  add(props: {value:number}, model: Model) {
    model.count++;
  },
  ...Mod.actions  // static add extra actions
}

const store = createStore( model, actions);

// -- main client
const scMain = store.createClient({name:"main"})

// update
scMain.subscribe(({model})=>{
  document.querySelector('#count').innerText = model.count
});

// link action to event
document.querySelector('#adder').addEventListener('click',()=>scMain.do.add());
// scMain.on('#adder','click','add')

// -- init mod
Mod(store.createClient({name:"mod"}))

// -- start
scMain.do.started();


