

const path = require ('path');

const dashboard = (req, res) => {
    try {
        return res.status (200).render (path.resolve (__dirname, '..', 'views', 'layouts', 'index'));
    } catch (error) {

        return res.status (401).send ({
            status: 'failure',
            message: error.message
        })

    }
}

module.exports = {
    dashboard
}