from flask import Flask, g, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from .views.api_view import api_bp

from flask_bcrypt import Bcrypt
from flask_mail import Mail

def page_not_found(e):
    """Custom error handling for 404"""
    return jsonify({"error": "page not found"})


def create_app(testing: bool = True):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object("server.config")

    app.register_blueprint(api_bp)
    
    app.register_error_handler(404, page_not_found)

    @app.before_request
    def before_request() -> None:
        g.testing = app.testing

    app.app_context().push()  # this is needed for application global context
    
    return app


application = create_app()
db = SQLAlchemy(application)
# Flask's login manager tool to facilitate user signin for user auth
login_manager = LoginManager(application)
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'
bcrypt = Bcrypt(application)
mail = Mail(application)
from .users.routes import users
application.register_blueprint(users)