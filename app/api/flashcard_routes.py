from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Flashcard
from app.forms import FlashcardForm

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

        # res = Flashcard.query.get(new_flashcard.id)
        # return res.to_dict()

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

        # res = Flashcard.query.get(id)
        # return res.to_dict()

        return {"Message": "Edit successful!"}

    if form.errors:
        return {"errors": form.errors}
