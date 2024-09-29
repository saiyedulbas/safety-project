export interface SingleUser {
    data: UserData
    support: Support
  }
  
  export interface UserData {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }
  
  export interface Support {
    url: string
    text: string
  }
  export interface SingleUserNotFOund {}
