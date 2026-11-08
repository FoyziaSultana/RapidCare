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
const bedRouter = require("./routes/bedRouter");
const medicalResourceRouter = require("./routes/medicalResourceRouter");
const hospitalCardRouter = require("./routes/hospitalCardRouter");
const ambulanceRouter = require("./routes/ambulanceRouter");
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
app.use("/bed", bedRouter);
app.use("/medicalResource", medicalResourceRouter);
app.use("/hospital", hospitalCardRouter);
app.use("/ambulance", ambulanceRouter);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "RapidCare API is running"
    });
});







module.exports = app;
