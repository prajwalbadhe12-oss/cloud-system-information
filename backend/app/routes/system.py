from flask import Blueprint, jsonify

from app.config import Config
from app.services.system_info import get_system_info

system_bp = Blueprint("system", __name__)


@system_bp.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Cloud System API is running",
        "application": Config.APP_NAME,
        "version": Config.APP_VERSION,
        "status": "running"
    })


@system_bp.route("/info", methods=["GET"])
def info():
    return jsonify(get_system_info())


@system_bp.route("/version", methods=["GET"])
def version():
    return jsonify({
        "version": Config.APP_VERSION
    })