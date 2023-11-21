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
}

export interface GlobalState {
  charities: CharityStruct[]
  charity: CharityStruct | null
  deleteModal: string
  donorsModal: string
}

export interface RootState {
  globalStates: GlobalState
}
