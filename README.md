# dental-scheduling
Here's a detailed README for your project that documents the setup, development, and deployment processes for both the frontend and backend of the dental office scheduling application.

---

# Dental Office Scheduling Application

This repository contains the codebase for a dental office scheduling application, which includes a Node.js/Express backend and a React frontend. The application allows patients to book appointments with dentists, and it sends reminders to patients about their upcoming appointments.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Building and Deploying](#building-and-deploying)
- [Kubernetes Deployment](#kubernetes-deployment)
- [License](#license)

## Features

- **User Authentication:** Secure login and registration.
- **Appointment Scheduling:** Patients can book, view, update, and cancel appointments.
- **Email Notifications:** Automatic email reminders are sent to patients before their appointments.
- **Dentist Management:** Manage dentist profiles and availability.
- **Rate Limiting:** Prevents abuse of API endpoints.

## Technologies Used

- **Frontend:** React, React Router, Axios, Material-UI
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Nodemailer
- **Others:** Docker, Kubernetes, AWS ECR

## Prerequisites

- **Node.js** (v18.x recommended)
- **npm** (v8.x recommended)
- **Docker**
- **AWS CLI** (for ECR and EKS deployments)
- **Kubernetes CLI** (kubectl)

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/dental-office-scheduling.git
cd dental-office-scheduling
```

### 2. Install dependencies

#### Backend

```bash
cd dental-office-backend
npm install
```

#### Frontend

```bash
cd ../dental-office-frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the `dental-office-backend` directory with the following content:

```bash
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

# MongoDB URI
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=your_jwt_secret

# SMTP Configuration (Mailtrap)
SMTP_HOST=live.smtp.mailtrap.io
SMTP_PORT=587
SMTP_EMAIL=api
SMTP_PASSWORD=your_smtp_password

# Email Sender Information
FROM_NAME=DentistBooking
FROM_EMAIL=mailtrap@demomailtrap.com

# File Upload Configuration
FILE_UPLOAD_PATH=./public/uploads
MAX_FILE_UPLOAD=5000000

# Docker Image URI for Deployment (ECR)
DOCKER_IMAGE_URI=public.ecr.aws/d0h9x8j7/dental-booking
```

Replace `<username>`, `<password>`, and `<cluster-url>` with your MongoDB Atlas credentials.

## Running the Application

### 1. Start the Backend Server

```bash
cd dental-office-backend
npm run dev
```

The backend server will start on `http://localhost:5000`.

### 2. Start the Frontend Development Server

```bash
cd ../dental-office-frontend
npm start
```

The frontend development server will start on `http://localhost:3000`.

## Building and Deploying

### 1. Build the React App

```bash
cd dental-office-frontend
npm run build
```

This will create a `build` folder containing the production-ready React app.

### 2. Copy the Build to the Backend

```bash
cp -r build ../dental-office-backend/
```

### 3. Build the Docker Image

```bash
cd dental-office-backend
docker build -t dental-booking-backend .
```

### 4. Push the Docker Image to AWS ECR

```bash
docker tag dental-booking-backend:latest public.ecr.aws/d0h9x8j7/dental-booking:latest

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/d0h9x8j7

docker push public.ecr.aws/d0h9x8j7/dental-booking:latest
```

## Kubernetes Deployment

### 1. Create an EKS Cluster

First, ensure you have an EKS cluster. If you haven't set one up, you can use AWS CLI to create one:

```bash
aws eks create-cluster \
  --name dental-booking-cluster \
  --role-arn arn:aws:iam::<your_account_id>:role/EKSClusterRole \
  --resources-vpc-config subnetIds=subnet-XXXXXX,securityGroupIds=sg-XXXXXX
```

### 2. Deploy the Backend Service

Create a `deployment.yaml` file in the `dental-office-backend` directory:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: dental-booking-backend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: dental-booking-backend
  template:
    metadata:
      labels:
        app: dental-booking-backend
    spec:
      containers:
      - name: dental-booking-backend
        image: public.ecr.aws/d0h9x8j7/dental-booking:latest
        ports:
        - containerPort: 5000
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGO_URI
          valueFrom:
            secretKeyRef:
              name: mongo-uri-secret
              key: MONGO_URI
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: jwt-secret
              key: JWT_SECRET
        - name: SMTP_HOST
          valueFrom:
            secretKeyRef:
              name: smtp-host
              key: SMTP_HOST
        - name: SMTP_PORT
          valueFrom:
            secretKeyRef:
              name: smtp-port
              key: SMTP_PORT
        - name: SMTP_EMAIL
          valueFrom:
            secretKeyRef:
              name: smtp-email
              key: SMTP_EMAIL
        - name: SMTP_PASSWORD
          valueFrom:
            secretKeyRef:
              name: smtp-password
              key: SMTP_PASSWORD
```

Apply the deployment:

```bash
kubectl apply -f deployment.yaml
```

### 3. Expose the Service

Create a `service.yaml` file to expose the deployment:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: dental-booking-backend
spec:
  selector:
    app: dental-booking-backend
  ports:
    - protocol: TCP
      port: 5000
      targetPort: 5000
  type: LoadBalancer
```

Apply the service:

```bash
kubectl apply -f service.yaml
```

## License

This project is licensed under the MIT License.

---

This README should provide a comprehensive guide to setting up, running, and deploying your dental office scheduling application.