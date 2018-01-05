export default (state={
    Credit:{},
    My:{},
    LIST_1:{},
    LIST_2:{},
    LIST_3:{},
    infopage:""
    
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
        case "LIST_1"://审核列表信息
        var newstate={};
        state.LIST_1=action.data
        Object.assign(newstate,state);
        return newstate;
        break;
        case "LIST_2"://待还款列表信息
        var newstate={};
        state.LIST_2=action.data
        Object.assign(newstate,state);
        return newstate;
        break;
        case "LIST_3"://已还款列表信息
        var newstate={};
        state.LIST_2=action.data
        Object.assign(newstate,state);
        return newstate;
        break;
        case "INFO"://info信息
        
        var newstate={};
        state.infopage=action.data;
        Object.assign(newstate,state);
        return newstate;
        break;
        default:
        return state
        break;
        
    }
    
}