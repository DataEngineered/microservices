const clientRosRest = require('../services/radius-services');

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