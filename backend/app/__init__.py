import logging

from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.routes import health_bp, system_bp


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s"
    )

    app.logger.info(
        "Starting %s version %s",
        Config.APP_NAME,
        Config.APP_VERSION
    )

    app.register_blueprint(health_bp)
    app.register_blueprint(system_bp)

    return app