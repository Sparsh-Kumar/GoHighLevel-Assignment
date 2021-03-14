

const docs = (req, res) => {
    try {

        return res.status (200).redirect ('https://documenter.getpostman.com/view/11784786/Tz5qawy9');

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