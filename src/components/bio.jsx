/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  return (
    <div style={{ display: "grid" }}>
      <div
        style={{
          gridColumnStart: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StaticImage
          src="../images/profile-pic.jpg"
          width={50}
          height={50}
          style={{ height: "50px", width: "50px", display: "block" }}
        />
      </div>
      <div style={{ gridColumnStart: 2 }}>
        <p style={{ padding: "10px" }}>
          {author?.summary}
          <a href="https://github.com/atultw">@atultw</a>
        </p>
      </div>
    </div>
  )
}

export default Bio
