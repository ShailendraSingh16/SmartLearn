 # SmartLearn

A learning management system where users can enroll in courses and learn.

## Technologies Used

- React.js
- Node.js
- MongoDB
- Express

## Run Locally

Clone the project

```bash
git clone https://github.com/ashish2675/smartLearn
```

Go to the project project directory

```bash
cd smartLearn
```

#### Install and Start Frontend Application

Go to the frontend directory and install dependecies

```bash
cd frontend
npm install
```

Create .env file with contents provided in **.env.exmaple** file

```
VITE_API_URL=http://localhost:5000/api/v1
```

Start the react app

```bash
npm run dev
```

#### Install and Start the Backend Application

Go to the backend directory and install dependecies

```bash
cd backend
npm install
```

configure a .env file with contents provided in **.env.example**

```
MONGO_URL=mongodb://0.0.0.0:27017/smartlearn
JWT_SECRET=yoursecret
```

Start the nodejs app

```
npm run dev
```

## Demo

![Demo](https://github.com/ashish2675/smartLearn/blob/main/frontend/public/ss.png?raw=true)

Link: [live application](https://smart-learn-alpha.vercel.app/)
