from flask import Blueprint, request
from flask_login import login_required
from sqlalchemy.sql import text
from app.models import db, Class, User
from app.forms import ClassForm

class_routes = Blueprint('classes', __name__)

# Get all classes
@class_routes.route('/', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    return [a_class.to_dict() for a_class in classes]

# Get one class
@class_routes.route('/<int:id>', methods=['GET'])
def get_class(id):
    a_class = Class.query.get(id)
    return a_class

# Post a class
@class_routes.route('/', methods=['POST'])
@login_required
def post_class():
    form = ClassForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user_id = form.user_id.data
        name = form.name.data

        new_class = Class(
            user_id,
            name
        )
        db.session.add(new_class)
        db.session.commit()

        res = Class.query.get(new_class.id)
        return res.to_dict()

    if form.errors:
        return {"errors": form.errors}

# Update a class
@class_routes.route('/<int:id>', methods=['PUT'])
@login_required
def put_class(id):
    form = ClassForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    a_class = Class.query.get(id)

    if not a_class:
        return {"errors": ["Class does not exist"]}

    if form.validate_on_submit():
        user_id = form.user_id.data
        name = form.name.data
        headline = form.headline.data
        description = form.description.data

        a_class.user_id = user_id
        a_class.name = name
        a_class.headline = headline
        a_class.description = description

        db.session.commit()
        res = Class.query.get(id)
        return res.to_dict()

    if form.errors:
        return {"errors": form.errors}

# Delete a class
@class_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_class(id):
    a_class = Class.query.get(id)

    if not a_class:
        return {"errors": "Class does not exist."}

    db.session.delete(a_class)
    db.session.commit()
    return "Delete successful!"
