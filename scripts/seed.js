const { faker } = require('@faker-js/faker')
const { ethers } = require('hardhat')
const fs = require('fs')

const toWei = (num) => ethers.parseEther(num.toString())
const charitiesCount = 1

const generateCharities = (count) => {
  const charities = []

  for (let i = 0; i < count; i++) {
    const charity = {
      id: i + 1,
      fullname: faker.word.words(2),
      name: faker.word.words(5),
      profile: faker.internet.url(),
      image: faker.image.urlPicsumPhotos(),
      description: faker.lorem.paragraph(),
      timestamp: faker.date.past().getTime(),
      deleted: faker.datatype.boolean(),
      banned: faker.datatype.boolean(),
      donations: faker.number.int({ min: 1, max: 100 }),
      raised: faker.number.float({ min: 10, max: 15 }),
      amount: faker.number.float({ min: 10, max: 20 }),
      owner: faker.string.hexadecimal({
        length: { min: 42, max: 42 },
        prefix: '0x',
      }),
    }
    charities.push(charity)
  }

  return charities
}

const generateSupports = (count) => {
  const supports = []

  for (let i = 0; i < count; i++) {
    const support = {
      id: i + 1,
      cid: faker.number.int({ min: 1, max: 100 }),
      fullname: faker.datatype.boolean() ? faker.person.firstName() : '',
      comment: faker.lorem.paragraph(),
      timestamp: faker.date.past().getTime(),
      amount: faker.number.float({ min: 0.01, max: 4 }),
      supporter: faker.string.hexadecimal({
        length: { min: 42, max: 42 },
        prefix: '0x',
      }),
    }
    supports.push(support)
  }

  return supports
}

async function createCharity(contract, charity) {
  const tx = await contract.createCharity(
    charity.name,
    charity.fullname,
    charity.profile,
    charity.description,
    charity.image,
    toWei(charity.amount)
  )
  await tx.wait()
}

async function makeDonations(contract, id, donation) {
  const tx = await contract.donate(id, donation.fullname, donation.comment, {
    value: toWei(donation.amount),
  })
  await tx.wait()
}

async function getCharities(contract) {
  const result = await contract.getCharities()
  console.log('Charities:', result)
}

async function getSupports(contract, id) {
  const result = await contract.getSupports(id)
  console.log('Supports:', result)
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
  let dappFundContract

  try {
    const contractAddresses = fs.readFileSync('./contracts/contractAddress.json', 'utf8')
    const { dappFundContract: dappFundAddress } = JSON.parse(contractAddresses)

    dappFundContract = await ethers.getContractAt('DappFund', dappFundAddress)

    // Process #1
    await Promise.all(
      generateCharities(charitiesCount).map(async (charity) => {
        await createCharity(dappFundContract, charity)
      })
    )

    await delay(2500) // Wait for 2.5 seconds

    // Process #2
    await Promise.all(
      Array(charitiesCount)
        .fill()
        .map(async (_, i) => {
          const randomCount = faker.number.int({ min: 1, max: 2 })
          const supports = generateSupports(randomCount)

          await Promise.all(
            supports.map(async (donation, i) => {
              await makeDonations(dappFundContract, i + 1, donation, {
                value: toWei(donation.amount),
              })
            })
          )
        })
    )

    await delay(2500) // Wait for 2.5 seconds

    // Process #3
    await getCharities(dappFundContract)
    await getSupports(dappFundContract, 1)
  } catch (error) {
    console.error('Unhandled error:', error)
  }
}

main().catch((error) => {
  console.error('Unhandled error:', error)
  process.exitCode = 1
})
