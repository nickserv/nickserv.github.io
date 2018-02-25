global.graphql = () => {}

const Index = require('.').default
const React = require('react')
const renderer = require('react-test-renderer')

jest.mock('../../_data/links.yml', () => [
  { name: 'One', url: 'example.com/one', icon: 'one' },
  { name: 'Two', url: 'example.com/two', icon: 'two' }
])

jest.mock('../../_data/projects.yml', () => ({
  'Category One': [{ github: 'project-one' }],
  'Category Two': [{ github: 'project-two' }],
  'Category Three': [
    {
      description: 'Project Three',
      name: 'project-three',
      url: 'example.com/three'
    }
  ],
  Talks: [{ date: '1970-01-01', name: 'Talk', speakerdeck: 'test' }]
}))

const data = {
  allRepository: {
    edges: [
      {
        node: {
          description: 'Project One',
          homepage: 'example.com/one',
          html_url: 'github.com/ghost/one',
          name: 'project-one'
        }
      },
      {
        node: {
          description: 'Project Two',
          html_url: 'github.com/ghost/two',
          name: 'project-two'
        }
      }
    ]
  }
}

test('Index', () =>
  expect(renderer.create(<Index data={data} />)).toMatchSnapshot())