import uuid from 'uuid/v1'

export default [
  {
    id: uuid(),
    name: 'CST001',
    users: [{
      name: `1 2 3 4
      2 3
      `,
      email: 'e_norzalovi@cu.edu.ge'
    }],
    createdAt: 1555016400000
  },
  {
    id: uuid(),
    name: 'CST021',
    users: [{
      name: 'james norzalovi',
      email: 'e_norzalovi@cu.edu.ge'
    }],
    createdAt: 1555016400000
  }
]
