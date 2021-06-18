from flask import Blueprint, Response, jsonify


api_bp = Blueprint("api", __name__)


@api_bp.route("/api/test", methods=["GET"])
def index() -> Response:
    """Defines the main website view"""
    return jsonify("hello world")
