## The project authorization-system:

- User authentication and authorization using JWT tokens.
- Refresh tokens.
- Forgot password.
- Reset password.
- Sign in with base form.
- Sign up.
- Sign in with code.
- Validate form
- Protected page
  
## Configuration
server/.env : 

```shell
 MONGODB_URL="Your connection to MongoDB"
 PORT=5000
 TOKEN_ACCESS_SECRET=8hEnBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI=
 TOKEN_REFRESH_SECRET=8hEnPGeoBqGUT6zk4G95gW+uMdzp0xRI=
 TOKEN_RESET_PASSWORD_SECRET=8hEnPGeo4G95gW+ksxt4G95gW+uMdzp0xRI=
 SEND_GRID_API_KEY="Your key"
 SMTP_USER="Your email"
 SMTP_PASSWORD="Your password"
 API_URL=http://localhost:5000/api/v1
 CLIENT_URL=http://localhost:3000
 BASE_URL=http://localhost:5000
```

client/src/api/privateClient(publicClient):
```shell
 const baseURL = "http://localhost:5000//api/v1/"
```

## Building
client:
```shell
 cd client
 npm i
 npm start
```
server:
```shell
 cd server
 npm i
 npm start
```

# Resource
[Create React App](https://create-react-app.dev/)<br>
[Material UI](https://create-react-app.dev/)<br>
[React Toastify](https://github.com/fkhadra/react-toastify)<br>
[Mongoose](https://mongoosejs.com/)<br>
[ExpressJS](https://expressjs.com/)<br>
[React Router](https://reactrouter.com/)<br>
[Redux](https://redux.js.org/)<br>
[Formik](https://formik.org/)<br>
[Yup](https://github.com/jquense/yup/)<br>
[Axios](https://axios-http.com/)<br>
[JWT](https://github.com/auth0/node-jsonwebtoken)<br>
[Sendgrid](https://sendgrid.com/)<br>
[mui-otp-input](https://viclafouch.github.io/mui-otp-input/)<br>

# Preview

![TinyTake19-09-2023-02-15-02](https://github.com/roman-kalistratov/authorization-system/assets/80212286/a8c7228d-787a-4a15-b465-bf561e3af2b9)
![TinyTake19-09-2023-02-13-49](https://github.com/roman-kalistratov/authorization-system/assets/80212286/5c9773be-a5e4-42fe-94bf-ff3a03cabb04)
![TinyTake19-09-2023-02-11-36](https://github.com/roman-kalistratov/authorization-system/assets/80212286/933026b2-6273-415f-b402-ab31ea50ef32)
![TinyTake19-09-2023-02-14-36](https://github.com/roman-kalistratov/authorization-system/assets/80212286/f3d012c6-4552-4ae5-a586-1d29612429cc)


