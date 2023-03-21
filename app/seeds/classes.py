from app.models import db, Class, environment, SCHEMA
from sqlalchemy.sql import text


def seed_classes():
    class1 = Class(
        user_id = 2,
        name = 'Unit 1 Geography',
        image = 'https://www.brainscape.com/assets/ugs-icons/globe-icon.png',
        headline = 'Unit 1 Geography for Mrs.Anderson\'s class. Students should review this for the unit 1 test.',
        description = 'These flashcards go over questions that may appear on the unit 1 geography test. Students should review these flashcards in addition to studying textbook pages 112-164.'
    )
    class2 = Class(
        user_id = 2,
        name = 'Unit 2 Geography',
        image = 'https://www.brainscape.com/assets/ugs-icons/globe-icon.png',
        headline = 'Unit 1 Geography for Mrs.Anderson\'s class. Students should review this for the unit 2 test.',
        description = 'These flashcards go over questions that may appear on the unit 2 geography test. Students should review these flashcards in addition to studying textbook pages 214-270.'
    )
    class3 = Class(
        user_id = 4,
        name = 'The Industrial Revolution',
        image = 'https://www.brainscape.com/assets/ugs-icons/gears-icon.png',
        headline = 'Take a quick review on the industrial revolution! Significant people and inventions. See if you remember them all!',
        description = 'Many of us have learned about the industrial revolution in school, but how may of us can genuinely remember the random facts we\'ve absorbed? Whether you\'re preparing for a test or just curious, this class is for you!'
    )
    class4 = Class(
        user_id = 5,
        name = 'Basics of Aerodynamics',
        image = 'https://www.brainscape.com/assets/ugs-icons/tools-icon.png',
        headline = 'Hi, this is just a personal study thing for school.',
        description = 'Flashcards go over vocabulary related to the subject.'
    )
    class5 = Class(
        user_id = 7,
        name = 'Addition Basics',
        image = 'https://www.brainscape.com/assets/ugs-icons/math-ops-icon.png',
        headline = 'Basic addition for pre-k students.',
        description = 'Covers simple addition of numbers 0 - 9'
    )
    class6 = Class(
        user_id = 7,
        name = 'Subtraction Basics',
        image = 'https://www.brainscape.com/assets/ugs-icons/math-ops-icon.png',
        headline = 'Basic subtraction for pre-k students.',
        description = 'Covers simple subtraction of numbers 0 - 9'
    )
    class7 = Class(
        user_id = 7,
        name = 'Multiplication Basics',
        image = 'https://www.brainscape.com/assets/ugs-icons/math-ops-icon.png',
        headline = 'Basic subtraction for 2nd grade students.',
        description = 'Covers simple multiplication of numbers 0 - 9'
    )
    class8 = Class(
        user_id = 8,
        name = 'Basic Shapes',
        headline = 'Basic subtraction for pre-k students.',
        description = 'Covers simple shapes of numbers 0 - 9'
    )
    class9 = Class(
        user_id = 9,
        name = 'Mr.Smith Economics Unit 1',
        image = 'https://www.brainscape.com/assets/ugs-icons/trends-icon.png',
        headline = 'Questions similar to those on the upcoming unit 1 economics test.',
        description = 'Vocabulary words and events.'
    )
    class10 = Class(
        user_id = 11,
        name = 'Famous Landmarks',
        image = 'https://www.brainscape.com/assets/ugs-icons/official-institution-icon.png',
        headline = '',
        description = ''
    )
    class11 = Class(
        user_id = 11,
        name = 'Famous Artists',
        image = 'https://www.brainscape.com/assets/ugs-icons/entertainment-icon.png',
        headline = '',
        description = ''
    )
    class12 = Class(
        user_id = 11,
        name = 'Trig',
        image = 'https://www.brainscape.com/assets/ugs-icons/math-ops-icon.png',
        headline = 'Exactly what it says on the tin.',
        description = 'aaaaaaaaaaaaaaaaaaaaaaaaa'
    )
    class13 = Class(
        user_id = 12,
        name = 'Last Name Origins',
        headline = 'Have you ever wondered where some occupational last names come from? Well, here\'s a good start to see the most common ones used today.',
        description = ''
    )
    class14 = Class(
        user_id = 14,
        name = 'National Dishes',
        image = 'https://www.brainscape.com/assets/ugs-icons/food-and-dining-icon.png',
        headline = '',
        description = 'Personal review for test.'
    )
    class15 = Class(
        user_id = 14,
        name = 'Chemistry 101',
        image = 'https://www.brainscape.com/assets/ugs-icons/beaker-icon.png',
        headline = 'Simple chemestry related review.',
        description = 'Inside are flashcard decks for vocabulary, atoms, and elements.'
    )

    classes = [
        class1, class2, class3, class4, class5,
        class6, class7, class8, class9, class10,
        class11, class12, class13, class14, class15
    ]

    add_classes = [db.session.add(a_class) for a_class in classes]

    db.session.commit()


def undo_classes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.classes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM classes"))

    db.session.commit()
