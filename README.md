# WhosNext

This repository contains a Node.js/Express server application that uses MongoDB and Cloudinary.  
Follow the steps below to set up your development environment.

## 1. Clone the repository

```bash
git clone <repository_url>
cd WhosNext/server
```

## 2. Install dependencies

```bash
npm install
```

## 3. Create a `.env` file

In the `server` directory, create a `.env` file with the following variables:

```properties
PORT=3000

# MongoDB Atlas connection string
MONGO_URI=<Your MongoDB connection string>

# JWT secret key
JWT_SECRET=<A random secret key>

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=<Your Cloudinary cloud name>
CLOUDINARY_API_KEY=<Your Cloudinary API key>
CLOUDINARY_API_SECRET=<Your Cloudinary API secret>
```

**Example:**

```properties
PORT=3000
MONGO_URI=mongodb+srv://07211816:NrusLM09xWo8OjzT@cluster0.hxwl8hn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=incremental_progress

CLOUDINARY_CLOUD_NAME=datadgjo1
CLOUDINARY_API_KEY=332934745469552
CLOUDINARY_API_SECRET=ML0BQVBQv508Sdb50SjDndL6_dg

```

## 4. Start the server

```bash
npm start
```

Your application will now be running at `http://localhost:3000`.
