import React from "react"
import Layout from "../components/layout";
import {graphql, Link, PageProps} from "gatsby";


const IndexPage = ({data}:PageProps & {data:Queries.IndexPageQuery}) => {
    return (<Layout isHomePage={true}>
        <article>
            <header>All posts</header>
            <main>
                <ul>{data?.allWpPost?.nodes?.map(({slug,title},i)=>{
                    return <li key={i}><Link to={`/${slug}`}>{title||<code>{'<empty_title>'}</code>}</Link></li>
                })}</ul>
            </main>
        </article>
    </Layout>)
}

export default IndexPage

export const pageQuery = graphql`
query IndexPage {
  allWpPost {
    nodes {
      slug
      title
    }
  }
}`