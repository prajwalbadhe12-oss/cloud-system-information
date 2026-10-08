FROM python:3.12-slim

# Prevent Python from creating .pyc files
# and ensure logs appear immediately.
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Application configuration
ENV APP_NAME="Cloud System API"
ENV APP_VERSION="1.0.0"
ENV ENVIRONMENT="production"
ENV HOST="0.0.0.0"
ENV PORT="5000"
ENV CONTAINERIZED="true"

WORKDIR /app

# Install Python dependencies first for better Docker layer caching.
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy application source.
COPY app ./app
COPY run.py .

# Create a non-root user for security.
RUN useradd --create-home --shell /bin/bash appuser \
    && chown -R appuser:appuser /app

USER appuser

EXPOSE 5000

# Docker/ECS container health check.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:5000/health', timeout=3)" || exit 1

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "2", "--threads", "2", "--timeout", "30", "run:app"]