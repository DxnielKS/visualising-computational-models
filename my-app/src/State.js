export default class State {
    constructor(id,name,x,y,isInitial=false,isAccepting=false) {
        this.id=id
        this.name=name;
        this.x=x;
        this.y=y;
        this.isInitial=isInitial;
        this.isAccepting=isAccepting;
    }
    getName(){
        return this.name
    }
}