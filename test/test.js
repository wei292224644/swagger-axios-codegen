const { codegen } = require("../dist/index");

const path = require("path");
const fs = require("fs");


const SWAGGER_API_PATH = "https://adhoc-test-pg-main.uality.cn/openApi"

const main = async () => {
    await codegen({
        methodNameMode: "path",
        remoteUrl: SWAGGER_API_PATH,
        // include: [
        //     "EmwModelRepo*",
        //     "UalityAccount",
        //     "UalityAuth",
        //     "UalityJobCenterJobMonitor"
        // ]
    })
}

main();