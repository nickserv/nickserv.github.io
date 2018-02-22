import React from 'react'
import links from '../../_data/links.yml'
import projects from '../../_data/projects.yml'
import '../../assets/style.scss'

export default ({ data: { allRepository: { edges } } }) => (
  <div>
    {/* Navigation */}
    <header className="nav-header">
      <div className="container">
        <ul className="list-horizontal">
          <li>
            <h1>Nick McCurdy</h1>
          </li>

          <li>
            {/* External icon links */}
            <nav>
              {links.map(link => (
                <a key={link.name} href={link.url} aria-label={link.name}>
                  <span className={`${link.icon} fa-fw`} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </li>
        </ul>

        {/* Category links */}
        <nav>
          <ul className="list-horizontal">
            {Object.keys(projects).map(category => (
              <li key={category}>
                <a href={`/#${category.toLowerCase()}`}>{category}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>

    {/* Content */}
    <main className="container">
      <h2>About</h2>

      <ul>
        <li>
          <a href="https://www.rit.edu/">Rochester Institute of Technology</a>{' '}
          graduate
        </li>
        <li>Software engineer</li>
        <li>Web developer</li>
        <li>Open source contributor</li>
      </ul>

      {/* Categorized project listing */}
      {Object.entries(projects).map(([category, projects]) => (
        <section key={category}>
          {/* Category */}
          <h2 id={category.toLowerCase()}>{category}</h2>

          {/* Get URL from the github, speakerdeck, or url field */}
          {projects.map(project => {
            let repository = {}
            let url

            if (project.github) {
              repository = edges
                .map(edge => edge.node)
                .find(repository => repository.name === project.github)
              url = repository.homepage || repository.html_url
            } else if (project.speakerdeck) {
              url = `https://speakerdeck.com/nickmccurdy/${project.speakerdeck}`
            } else {
              url = project.url
            }

            const name = project.name || repository.name
            const date = project.date
            const description = project.description || repository.description

            return (
              <article key={name}>
                <header>
                  {/* Name */}
                  <h3>
                    <a href={url}>{name}</a>
                  </h3>

                  {/* Date */}
                  {date && (
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(undefined, {
                        day: 'numeric',
                        month: 'long',
                        timeZone: 'UTC',
                        year: 'numeric'
                      })}
                    </time>
                  )}
                </header>

                {/* Description */}
                {description && <p>{description}</p>}
              </article>
            )
          })}
        </section>
      ))}
    </main>
  </div>
)

export const query = graphql`
  query Repositories {
    allRepository {
      edges {
        node {
          description
          homepage
          html_url
          name
        }
      }
    }
  }
`
