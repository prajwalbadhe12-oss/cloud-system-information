import os
import platform
import socket
import sys
from datetime import datetime, timezone


def get_system_info():
    """
    Collect runtime and environment information.

    The container flag is determined using common container
    environment indicators so the API can demonstrate when
    it is running inside Docker/ECS.
    """

    is_container = (
        os.path.exists("/.dockerenv")
        or os.path.exists("/run/.containerenv")
        or os.getenv("CONTAINERIZED", "").lower() == "true"
    )

    return {
        "application": "Cloud System API",
        "version": os.getenv("APP_VERSION", "1.0.0"),
        "environment": os.getenv("ENVIRONMENT", "development"),
        "containerized": is_container,
        "container_runtime": "Docker" if is_container else "Local",
        "hostname": socket.gethostname(),
        "platform": platform.system(),
        "platform_release": platform.release(),
        "architecture": platform.machine(),
        "python_version": platform.python_version(),
        "process_id": os.getpid(),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }