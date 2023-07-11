const rosRest = require('ros-rest');

const clientRosRest = rosRest({
    host: process.env.ROS_HOST_PROD,
    user: process.env.ROS_USER_PROD,
    password: process.env.ROS_PSWD_PROD,
    port: process.env.ROS_PORT_PROD,
    secure: false
});

module.exports = clientRosRest;