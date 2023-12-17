const { expect } = require('chai')
const { ethers } = require('hardhat')

const toWei = (num) => ethers.parseEther(num.toString())
const fromWei = (num) => ethers.formatEther(num)

describe('Contracts', () => {
  let contract, result
  const taxPct = 5
  const id = 1
  const cid = 1
  const name = 'My First Charity'
  const fullname = 'John Doe'
  const description = 'My First Ever Charity Reminicence'
  const profile = 'https://linkedIn.com'
  const image = 'https://imageurl.com'
  const amount = 1.5
  const donationAmt = 0.5
  const comment = 'You are brave, keep it up!'

  beforeEach(async () => {
    ;[deployer, owner, donor1, donor2] = await ethers.getSigners()
    contract = await ethers.deployContract('DappFund', [taxPct])
    await contract.waitForDeployment()
  })

  describe('Charity', () => {
    beforeEach(async () => {
      await contract
        .connect(owner)
        .createCharity(name, fullname, profile, description, image, toWei(amount))
    })

    describe('Success', () => {
      it('Should confirm charity creation', async () => {
        result = await contract.getCharities()
        expect(result).to.have.lengthOf(1)

        result = await contract.getCharity(id)
        expect(result.name).to.be.equal(name)
        expect(result.description).to.be.equal(description)
      })

      it('Should confirm charity update', async () => {
        result = await contract.getCharity(id)
        expect(result.name).to.be.equal(name)
        expect(result.amount).to.be.equal(toWei(amount))

        const newName = 'My Second Charity'
        const newAmount = 2.5
        await contract
          .connect(owner)
          .updateCharity(id, newName, fullname, profile, description, image, toWei(newAmount))

        result = await contract.getCharity(id)
        expect(result.name).to.be.equal(newName)
        expect(result.amount).to.be.equal(toWei(newAmount))
      })

      it('Should confirm charity deletion', async () => {
        result = await contract.getCharities()
        expect(result).to.have.lengthOf(1)

        result = await contract.getCharity(id)
        expect(result.deleted).to.be.equal(false)

        await contract.connect(owner).deleteCharity(id)

        result = await contract.getCharities()
        expect(result).to.have.lengthOf(0)

        result = await contract.getCharity(id)
        expect(result.deleted).to.be.equal(true)
      })

      it('Should confirm charity banning', async () => {
        result = await contract.getCharities()
        expect(result).to.have.lengthOf(1)

        result = await contract.getCharity(id)
        expect(result.banned).to.be.equal(false)

        await contract.toggleBan(id)

        result = await contract.getCharities()
        expect(result).to.have.lengthOf(0)

        result = await contract.getCharity(id)
        expect(result.banned).to.be.equal(true)
      })
    })

    describe('Failures', () => {
      it('Should confirm charity creation failures', async () => {
        await expect(
          contract
            .connect(owner)
            .createCharity('', fullname, profile, description, image, toWei(amount))
        ).to.be.revertedWith('Name cannot be empty')

        await expect(
          contract
            .connect(owner)
            .createCharity(name, fullname, profile, description, image, toWei(0))
        ).to.be.revertedWith('Amount cannot be zero')
      })

      it('Should confirm charity update failures', async () => {
        await expect(
          contract
            .connect(owner)
            .updateCharity(100, name, fullname, profile, description, image, toWei(amount))
        ).to.be.revertedWith('Charity Not Found')

        await expect(
          contract.updateCharity(id, name, fullname, profile, description, image, toWei(amount))
        ).to.be.revertedWith('Unauthorized Entity')
      })

      it('Should confirm charity banning failures', async () => {
        await expect(contract.connect(owner).toggleBan(id)).to.be.revertedWith(
          'Ownable: caller is not the owner'
        )
      })
    })
  })

  describe('Donation', () => {
    beforeEach(async () => {
      await contract
        .connect(owner)
        .createCharity(name, fullname, profile, description, image, toWei(amount))

      await contract.connect(donor1).donate(id, fullname, comment, {
        value: toWei(0.5),
      })
    })

    describe('Success', () => {
      it('Should confirm charity donations', async () => {
        result = await contract.getCharity(id)
        expect(fromWei(result.raised)).to.be.equal(donationAmt.toString())

        result = await contract.getSupports(id)
        expect(result).to.have.lengthOf(1)
      })

      it('Should confirm tax change', async () => {
        result = await contract.charityTax()
        expect(Number(result)).to.be.equal(taxPct)

        const newTaxPct = 7
        await contract.changeTax(newTaxPct)

        result = await contract.charityTax()
        expect(Number(result)).to.be.equal(newTaxPct)
      })
    })

    describe('Failures', () => {
      it('Should confirm charity donations failures', async () => {
        await expect(
          contract.connect(donor1).donate(100, fullname, comment, {
            value: toWei(amount),
          })
        ).to.be.revertedWith('Charity Not Found')

        await expect(
          contract.connect(donor1).donate(id, fullname, comment, {
            value: toWei(0),
          })
        ).to.be.revertedWith('Donation cannot be zero')

        await contract.connect(donor2).donate(id, fullname, comment, {
          value: toWei(amount),
        })

        await expect(
          contract.connect(donor1).donate(id, fullname, comment, {
            value: toWei(amount),
          })
        ).to.be.revertedWith('Charity budget fulfilled')
      })
    })
  })
})
