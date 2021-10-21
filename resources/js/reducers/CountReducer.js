export const ACTIONS = {
  ACTION_INC:'inc',
  ACTION_DEC:'dec'
};

export function incAction(){
    return {
      type:ACTIONS.ACTION_INC
    };
}

export function decAction(){
    return {
      type:ACTIONS.ACTION_DEC
    };
}

export function CountReducer(state,action){
  switch(action.type){///
      case ACTIONS.ACTION_INC:
          return state + 1;
      case ACTIONS.ACTION_DEC:
          return state - 1;
      default:
          return state;        
  }
}