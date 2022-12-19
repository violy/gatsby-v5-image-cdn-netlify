import React from "react"
import {Link, graphql, PageProps} from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"

import Bio from "../components/bio"
import Layout from "../components/layout"

type BlogPostPageProps = PageProps & {
    data:Queries.BlogPostByIdQuery
}

const BlogPostTemplate = ({ data: { post } }:BlogPostPageProps) => {
    const featuredImage = {
        data: post?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
        alt: post?.featuredImage?.node?.altText || ``,
    }

    return (
        <Layout>
            <article
                className="blog-post"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    <h1 itemProp="headline">{parse(post?.title||'')}</h1>

                    <p>{post?.date}</p>

                    {/* if we have a featured image for this post let's display it */}
                    {featuredImage?.data && (
                        <GatsbyImage
                            image={featuredImage.data}
                            alt={featuredImage.alt}
                            style={{ marginBottom: 50 }}
                        />
                    )}
                </header>

                {!!post?.content && (
                    <section itemProp="articleBody">{parse(post.content)}</section>
                )}

                <hr />

                <footer>
                    <Bio />
                </footer>
            </article>

        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostById(
        $id: String!
    ) {
        post: wpPost(id: { eq: $id }) {
            id
            excerpt
            content
            title
            date(formatString: "MMMM DD, YYYY")
            featuredImage {
                node {
                    altText
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                                quality: 100
                                placeholder: TRACED_SVG
                                layout: FULL_WIDTH
                            )
                        }
                    }
                }
            }
        }
    }
`
