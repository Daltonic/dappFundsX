import { CharityStruct, GlobalState, SupportStruct } from '@/utils/type.dt'
import { PayloadAction } from '@reduxjs/toolkit'

export const globalActions = {
  setCharities: (state: GlobalState, action: PayloadAction<CharityStruct[]>) => {
    state.charities = action.payload
  },
  setCharity: (state: GlobalState, action: PayloadAction<CharityStruct | null>) => {
    state.charity = action.payload
  },
  setSupports: (state: GlobalState, action: PayloadAction<SupportStruct[]>) => {
    state.supports = action.payload
  },
  setDeleteModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.deleteModal = action.payload
  },
  setDonorModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.donorsModal = action.payload
  },
  setSupportModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.supportModal = action.payload
  },
  setBanModal: (state: GlobalState, action: PayloadAction<string>) => {
    state.banModal = action.payload
  },
  setOwner: (state: GlobalState, action: PayloadAction<string>) => {
    state.owner = action.payload
  },
}
