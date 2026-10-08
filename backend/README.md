# 🐍 Cloud System API — Backend

The backend of the **Cloud System Information Platform** is a modular Flask REST API designed to expose application, system, and container runtime information.

The application is containerized using Docker and deployed to **Amazon ECS Fargate**. It uses Gunicorn as the production WSGI server, Pytest for automated testing, and CloudWatch for centralized logging.

---

## 🚀 Features

- Flask REST API
- Modular application structure
- Health monitoring endpoint
- Runtime/system information endpoint
- Application version endpoint
- Docker container detection
- Environment-based configuration
- CORS support
- Gunicorn production server
- Docker health check
- Non-root Docker container
- Automated Pytest tests
- Amazon ECR deployment
- Amazon ECS Fargate deployment
- CloudWatch logging

---

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| Python 3.12 | Application runtime |
| Flask | REST API framework |
| Gunicorn | Production WSGI server |
| Flask-CORS | Cross-origin API access |
| python-dotenv | Environment configuration |
| Pytest | Automated testing |
| Docker | Containerization |
| Amazon ECR | Container image registry |
| Amazon ECS | Container orchestration |
| AWS Fargate | Serverless container compute |
| Amazon CloudWatch | Container logging |

---

## 📁 Project Structure

```text
📁 backend/
│
├── 📁 app/
│   ├── 📁 routes/
│   │   ├── 🐍 __init__.py
│   │   ├── ❤️ health.py
│   │   └── ⚙️ system.py
│   │
│   ├── 📁 services/
│   │   └── ⚙️ system_info.py
│   │
│   ├── 🐍 __init__.py
│   └── ⚙️ config.py
│
├── 📁 tests/
│   └── 🧪 test_api.py
│
├── 🐳 Dockerfile
├── 📄 .dockerignore
├── ⚙️ .env.example
├── 📄 .gitignore
├── ⚙️ pytest.ini
├── 📦 requirements.txt
└── 🐍 run.py
```

---

# 🔌 API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Application status |
| `/health` | GET | Application health |
| `/info` | GET | System/container information |
| `/version` | GET | Application version |

---

## `GET /`

Returns the current application status.

Example:

```json
{
  "message": "Cloud System API is running",
  "application": "Cloud System API",
  "version": "1.0.0",
  "status": "running"
}
```

---

## `GET /health`

Used for application and container health monitoring.

Example:

```json
{
  "status": "healthy",
  "application": "Cloud System API"
}
```

---

## `GET /info`

Returns application and runtime information.

Example:

```json
{
  "application": "Cloud System API",
  "version": "1.0.0",
  "environment": "production",
  "containerized": true,
  "container_runtime": "Docker",
  "hostname": "ecs-task-hostname",
  "platform": "Linux",
  "architecture": "x86_64",
  "python_version": "3.12.15"
}
```

The endpoint detects whether the application is running inside a container.

---

## `GET /version`

Returns the current application version.

Example:

```json
{
  "version": "1.0.0"
}
```

---

# ⚙️ Configuration

The application uses environment variables for configuration.

Example `.env`:

```text
APP_NAME=Cloud System API
APP_VERSION=1.0.0
ENVIRONMENT=development
HOST=0.0.0.0
PORT=5000
CONTAINERIZED=false
```

For the Docker production environment:

```text
APP_NAME=Cloud System API
APP_VERSION=1.0.0
ENVIRONMENT=production
HOST=0.0.0.0
PORT=5000
CONTAINERIZED=true
```

---

# 💻 Local Development

## 1. Create Virtual Environment

From the backend directory:

```powershell
python -m venv venv
```

Activate:

```powershell
.\venv\Scripts\Activate.ps1
```

---

## 2. Install Dependencies

```powershell
pip install -r requirements.txt
```

---

## 3. Run Tests

```powershell
pytest
```

Expected result:

```text
5 passed
```

---

## 4. Start Flask Application

```powershell
python run.py
```

The API will be available at:

```text
http://localhost:5000
```

---

# 🧪 Testing

The backend contains automated tests using Pytest.

Tests cover:

- Home endpoint
- Health endpoint
- System information endpoint
- Version endpoint
- Unknown route handling

Run:

```powershell
pytest
```

Current verified result:

```text
5 passed
```

---

# 🐳 Docker

The backend is containerized using Docker.

The Docker image uses:

```text
python:3.12-slim
```

The production application server is:

```text
Gunicorn
```

The container listens on:

```text
5000
```

---

## Build Docker Image

```powershell
docker build -t cloud-system-api:1.0.0 .
```

---

## Run Docker Container

```powershell
docker run -d --name cloud-system-api -p 5000:5000 cloud-system-api:1.0.0
```

---

## Check Running Container

```powershell
docker ps
```

---

## Test Container

```powershell
curl.exe http://localhost:5000/health
```

```powershell
curl.exe http://localhost:5000/info
```

---

# ❤️ Docker Health Check

The Dockerfile contains an application-level health check.

The container verifies:

```text
http://127.0.0.1:5000/health
```

This allows Docker and ECS to determine whether the application is responding correctly.

---

# 🔐 Container Security

The Docker image follows basic container security practices.

### Non-root user

The application runs using a dedicated Linux user instead of root.

### Slim base image

The application uses:

```text
python:3.12-slim
```

to reduce unnecessary image contents.

### Environment isolation

Environment files are excluded from the Docker image.

### `.dockerignore`

Development files such as:

```text
venv/
__pycache__/
.git/
.env
tests/
```

are excluded from the Docker build context.

---

# 🚀 Production Server

The Flask development server is not used for the production container.

Gunicorn is used instead:

```text
gunicorn --bind 0.0.0.0:5000
```

The container is configured with:

```text
2 workers
2 threads
30 second timeout
```

---

# ☁️ AWS Deployment

The backend Docker image is deployed to Amazon ECS Fargate.

### Amazon ECR

Repository:

```text
cloud-system-api
```

Image:

```text
cloud-system-api:1.0.0
```

### Amazon ECS

Cluster:

```text
cloud-system-cluster
```

Service:

```text
cloud-system-api-service
```

Task definition:

```text
cloud-system-api:1
```

Launch type:

```text
FARGATE
```

---

# 📊 CloudWatch Logging

The ECS container sends application logs to:

```text
/ecs/cloud-system-api
```

CloudWatch logs provide visibility into:

- Gunicorn startup
- Worker processes
- Application startup
- Runtime messages
- Application errors

---

# ♻️ ECS Self-Healing

The backend service is managed by an ECS service with a desired task count.

During testing, a running task was intentionally stopped.

ECS detected that the service had fewer running tasks than the desired count and automatically launched a replacement task.

```text
Running Task
     ↓
Task stopped
     ↓
ECS detects task count mismatch
     ↓
Replacement task launched
     ↓
Task becomes RUNNING
     ↓
Container becomes HEALTHY
```

This demonstrates basic container orchestration and automatic service recovery.

---

# 📸 Backend Screenshots

Backend screenshots are maintained in the main project:

```text
../Screenshots/backend/
```

Recommended screenshots:

```text
02-flask-api.png
03-pytest.png
04-docker.png
```

---

# 🔄 Backend Deployment Flow

```text
Flask Application
       ↓
Pytest
       ↓
Docker Build
       ↓
Docker Test
       ↓
Amazon ECR
       ↓
Amazon ECS Fargate
       ↓
CloudWatch Logs
       ↓
Health Check
       ↓
Service Self-Healing
```

---

# 📋 Backend Validation

```text
✅ Flask API implemented
✅ Modular routes
✅ Environment configuration
✅ Health endpoint
✅ System information endpoint
✅ Version endpoint
✅ Automated tests
✅ 5 tests passing
✅ Docker image built
✅ Docker health check
✅ Gunicorn production server
✅ Non-root container
✅ ECR image pushed
✅ ECS Fargate deployment
✅ CloudWatch logging
✅ ECS self-healing verified
```

---

# 🔮 Future Enhancements

- Swagger/OpenAPI documentation
- API authentication
- API rate limiting
- Structured JSON logging
- Database integration
- Application metrics
- CloudWatch alarms
- HTTPS through Application Load Balancer
- Private ECS networking
- Infrastructure as Code using Terraform or CloudFormation
- CI/CD using GitHub Actions

---

## 📌 Backend Status

**Status:** ✅ Completed

**Framework:** Flask

**Runtime:** Python 3.12

**Server:** Gunicorn

**Container:** Docker

**Cloud Platform:** AWS

**Compute:** ECS Fargate

**Registry:** Amazon ECR

**Logging:** CloudWatch

**Testing:** Pytest