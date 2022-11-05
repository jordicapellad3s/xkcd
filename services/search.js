import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch('5SRXZCIHYT', '8d9541c90b2c962b637f4e0f637ea477')
const index = client.initIndex('prod_comics')

export const search = async ({ query }) => {
  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10
  })

  return { results: hits }
}
