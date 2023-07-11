const rosRest = require('ros-rest');

const clientRosRest = rosRest({
    host: process.env.ROS_HOST_LOCAL,
    user: process.env.ROS_USER_LOCAL,
    password: process.env.ROS_PSWD_LOCAL,
    port: process.env.ROS_PORT_LOCAL,
    secure: false
});

module.exports = clientRosRest;