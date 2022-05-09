// -- main client


export default function init (cStore) {

  document.querySelector('#' + cStore.clientName).innerHTML = `
    <button id="alsoAdd">AlsoAdd</button>
    <button id="substract">Substract</button>
  `;

  // link action to event of an already available action
  document.querySelector('#alsoAdd').addEventListener('click',()=>cStore.do.add());
  document.querySelector('#substract').addEventListener('click',()=>cStore.do.substract({value:2}));
   

  // // update
  // scMain.subscribe(({model})=>{
  //   document.querySelector('#count').innerText = model.count
  // });
}

// -- declare all actions handled by this module, sent to store and return for posible log

init.actions = {
  substract({value}, model) {
    model.count -= value ?? 1;
  }
}
