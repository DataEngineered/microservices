const clientRosRest = require('../services/radius-services');
// const clientRosRest = require('../services/radius-services-local');

exports.createNewPPPoEAccount = async (req, res) => {
    try {
        const {name, password, group} = req.body
        const userAdded = await clientRosRest.add('/user-manager/user', {
            name: name,
            password: password,
            group: group
        });
        res.send({
            message: 'Success',
            data: userAdded.data
        })
    } catch (err) {
        console.log(err);
        res.send({
            message: err
        })
    }
}

exports.customerPPPOEIsolir = async (req, res) => {
    try {
        const {personal_id} = req.query
        let query = '/user-manager/user';
        if(personal_id){
            query += `/${personal_id}`
        }

        const userIsolired = await clientRosRest.set(query, {
            group: 'ISOLIR'
        });

        res.send({
            status: 'User has been updated',
            data: userIsolired.data
        });

    } catch (err) {
        res.status(500).send({error: err.message});
    }
}