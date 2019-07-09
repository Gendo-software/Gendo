import { EventEmitter } from "events";

const events = {    
  onLoginSuccess: "onLoginSuccess"
}

export default class AuthEvents {    
  constructor() {
    this._ee = new EventEmitter();    
  }
    
  addLoginSuccess(cb){
    this._ee.on(events.onLoginSuccess, cb);
  }

  removeLoginSuccess(cb){
    this._ee.off(events.onLoginSuccess, cb);
  }
  
  emitLoginSuccess(authResults){
    this._ee.emit(events.onLoginSuccess, authResults);
  }
};
