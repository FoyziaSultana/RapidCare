const app = require ("./app");
const config = require ("./config/serverport");
const PORT = config.app.port;
require("./config/dbconnect");

app.listen(PORT, ()=>
{
    console.log(`Server is running at at http://localhost:${PORT}`);
});
