import { setUser, isAuth } from "../auth/Auth.js"

function Login(){

  setUser(true)

  return (
    <button className="submit" > Navigate to main page</button>
  )
}

export default Login