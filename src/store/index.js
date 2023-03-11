import React from "react"
import LoginStore from "./login.Store"
class RootStroe {
  constructor() {
    this.loginStore = new LoginStore()
  }

}
const StoreContext = React.createContext(new RootStroe())
const useStroe = () => React.useContext(StoreContext)
export { useStroe }