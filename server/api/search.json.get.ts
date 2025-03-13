export default eventHandler(async (event) => {
    return queryCollection(event, 'posts').all()
})
