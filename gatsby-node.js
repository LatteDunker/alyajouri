/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { resolve } = require('path');
const path = require('path');

// ===================================================================================
// Query data for first 3 blog posts, pass data to blog-post.js template to create page
// ===================================================================================

exports.createPages = async ({graphql, actions}) => {
    const { createPage } = actions
    const blogPostTemplate = await path.resolve('src/templates/blog-post.js');

    const result = await graphql(`
        query {
            allStrapiBlogPosts(sort: {fields: date, order: DESC}, limit: 3) {
                nodes {
                    title
                    author
                    content
                    id
                    strapiId
                    tags {
                        id
                        tag_name
                    }
                    date(formatString: "MMMM, Do, YYYY")
                    slug
                }
            }
        }
        `)
        console.log(result.data.allStrapiBlogPosts.nodes)

    if (result.errors) {
            reporter.panicOnBuild(`Error while running GraphQL query.`)
            return
    }
    
   await result.data.allStrapiBlogPosts.nodes.forEach( (post) => {
        createPage ({
            path: `/blog/${post.slug}`,
            component: blogPostTemplate,
            context: {
                slug: post.slug,
            },
        })
    })
}

