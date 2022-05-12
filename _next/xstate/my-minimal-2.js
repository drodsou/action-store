// // good fro typescrip, not for js autocomplete
// function createStatus (name, curr, def) {
//   function status (next) {
//     if (!next) { return curr; }
//     if (def[curr].includes(next)) { return curr = next }
//     console.error(`ERROR: ${name}: invalid transition ${curr}->${next}`)
//     // throw new Error(`${name}: invalid transition ${curr}->${next}`)
//   }
//   status.def = def;
//   return status;
// }

a = Object.fromEntries(['uno','dos'].map((k,v)=>[k,v]))


let cursos = {
  states : {
    ABSENT : ["BOOTING"],
    BOOTING : ["CRASH", "DATA"],
    CRASH : [],
    DATA: ['EXEC', 'alumnos.BOOTING'],
    EXEC: ['DATA'],
  },
  state: 'ABSENT',
  context : {
    count: 1
  },
  actions : {
    async query() {
      if (err) cursos.state = cursos.states.CRASH
      else cursos.state = cursos.states.DATA
    }
  }
}



// good for js autocomplete
function fsmInit(def, name='fsm') {
  let oriDef = {...def};
  let curr = oriDef.current;
  Object.keys(def).forEach(k=>{
    if (k === 'current') {
      Object.defineProperty(def, 'current', { 
        get: ()=>curr ,
        set: (value)=>{curr = value; return curr;}
      });
    } else {
      Object.defineProperty(def, k, {
        get: ()=> {
          if (oriDef[curr].includes(k))  { return k }
          console.log(`ERROR: ${name}: invalid transition ${curr}->${k}`) 
          return curr
        },
      })
    }
  });
  return def;
}

// copy template
let model = {
  st1 : {...fsm1}
}

// transcurm st1 keys in getteer, keeping js autocomplete
fsmInit(model.st1,'stCursos')
 Object.freeze(model); // maybe interesting??

console.log(model.st1.current) // absent
model.st1.current = model.st1.DATA  //error
model.st1.current = model.st1.BOOTING //ok
console.log(model.st1.current)



// let stat2 = create2('st2','absent', cursos); 
// console.log(stat2.curr)
// console.log(stat2.curr = stat2.absent)

// const status = createStatus('cursos','absent',cursos)

// status.
// console.log(status())
// console.log(status('booting'))



const alumnos = {
  absent: [],
  booting: ['crash', 'data'],
  data : ['executeCsv'],
  executeCsv : ['data']
}


