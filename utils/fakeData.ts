import { faker } from '@faker-js/faker'
import { CharityStruct } from './type.dt'

export const generateCharities = (count: number): CharityStruct[] => {
  const charities: CharityStruct[] = []

  for (let i = 0; i < count; i++) {
    const charity: CharityStruct = {
      id: i + 1,
      fullname: faker.word.words(2),
      name: faker.word.words(5),
      image: faker.image.urlPicsumPhotos(),
      description: faker.lorem.paragraph(),
      timestamp: Date.now(),
      deleted: faker.datatype.boolean(),
      donations: faker.number.int({ min: 1, max: 100 }),
      raised: faker.number.float({ min: 10, max: 20 }),
      amount: faker.number.float({ min: 1, max: 20 }),
    }
    charities.push(charity)
  }

  return charities
}
