let IS_PROD = true

const server = IS_PROD ?
    "https://apnavideocall-1kfb.onrender.com":
    "http://localhost:8000";


export default server;