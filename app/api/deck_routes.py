from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Deck
from app.forms import DeckForm

deck_routes = Blueprint('decks', __name__)

# Get all decks
@deck_routes.route('', methods=['GET'])
def get_classes():
    decks = Deck.query.all()
    return [deck.to_dict() for deck in decks]

# Get one deck
@deck_routes.route('/<int:id>', methods=['GET'])
def get_class(id):
    deck = Deck.query.get(id)
    return deck.to_dict()

# Post a deck
@deck_routes.route('', methods=['POST'])
@login_required
def post_class():
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_deck = Deck(
            class_id = form.class_id.data,
            name = form.name.data,
        )
        db.session.add(new_deck)
        db.session.commit()

        res = Deck.query.get(new_deck.id)
        return res.to_dict()

    if form.errors:
        return {"errors": form.errors}

# Update a deck
@deck_routes.route('/<int:id>', methods=['PUT'])
@login_required
def put_class(id):
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    deck = Deck.query.get(id)

    if not deck:
        return {"errors": ["Class does not exist"]}

    if form.validate_on_submit():
        class_id = form.class_id.data
        name = form.name.data if form.name.data else deck.name
        objective = form.objective.data if form.objective.data else deck.objective

        deck.class_id = class_id
        deck.name = name
        deck.objective = objective

        db.session.commit()
        res = Deck.query.get(id)
        return res.to_dict()

    if form.errors:
        return {"errors": form.errors}

# Delete a deck
@deck_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_class(id):
    deck = Deck.query.get(id)

    if not deck:
        return {"errors": "Deck does not exist."}

    db.session.delete(deck)
    db.session.commit()
    return {"Message": "Delete successful!"}
