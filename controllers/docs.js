

const docs = (req, res) => {
    try {

        return res.status (200).redirect ('/') // TODO - PUBLISH THE API DOCS AND GIVE THE URL HERE TO REDIRECT USERS TO SEE DOCS

    } catch (error) {

        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })
    }

}

module.exports = {
    docs
}