import State from './state.js';

class TuringMachine { // TODO Multi head turing machine translate between variant turing machine
    constructor(transitions, states, memory) {
        this.previous=null
        this.transitions = transitions
        this.states = states;
        // an attribute for the memory tape of the machine
        this.memory = memory
        // initialise the head the beginning of the list
        this.head = 0
        // loops through states in sets the current state to the initial state
        for (const state of states) {
            if (state.isInitial) {
                this.currentState = state;
            }
        }

        this.transitionFunction = new Map([]);

        for (const transition of transitions) {
            this.transitionFunction.set(transition[0].name + "_" + transition[1], transition.slice(2, transition.length))
        }

    }
    // method to update the transition function of the Turing machine
    setTransitionFunction(transitionFunction) {
        this.transitionFunction = transitionFunction;
    }
    // method to get the current transition function
    getTransitionFunction() {
        return this.transitionFunction;
    }
    // method to get the current state of the machine
    getCurrentState() {
        return this.currentState;
    }
    // method to set the current state of the machine
    setCurrentState(state){
        this.currentState=state
    }
    // method to return the memory tape
    getMemory(){
        return this.memory
    }
    // return the position of the memory head
    getHead(){
        return this.head
    }
    // method to run 1 steps of computation
    compute() {
        const currentMemoryCell = this.getMemory()[this.getHead()]
        let nextState = this.getTransitionFunction().get(this.getCurrentState().name+"_"+currentMemoryCell)
        this.setCurrentState(nextState[0])
        // if there is a symbol to write in that memory cell
        if (typeof nextState[2]=="number"){
            this.memory[this.getHead()]=nextState[2]
        }
        // if there is a direction symbol returned
        if (typeof nextState[1]=="string"){
            if (nextState[1]==">"){
                this.head=this.head+1
            }
            else{
                this.head=this.head-1
            }
        }

        // just move right by default
        else{
            this.head=this.head+1
        }

    }
    // method to add a new state
    addState(state){
        this.states.append(state)
    }
    // add transition to the machine
    addTransition(transition){
        this.transitions.append(transition)

        this.transitionFunction = new Map([]);

        // recalculate transition function based on new transition tuples
        for (const transition of this.transitions) {
            this.transitionFunction.set(transition[0].name + "_" + transition[1], transition.slice(2, transition.length))
        }
    }
}

export default TuringMachine