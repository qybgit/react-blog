import { http } from "@/utils"
import { makeAutoObservable } from "mobx"
class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable()
  }

}