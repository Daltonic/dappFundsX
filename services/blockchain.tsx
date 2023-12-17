import { ethers } from 'ethers'
import address from '@/contracts/contractAddress.json'
import dappFundAbi from '@/artifacts/contracts/DappFund.sol/DappFund.json'
import { globalActions } from '@/store/globalSlices'
import { store } from '@/store'
import { CharityParams, CharityStruct, DonorParams, SupportStruct } from '@/utils/type.dt'

const toWei = (num: number) => ethers.parseEther(num.toString())
const fromWei = (num: number) => ethers.formatEther(num)
const { setSupports, setCharity } = globalActions

let ethereum: any
let tx: any

if (typeof window !== 'undefined') ethereum = (window as any).ethereum

const getEthereumContracts = async () => {
  const accounts = await ethereum?.request?.({ method: 'eth_accounts' })

  if (accounts?.length > 0) {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    const contracts = new ethers.Contract(address.dappFundContract, dappFundAbi.abi, signer)

    return contracts
  } else {
    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
    const wallet = ethers.Wallet.createRandom()
    const signer = wallet.connect(provider)
    const contracts = new ethers.Contract(address.dappFundContract, dappFundAbi.abi, signer)

    return contracts
  }
}

const getAdmin = async (): Promise<string> => {
  const contract = await getEthereumContracts()
  const owner = await contract.owner()
  return owner
}

const getCharities = async (): Promise<CharityStruct[]> => {
  const contract = await getEthereumContracts()
  const charities = await contract.getCharities()
  return structuredCharities(charities)
}

const getMyCharities = async (): Promise<CharityStruct[]> => {
  const contract = await getEthereumContracts()
  const charities = await contract.getMyCharities()
  return structuredCharities(charities)
}

const getCharity = async (id: number): Promise<CharityStruct> => {
  const contract = await getEthereumContracts()
  const charity = await contract.getCharity(id)
  return structuredCharities([charity])[0]
}

const getSupporters = async (id: number): Promise<SupportStruct[]> => {
  const contract = await getEthereumContracts()
  const supporters = await contract.getSupports(id)
  return structuredSupporters(supporters)
}

const createCharity = async (charity: CharityParams): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.createCharity(
      charity.name,
      charity.fullname,
      charity.profile,
      charity.description,
      charity.image,
      toWei(Number(charity.amount))
    )
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const updateCharity = async (charity: CharityParams): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.updateCharity(
      charity.id,
      charity.name,
      charity.fullname,
      charity.profile,
      charity.description,
      charity.image,
      toWei(Number(charity.amount))
    )
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const makeDonation = async (donor: DonorParams): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.donate(donor.id, donor.fullname, donor.comment, {
      value: toWei(Number(donor.amount)),
    })
    await tx.wait()

    const supports = await getSupporters(Number(donor.id))
    store.dispatch(setSupports(supports))

    const charity = await getCharity(Number(donor.id))
    store.dispatch(setCharity(charity))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const deleteCharity = async (id: number): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.deleteCharity(id)
    await tx.wait()

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const banCharity = async (id: number): Promise<void> => {
  if (!ethereum) {
    reportError('Please install a browser provider')
    return Promise.reject(new Error('Browser provider not installed'))
  }

  try {
    const contract = await getEthereumContracts()
    tx = await contract.toggleBan(id)
    await tx.wait()

    const charity = await getCharity(Number(id))
    store.dispatch(setCharity(charity))

    return Promise.resolve(tx)
  } catch (error) {
    reportError(error)
    return Promise.reject(error)
  }
}

const structuredCharities = (charities: CharityStruct[]): CharityStruct[] =>
  charities
    .map((charity) => ({
      id: Number(charity.id),
      name: charity.name,
      fullname: charity.fullname,
      image: charity.image,
      profile: charity.profile,
      donations: Number(charity.donations),
      raised: parseFloat(fromWei(charity.raised)),
      amount: parseFloat(fromWei(charity.amount)),
      owner: charity.owner,
      description: charity.description,
      timestamp: Number(charity.timestamp),
      deleted: charity.deleted,
      banned: charity.banned,
    }))
    .sort((a, b) => b.timestamp - a.timestamp)

const structuredSupporters = (supports: SupportStruct[]): SupportStruct[] =>
  supports
    .map((support) => ({
      id: Number(support.id),
      cid: Number(support.cid),
      fullname: support.fullname,
      amount: parseFloat(fromWei(support.amount)),
      supporter: support.supporter,
      comment: support.comment,
      timestamp: Number(support.timestamp),
    }))
    .sort((a, b) => b.timestamp - a.timestamp)

export {
  getCharities,
  getCharity,
  getMyCharities,
  getSupporters,
  createCharity,
  updateCharity,
  makeDonation,
  deleteCharity,
  banCharity,
  getAdmin,
}
