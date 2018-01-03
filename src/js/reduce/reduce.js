export default (state={
    Credit:{},
    My:{}
    
},action)=>{
    // console.log(state);
    // return state
    switch(action.type){
        case "Credit":
        var newstate={}
        state.Credit=action.data;
        Object.assign(newstate,state);
        return newstate;
        case "HOME":
        var newstate={};
        state.My=action.data;
        Object.assign(newstate,state);
        return newstate;
        break;
        default:
        return state
        break;
        
    }
    
}