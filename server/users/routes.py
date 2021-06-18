from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import login_user, current_user, logout_user, login_required
from server.create_app import db, bcrypt
from server.models import User
from server.users.forms import (RegistrationForm, LoginForm, UpdateAccountForm,
                                   RequestResetForm, ResetPasswordForm)
from server.users.utils import save_picture, send_reset_email, send_contact_email
from flask import Blueprint
import jwt, os, json

#app = current_app
#app.config['SECRET_KEY'] = os.environ.get('AlgoPlatformSecretKey')
secretKey = os.environ.get('ObjectiveDeckSecretKey')
users = Blueprint('users',__name__)

@users.route("/api/users/auth/", methods=['GET','POST'])
def user_auth():
    #return json.dumps('hello world')
    if current_user.is_authenticated:
        payload = {'isAuthenticated': True,
                   'username': current_user.username,
                   'email': current_user.email,
                   'image_file': current_user.image_file}
        return jwt.encode(
            payload,
            app.config['SECRET_KEY']
        )
    else:
        payload = {'isAuthenticated': False}
        return jwt.encode(
            payload,
            app.config['SECRET_KEY']
        )

@users.route("/api/users/login", methods=['GET','POST'])
def user_login():
    JSON_sent = request.get_json()
    user = User.query.filter_by(email=JSON_sent['email']).first()
    if user and bcrypt.check_password_hash(user.password, JSON_sent['password']):
        login_user(user)
        payload = {'isAuthenticated': True,
                   'username': user.username,
                   'email': user.email,
                   'image_file': user.image_file}
        return jwt.encode(
            payload,
            secretKey
        )
    payload = {'isAuthenticated': False}
    return jwt.encode(
            payload,
            app.config['SECRET_KEY']
        )
@users.route("/users/logout/", methods=['GET','POST'])
def user_logout():
    logout_user()
    payload = {'isAuthenticated': False}
    return jwt.encode(
        payload,
        app.config['SECRET_KEY']
    )
    
@users.route("/users/register/", methods=['GET','POST'])
def users_register():
    JSON_sent = request.get_json()
    userCheck = User.query.filter_by(email=JSON_sent['email']).first()
    if userCheck:
        payload = {
            'emailAlreadyUsed': True,
            'registerSuccess': False,
        }
        return jwt.encode(
            payload,
            app.config['SECRET_KEY']
        )
    hashed_password = bcrypt.generate_password_hash(JSON_sent['password']).decode('utf-8')
    user = User(username=JSON_sent['username'], email=JSON_sent['email'], password=hashed_password)
    db.session.add(user)
    db.session.commit()
    login_user(user)
    payload = {
            'emailAlreadyUsed': False,
            'registerSuccess': True,
            'user': {'isAuthenticated': True,
                   'username': user.username,
                   'email': user.email,
                   'image_file': user.image_file}
        }
    return jwt.encode(
        payload,
        app.config['SECRET_KEY']
    )

@users.route("/users/updatePhoto/", methods=['POST'])
@login_required
def users_update_photo():
    file = request.files['file']
    if file:
        picture_file = save_picture(file)
        current_user.image_file = picture_file
        db.session.commit()
        payload = {
            'isAuthenticated': True,
            'username': current_user.username,
            'email': current_user.email,
            'image_file': current_user.image_file
        }
        return jwt.encode(
            payload,
            app.config['SECRET_KEY']
        )
@users.route("/users/updateAccount/", methods=['POST'])
@login_required
def users_update_account():
    JSON_sent = request.get_json()
    payload = {
        'isAuthenticated': True,
        'username': current_user.username,
        'email': current_user.email,
        'image_file': current_user.image_file,
        'updateEmail': False,
        'updatePassword': False,
        'usernameTaken': False,
        }
    user = User.query.filter_by(email=JSON_sent['email']).first()

    if JSON_sent['email'] != '':
        if user is None:
            current_user.email = str(JSON_sent['email'])
            payload['updateEmail'] = True
            payload['email'] = str(JSON_sent['email'])
            db.session.commit()
        else:
            payload['usernameTaken'] = True
    
    if JSON_sent['password'] != '':
        hashed_password = bcrypt.generate_password_hash(JSON_sent['password']).decode('utf-8')
        current_user.password = hashed_password
        payload['updatePassword'] = True
        db.session.commit()

    return jwt.encode(
    payload,
    app.config['SECRET_KEY']
    )


@users.route("/users/reset_password/", methods=['GET', 'POST'])
def user_reset_request():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    JSON_sent = request.get_json()
    user = User.query.filter_by(email=str(JSON_sent['email'])).first()
    send_reset_email(user)
    payload = 'success'
    return payload


@users.route("/users/send_contact_email/", methods=['GET', 'POST'])
def contact_email():
    JSON_sent = request.get_json()
    print(JSON_sent)
    if current_user.is_authenticated:
        send_contact_email(current_user.email,JSON_sent['message'])
    else:
        send_contact_email(' no user ',JSON_sent['message'])
    payload = 'success'
    return payload

@users.route("/test_old_index", methods=['GET'])
def old_index():
    return render_template("old_index.html")

@users.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('main.home'))



@users.route("/account", methods=['GET', 'POST'])
@login_required
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
        if form.picture.data:
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash('Your account has been updated!', 'success')
        return redirect(url_for('users.account'))
    elif request.method == 'GET':
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template('account.html', title='Account',
                           image_file=image_file, form=form)

@users.route("/user/<string:username>")
def user_posts(username):
    page = request.args.get('page', 1, type=int)
    user = User.query.filter_by(username=username).first_or_404()
    posts = Post.query.filter_by(author=user)\
        .order_by(Post.date_posted.desc())\
        .paginate(page=page, per_page=5)
    return render_template('user_posts.html', posts=posts, user=user)


@users.route("/reset_password", methods=['GET', 'POST'])
def reset_request():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RequestResetForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        send_reset_email(user)
        flash('An email has been sent with instructions to reset your password.', 'info')
        return redirect(url_for('users.login'))
    return render_template('reset_request.html', title='Reset Password', form=form)

@users.route("/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token):
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    user = User.verify_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token', 'warning')
        return redirect(url_for('users.reset_request'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        flash('Your password has been updated! You are now able to log in', 'success')
        return redirect(url_for('users.login'))
    return render_template('reset_token.html', title='Reset Password', form=form)