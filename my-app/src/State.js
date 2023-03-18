export default class State {
    constructor(name,isInitial=false,isAccepting=false) {
        this.name=name;
        this.isInitial=isInitial;
        this.isAccepting=isAccepting;
    }
    getName(){
        return this.name
    }
}