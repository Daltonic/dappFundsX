export interface TruncateParams {
  text: string
  startChars: number
  endChars: number
  maxLength: number
}

export interface CharityStruct {
  id: number
  image: string
  fullname: string
  name: string
  description: string
  timestamp: number
  donations: number
  raised: number
  amount: number
  deleted: boolean
  owner: string
}

export interface SupportStruct {
  id: number
  cid: number
  name: string
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
}

export interface RootState {
  globalStates: GlobalState
}
