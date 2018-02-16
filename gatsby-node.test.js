const { sourceNodes } = require('./gatsby-node')

jest.mock('@octokit/rest', () => () => ({
  authenticate: () => {},
  repos: {
    get: ({ owner, repo }) =>
      Promise.resolve({
        data: {
          custom: true,
          id: require('crypto')
            .createHash('md5')
            .update(repo.toString())
            .digest('hex')
        }
      })
  }
}))

jest.mock('js-yaml', () => ({
  safeLoad: () => ({
    'Category One': [{ github: 'project-one' }],
    'Category Two': [{ github: 'project-two' }],
    Talks: [{ name: 'Talk' }]
  })
}))

test('sourceNodes', async () => {
  const createNode = jest.fn()
  await sourceNodes({ boundActionCreators: { createNode } })
  expect(createNode.mock.calls).toMatchSnapshot()
})
