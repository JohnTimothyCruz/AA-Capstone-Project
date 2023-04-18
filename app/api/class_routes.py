from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Class, Learner, Studied_Card
from app.forms import ClassForm, LearnerForm

class_routes = Blueprint('classes', __name__)

# Get all classes
@class_routes.route('', methods=['GET'])
def get_classes():
    classes = Class.query.all()
    return [a_class.to_dict() for a_class in classes]

# Get one class
@class_routes.route('/<int:id>', methods=['GET'])
def get_class(id):
    a_class = Class.query.get(id)
    return a_class.to_dict()

# Post a class
@class_routes.route('', methods=['POST'])
@login_required
def post_class():
    form = ClassForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_class = Class(
            user_id = form.user_id.data,
            name = form.name.data,
        )

        db.session.add(new_class)
        db.session.commit()

        new_learner = Learner(
            user_id = form.user_id.data,
            class_id = new_class.id,
        )

        db.session.add(new_learner)
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
        name = form.name.data if form.name.data else a_class.name
        mix_type = form.mix_type.data if form.mix_type.data else a_class.mix_type
        visibility = form.visibility.data if form.visibility.data else a_class.visibility
        image = form.image.data if form.image.data else a_class.image
        headline = form.headline.data if form.headline.data else a_class.headline
        description = form.description.data if form.description.data else a_class.description

        a_class.user_id = user_id
        a_class.name = name
        a_class.mix_type = mix_type
        a_class.visibility = visibility
        a_class.image = image
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

    Learner.query.filter_by(class_id=id).delete()
    Studied_Card.query.filter_by(class_id=id).delete()

    db.session.delete(a_class)
    db.session.commit()

    return {"Message": "Delete successful!"}

#Post a learner to a class
@class_routes.route('/<int:class_id>/learners', methods=['POST'])
@login_required
def create_learner(class_id):
    form = LearnerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_learner = Learner(
            user_id = form.user_id.data,
            class_id = class_id,
        )
        db.session.add(new_learner)
        db.session.commit()

        res = Learner.query.get(new_learner.id)

        return res.to_dict()

    if form.errors:
        return {"errors": form.errors}

#Edit a class' learner
@class_routes.route('/<int:class_id>/users/<int:user_id>/minutes', methods=['PUT'])
@login_required
def increment_learner_time(class_id, user_id):
    form = LearnerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    learner = Learner.query.filter_by(class_id=class_id, user_id=user_id)[0]

    if not learner:
        return {"errors": ["Learner does not exist"]}

    time_studied = learner.time_studied + 1
    learner.time_studied = time_studied

    db.session.commit()

    return learner.to_dict()

# Delete a learner from a class
@class_routes.route('/<int:class_id>/learners/<int:learner_id>', methods=['DELETE'])
@login_required
def delete_learner(class_id, learner_id):
    learner = Learner.query.get(learner_id)

    if not learner:
        return {"errors": "Learner does not exist."}

    db.session.delete(learner)
    db.session.commit()
    return {"message": "Delete Successful!"}
