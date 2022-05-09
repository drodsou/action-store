import dosActions from './dos';

const unoActions = {
  inc(x:number) {
    return x*1
  }
}

let actions = typeof {...unoActions, ...dosActions};


function createStore<T> () {
  let actions
}