export interface TruncateParams {
  text: string
  startChars: number
  endChars: number
  maxLength: number
}

export interface DonorParams {
  id?: number
  comment: string
  fullname: string
  amount: number | string
}

export interface CharityParams {
  id?: number
  name: string
  fullname: string
  profile: string
  amount: number | string
  description: string
  image: string
}

export interface CharityStruct {
  id: number
  image: string
  fullname: string
  name: string
  profile: string
  description: string
  timestamp: number
  donations: number
  raised: number
  amount: number
  owner: string
  deleted: boolean
  banned: boolean
}

export interface SupportStruct {
  id: number
  cid: number
  fullname: string
  amount: number
  timestamp: number
  comment: string
  supporter: string
}

export interface GlobalState {
  charities: CharityStruct[]
  charity: CharityStruct | null
  supports: SupportStruct[]
  deleteModal: string
  donorsModal: string
  supportModal: string
  banModal: string
  owner: string
}

export interface RootState {
  globalStates: GlobalState
}
