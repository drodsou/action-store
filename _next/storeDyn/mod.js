// -- main client

export default function Mod (scMod) {

  document.querySelector('#' + scMod.clientName).innerHTML = `
    <button id="alsoAdd">AlsoAdd</button>
  `;

  // link action to event of an already available action
  document.querySelector('#alsoAdd').addEventListener('click',()=>scMod.dispatch('add'));

  // document.querySelector('#' + scMod.clientName).innerHTML = `
  //   <button id="substract">Substract</button>
  // `;

    // action
  scMain.register("substract",({payload,model})=>{
    model.count -= payload.value ?? 1;
  })

  // // update
  // scMain.subscribe(({model})=>{
  //   document.querySelector('#count').innerText = model.count
  // });
}