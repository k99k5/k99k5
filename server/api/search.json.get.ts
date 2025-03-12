export default eventHandler(async (event) => {
    return queryCollection(event, 'posts').where({_type: 'markdown', navigation: {$ne: false}}).find()
})
