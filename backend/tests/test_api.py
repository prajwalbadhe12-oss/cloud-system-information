import pytest

from app import create_app


@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True

    with app.test_client() as client:
        yield client


def test_home(client):
    response = client.get("/")

    assert response.status_code == 200

    data = response.get_json()

    assert data["application"] == "Cloud System API"
    assert data["status"] == "running"
    assert data["version"] == "1.0.0"


def test_health(client):
    response = client.get("/health")

    assert response.status_code == 200

    data = response.get_json()

    assert data["status"] == "healthy"
    assert data["application"] == "Cloud System API"


def test_info(client):
    response = client.get("/info")

    assert response.status_code == 200

    data = response.get_json()

    assert data["application"] == "Cloud System API"
    assert "version" in data
    assert "environment" in data
    assert "containerized" in data
    assert "container_runtime" in data
    assert "python_version" in data


def test_version(client):
    response = client.get("/version")

    assert response.status_code == 200

    data = response.get_json()

    assert data["version"] == "1.0.0"


def test_unknown_route(client):
    response = client.get("/does-not-exist")

    assert response.status_code == 404