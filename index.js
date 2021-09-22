const server = require("./api/server");
const { PORT } = require("./config.js");

server.listen(PORT, () => {
    console.log(`Listening in localhost:${PORT}`);
});
