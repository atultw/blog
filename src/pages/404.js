import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh"}}>
        <StaticImage src="../images/undraw_not_found_60pq.svg" style={{width: "20vw"}}></StaticImage>
        <h2>Not Found</h2>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
