// require express
const express = require("express");
const cors = require("cors");
// app create
const app = express();

const bodyParser = require('body-parser');

// create path
const path = require("path");

const AuthRouter = require('./routes/authRouter');
const permissionRouter = require('./routes/permissionRouter');
const roleRouter = require("./routes/roleRouter");
const rolesAssignToUser = require("./routes/userRoleAssignRouter");
const getUserAllPermissionRouter = require("./routes/getUserAllPermissionRoute");
const dashboardRouter = require('./routes/dashboardRoute');
const adminGetAllHospitalRouter = require("./routes/getAllHospitalRoute(Admin)");

//use json
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use('/auth', AuthRouter);
app.use('/permission', permissionRouter);
app.use('/role', roleRouter);
app.use('/user', rolesAssignToUser);
app.use('/userPermission', getUserAllPermissionRouter);
app.use('/dashboard', dashboardRouter);
app.use('/dashboard', adminGetAllHospitalRouter);


app.use(express.static(
    path.join(__dirname, "../frontend/dist")
));
app.get("/{*splat}", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/dist/index.html")
    );
});





module.exports = app;