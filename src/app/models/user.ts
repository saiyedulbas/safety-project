export type fullUserArray = UserInfo[]
export interface UserGetResponseModel {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: UserInfo[]
    support: Funding
  }
  
  export interface UserInfo {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }
  
  export interface Funding {
    url: string
    text: string
  }
  