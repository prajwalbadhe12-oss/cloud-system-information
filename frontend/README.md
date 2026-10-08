# ⚛️ Cloud System Information Platform — Frontend

The frontend of the **Cloud System Information Platform** is a React-based dashboard built with Vite.

It connects to the Flask REST API and displays real-time application and container information in a clean dashboard interface.

The frontend was designed to provide a simple visual representation of the backend's cloud runtime information.

---

# 🚀 Features

- React-based dashboard
- Vite development environment
- REST API integration
- Live backend health status
- Application version display
- Container runtime display
- Environment display
- Operating system information
- Platform release
- CPU architecture
- Python version
- Hostname
- Containerized status
- Production build support
- Environment-based API configuration
- Responsive user interface

---

# 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Development/build tool |
| JavaScript | Application logic |
| CSS | Styling |
| Fetch API | Backend API communication |
| npm | Package management |

---

# 📁 Project Structure

```text
📁 frontend/
│
├── 📁 public/
│
├── 📁 src/
│   ├── 📁 assets/
│   ├── ⚛️ App.jsx
│   ├── 🎨 App.css
│   ├── 🎨 index.css
│   └── ⚛️ main.jsx
│
├── 📦 package.json
├── 📦 package-lock.json
├── ⚡ vite.config.js
└── 📄 .gitignore
```

---

# 🔗 Backend Integration

The frontend communicates with the Flask backend using the environment variable:

```text
VITE_API_BASE_URL
```

Example:

```text
VITE_API_BASE_URL=http://localhost:5000
```

For the AWS deployment:

```text
VITE_API_BASE_URL=http://<ECS-BACKEND-ENDPOINT>:5000
```

The frontend uses this base URL to request backend information.

---

# 🔌 API Integration

The dashboard consumes backend endpoints such as:

```text
GET /
GET /health
GET /info
GET /version
```

The `/info` endpoint provides the majority of the runtime information displayed by the dashboard.

---

# 📊 Dashboard Information

The dashboard displays information such as:

```text
API STATUS
VERSION
CONTAINER
ENVIRONMENT
PLATFORM
PLATFORM RELEASE
ARCHITECTURE
PYTHON VERSION
HOSTNAME
CONTAINERIZED
RUNTIME
```

Example production information:

```text
API STATUS       HEALTHY
VERSION          1.0.0
CONTAINER        DOCKER
ENVIRONMENT      PRODUCTION
PLATFORM         LINUX
ARCHITECTURE     x86_64
PYTHON VERSION   3.12.15
CONTAINERIZED    YES
RUNTIME          DOCKER
```

---

# 💻 Local Development

## 1. Navigate to Frontend

```powershell
cd frontend
```

---

## 2. Install Dependencies

```powershell
npm install
```

---

## 3. Configure Backend URL

Create:

```text
.env
```

Add:

```text
VITE_API_BASE_URL=http://localhost:5000
```

Make sure `.env` is not committed to Git.

---

## 4. Start Development Server

```powershell
npm run dev
```

Vite will provide a local development URL, normally similar to:

```text
http://localhost:5173
```

---

# 🌐 Connecting to AWS Backend

When the Flask backend is running on ECS Fargate, update the frontend environment configuration.

Example:

```text
VITE_API_BASE_URL=http://<ECS-ENDPOINT>:5000
```

Then restart the Vite development server.

The dashboard will request information from the deployed Flask API.

---

# 🏗️ Production Build

The application can be built using Vite.

Run:

```powershell
npm run build
```

The production files are generated in:

```text
dist/
```

Example successful build:

```text
vite building client environment for production...
✓ modules transformed
✓ built successfully
```

---

# 🔍 Preview Production Build

After building:

```powershell
npm run preview
```

This allows the production build to be tested locally before deployment.

---

# 📸 Frontend Screenshot

The main frontend screenshot is maintained in:

```text
../Screenshots/frontend/01-react-dashboard.png
```

The screenshot demonstrates the React dashboard connected to the backend API.

---

# 🔄 Frontend Application Flow

```text
User Opens React Dashboard
          ↓
React Application Loads
          ↓
API Base URL Read From Environment
          ↓
Request Sent To Flask API
          ↓
GET /info
          ↓
Backend Returns Runtime Information
          ↓
React Processes Response
          ↓
Dashboard Displays Cloud/Container Information
```

---

# 🔐 Environment Configuration

The frontend uses Vite environment variables.

Example:

```text
VITE_API_BASE_URL=http://localhost:5000
```

For AWS:

```text
VITE_API_BASE_URL=http://<ECS-ENDPOINT>:5000
```

Environment files should not contain sensitive credentials.

The project `.gitignore` excludes:

```text
.env
```

---

# 📦 NPM Commands

### Install dependencies

```powershell
npm install
```

### Start development server

```powershell
npm run dev
```

### Build production application

```powershell
npm run build
```

### Preview production build

```powershell
npm run preview
```

---

# 🧪 Frontend Validation

The frontend was validated by:

```text
✅ React application starts successfully
✅ Dashboard loads successfully
✅ Backend API connection verified
✅ AWS backend data displayed
✅ Production build successful
```

---

# ☁️ Deployment Architecture

The current project architecture is:

```text
┌──────────────────────┐
│    React Frontend    │
│      Vite App        │
└──────────┬───────────┘
           │
           │ REST API
           ▼
┌──────────────────────┐
│     Flask Backend    │
│     Gunicorn         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Docker Container  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│    Amazon ECS        │
│      Fargate         │
└──────────────────────┘
```

---

# ⚠️ Current Deployment Limitation

The current demonstration frontend connects directly to the ECS task endpoint.

A Fargate task's public IP can change when ECS replaces the task.

Therefore, a permanent production frontend should use a stable backend endpoint.

Recommended future architecture:

```text
React Frontend
      ↓
Application Load Balancer
      ↓
Amazon ECS Fargate
      ↓
Flask Container
```

---

# 🚀 Future Enhancements

- Host frontend using Amazon S3
- Add Amazon CloudFront
- Add custom domain using Route 53
- Add HTTPS using AWS Certificate Manager
- Add Application Load Balancer
- Add frontend authentication
- Add advanced monitoring
- Add error tracking
- Add automated CI/CD
- Add responsive mobile enhancements

---

# 📋 Frontend Validation Checklist

```text
✅ React application
✅ Vite configuration
✅ Responsive dashboard
✅ REST API integration
✅ Environment-based API URL
✅ AWS backend integration
✅ Live system information
✅ Production build
✅ Git integration
```

---

# 📌 Frontend Status

**Status:** ✅ Completed

**Framework:** React

**Build Tool:** Vite

**Language:** JavaScript

**Styling:** CSS

**Backend:** Flask REST API

**Cloud Backend:** Amazon ECS Fargate

**Production Build:** Verified