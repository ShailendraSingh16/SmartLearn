 SmartLearn
A learning management system where users can enroll in courses and learn.

Technologies Used
React.js
Node.js
MongoDB
Express
Run Locally
Clone the project

git clone https://github.com/ashish2675/smartLearn
Go to the project project directory

cd smartLearn
Install and Start Frontend Application
Go to the frontend directory and install dependecies

cd frontend
npm install
Create .env file with contents provided in .env.exmaple file

VITE_API_URL=http://localhost:5000/api/v1
Start the react app

npm run dev
Install and Start the Backend Application
Go to the backend directory and install dependecies

cd backend
npm install
configure a .env file with contents provided in .env.example

MONGO_URL=mongodb://0.0.0.0:27017/smartlearn
JWT_SECRET=yoursecret
Start the nodejs app

npm run dev
