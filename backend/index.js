
const app = require("./app");
const config = require("./config/serverport");
const dbconnect = require("./config/dbconnect");

const PORT = config.app.port;

const startServer = async () => {
    try {
        await dbconnect();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
    }
};

startServer();
