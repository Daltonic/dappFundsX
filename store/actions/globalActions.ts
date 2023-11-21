import { CharityStruct, GlobalState } from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const globalActions = {
  setCharities: (state: GlobalState, action: PayloadAction<CharityStruct[]>) => {
    state.charities = action.payload
  },
  setCharity: (state: GlobalState, action: PayloadAction<CharityStruct | null>) => {
    state.charity = action.payload
  },
  setDeleteModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.deleteModal = action.payload
  },
  setDonorModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.donorsModal = action.payload
  },
}
