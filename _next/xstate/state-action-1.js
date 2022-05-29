function asyncFn(ret) {
  return new Promise(resolve => {
    setTimeout(() => {resolve(ret);}, 0);
  })
}

// ---

/* cursos fsm definition*/
// TODO: use strings instead of object id? to prevent recursive dependencies?
var ABSENT = {
  start : {BOOTING}
}

var BOOTING = {
  _start : {CRASH, DATA, do: async ({next, ctx})=>{
    let ok = await asyncFn(true) 
    if (ok) return next.DATA;
    ctx.error = 'BOOTING._start error';
    return next.CRASH;
  }},
}

var CRASH = {}

var DATA = {
  select : {DATA, do: ({args, next, fsm})=>{
    //TODO: other FSM
    //fsm.alumnos.ABSENT.start(args.edicion)
    return next.DATA
  }},
  mark : {EXEC},
  delete : {EXEC},
}

var EXEC = {
  _mark : {DATA, do: async ({args,next, ctx})=>{
    let ok = await asyncFn(false)
    if (!ok) { ctx.error = 'EXEC._mark error' }
    return next.DATA
  }},
  _delete : {DATA, do: async ({args,next, ctx})=>{
    let ok = await asyncFn(true)
    if (!ok) { ctx.error = 'EXEC._delete error' }
    return next.DATA
  }},

}


// const cursos = fsm("ABSENT", {ABSENT, BOOTING, CRASH, DATA, EXEC})




const cursos = {
  states : {ABSENT, BOOTING, CRASH, DATA, EXEC},
  ctx : {
    state: "ABSENT",
    error: "",
  },

  // -- my FSM library
  async do(actionName, args) {
    console.log(`\ndo: ${cursos.ctx.state}.${actionName}`);

    //TODO: execute _enter action if exists

    const actionObj = cursos.states[cursos.ctx.state][actionName];
    if (!actionObj) {
      if (actionName.startsWith('_')) return console.warn(`Skipping action ${cursos.ctx.state}.${actionName}`);
      else throw new Error(`Invalid action for current state: ${cursos.ctx.state}.${actionName}`);
    }

    const nextObj = Object.fromEntries(Object.entries(actionObj).filter(e=>e[0] !== 'do').map(e=>[e[0], e[0]]))
    const actionFn = actionObj.do
    let nextState = nextObj[Object.keys(nextObj)[0]]
    if (actionFn) {
      nextState = await actionFn({args, next: nextObj, ctx: cursos.ctx})
    }
    if (!(actionName.startsWith('_'))) {
      console.log(`auto-schedule ${nextState}._${actionName}`)
      Promise.resolve().then(()=>cursos.do("_"+actionName, args))
    }
    cursos.ctx.state = nextState;
    //TODO: execute subscribers, eg UI updaters
    console.log(cursos.ctx);
  },
  // TODO: outoput fsm graph (mermaid, xstate?)
  // TODO: autogenerate test cases
}


// -- TEST

console.log(cursos.ctx);
cursos.do("start")
setTimeout(()=>cursos.do("mark"), 100);

/*
TODO: 
- convertir esto en libreria
- añadir typescript
- Comentarlo con Svelte FSM https://www.youtube.com/watch?v=3_D-3HPUdEI
  - el mio lo mejora en que es grafo declarativo (next) incluso con funciones
*/




