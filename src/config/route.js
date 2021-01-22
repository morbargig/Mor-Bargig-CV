// check if the app start in localhost or in heroku
let route = `https://localhost:${process.env.REACT_APP_SERVER_PORT || process.env.PORT}/`
if (process.env.NODE_ENV === "production") {
    debugger
    route = '/'
}

export default route