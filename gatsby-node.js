const crypto = require('crypto')
const dotenv = require('dotenv')
const fetch = require('node-fetch')
const fs = require('fs')
const { flatMap } = require('lodash')
const { promisify } = require('util')
const { safeLoad } = require('js-yaml')

const readFile = promisify(fs.readFile)

dotenv.config()

exports.sourceNodes = async ({ boundActionCreators: { createNode } }) => {
  const projects = await readFile('_data/projects.yml', 'utf8')

  const repositories = flatMap(safeLoad(projects), category =>
    category.filter(project => project.github).map(project => project.github)
  )

  return Promise.all(
    repositories.map(async repository => {
      const response = await fetch(
        `https://api.github.com/repos/nickmccurdy/${repository}`,
        {
          headers: {
            Authorization: `bearer ${process.env.GITHUB_TOKEN}`
          }
        }
      )
      const repositoryData = await response.json()

      createNode({
        ...repositoryData,
        id: repositoryData.id.toString(),
        parent: null,
        children: [],
        internal: {
          type: 'Repository',
          contentDigest: crypto
            .createHash('md5')
            .update(repositoryData.toString())
            .digest('hex')
        }
      })
    })
  )
}
