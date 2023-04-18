from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Flashcard, User, Studied_Card
from app.forms import FlashcardForm, StudiedForm

flashcard_routes = Blueprint('flashcards', __name__)


@flashcard_routes.route('/', methods=['POST'])
@login_required
def post_flashcard():
    form = FlashcardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_flashcard = Flashcard(
            deck_id = form.deck_id.data,
            question = form.question.data,
            answer = form.answer.data,
            question_image = form.question_image.data,
            answer_image = form.answer_image.data,
        )
        db.session.add(new_flashcard)
        db.session.commit()

        return {"Message": "Creation successful!"}

    if form.errors:
        return {"errors": form.errors}

@flashcard_routes.route('/<int:id>', methods=['PUT'])
@login_required
def put_class(id):
    form = FlashcardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    flashcard = Flashcard.query.get(id)

    if not flashcard:
        return {"errors": ["Flashcard does not exist"]}

    if form.validate_on_submit():
        deck_id = form.deck_id.data
        question = form.question.data or flashcard.question
        answer = form.answer.data or flashcard.answer
        question_image = form.question_image.data or flashcard.question_image
        answer_image = form.answer_image.data or flashcard.answer_image

        flashcard.deck_id = deck_id
        flashcard.question = question
        flashcard.answer = answer
        flashcard.question_image = question_image
        flashcard.answer_image = answer_image

        db.session.commit()

        return {"Message": "Edit successful!"}

    if form.errors:
        return {"errors": form.errors}

@flashcard_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_flashcard(id):
    flashcard = Flashcard.query.get(id)

    if not flashcard:
        return {"errors": "Flashcard does not exist"}

    db.session.delete(flashcard)
    db.session.commit()

    return {"Message": "Delete successful!"}

@flashcard_routes.route('/<int:flashcard_id>/users/<int:user_id>', methods=['POST'])
@login_required
def create_studied_record(flashcard_id, user_id):
    form = StudiedForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    flashcard = Flashcard.query.get(flashcard_id)

    if not flashcard:
        return {"errors": "Flashcard does not exist"}

    user = User.query.get(user_id)

    if not user:
        return {"errors": "User does not exist"}

    if form.validate_on_submit():
        new_studied_card = Studied_Card(
            user_id = form.user_id.data,
            flashcard_id = form.flashcard_id.data,
        )
        db.session.add(new_studied_card)
        db.session.commit()

        res = Studied_Card.query.get(new_studied_card.id)
        return res.to_dict()

    if form.errors:
        return {"errors": form.errors}

@flashcard_routes.route('/users/<int:user_id>/classes/<int:class_id>', methods=['GET'])
@login_required
def get_studied_records(user_id, class_id):
    studied_cards = Studied_Card.query.filter_by(user_id=user_id, class_id=class_id)
    return [card.to_dict() for card in studied_cards]
