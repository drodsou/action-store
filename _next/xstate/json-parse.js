states = {
  start: ['open', 'error'],
}
context : {
}

// https://gist.github.com/drodsou/d67950c06ca1b75626bcfa1259124683

states = {
  absent : {
    booting: ()=>true
  },
  booting : { 
    _in: async (ctx,evt)=> {
      return await fetch();
    },
    cancel: (r) => r.error === true ,
    data: (r) => r.error === false ,
  },
  cancel : {},
  data: {
    _in: (r)=> {
      postprocess(r)
    }
      if (evt === 'select') 

    }
  }
}