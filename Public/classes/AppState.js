 export class State {
    constructor(initialState){
        this.state = initialState
    }
    getState(stateProp=null){
        if(!stateProp) return this.state;
        return this.state[stateProp]
    }
    setState(pieceOfState=null){
        if(!pieceOfState) throw Error('Can not call setState without the state param');
        return this.state = {
            ...this.state,
            ...pieceOfState
        }
    }
}
