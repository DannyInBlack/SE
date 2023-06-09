

let _user = null;

function _isAuth(){

  if(_user == null) {
    return false;
  }
  else return true;

}

function _setUser(val){
  _user = val
}

export { _isAuth as isAuth };
export { _setUser as setUser };