import { faker } from '@faker-js/faker'
import { CharityStruct, SupportStruct } from './type.dt'

export const generateCharities = (count: number): CharityStruct[] => {
  const charities: CharityStruct[] = []

  for (let i = 0; i < count; i++) {
    const charity: CharityStruct = {
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

export const generateSupports = (count: number): SupportStruct[] => {
  const supports: SupportStruct[] = []

  for (let i = 0; i < count; i++) {
    const support: SupportStruct = {
      id: i + 1,
      cid: faker.number.int({ min: 1, max: 100 }),
      fullname: faker.person.firstName(),
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
