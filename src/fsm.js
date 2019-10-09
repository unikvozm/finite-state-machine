class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    //throws an exception if config isn't passed
    if (!config) throw new Error("There's no config");
    // sets params from config
    this.initial = config.initial;
    this.current = config.initial;
    this.states = config.states;
    //for undo() and redo()
    this.previous = false;
    this.next = false;
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.current;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    //throws an exception if state isn't exist
    if (!this.states[state]) throw new Error("This state doesn't exist");
    this.previous = this.current;
    this.current = state;
    //return this.current;
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    // throws an exception if event in current state isn't exist
    if (!this.states[this.current].transitions[event]) throw new Error("This event doesn't exist");
    this.previous = this.current;
    this.current = this.states[this.current].transitions[event];
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.current = this.initial;
    this.previous = false;
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    if (!event) return Object.keys(this.states);
    let allStates = [];
    Object.keys(this.states).forEach(state => {
      if (this.states[state].transitions[event]) allStates.push(state);
    });
    return allStates;
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
      if (this.previous === false) return false;
      this.next = this.current;
      this.current = this.previous;
      this.previous = false;
      return true;
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    if (this.next === false) return false;
    this.previous = this.current;
    this.current = this.next;
    this.next = false;
    return true;
  }

  /**
   * Clears transition history
   */
  clearHistory() {
      this.previous = false;
      this.next = false;
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
