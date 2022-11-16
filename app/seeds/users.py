from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', email='demo@aa.io', phone_number='509123456', password='password')
    michelle = User(
        first_name='Michelle', last_name='Landry', email='michelle@aa.io', phone_number='4524441234',  password='apple123')
    bobbie = User(
        username='Bobbie', last_name='Mills', email='bobbie@aa.io', phone_number='2068993435', password='banana456')
    aaron = User(
        username='Aaron', last_name='Scott', email='aaron@aa.io', phone_number='2068778343', password='kiwi789')
    jose = User(
        username='Jose', last_name='Vasquez', email='jose@aa.io', phone_number='20676765434', password='taco789')
    sarai = User(
        username='Sarai', last_name='Cruz', email='sarai@aa.io', phone_number='2064456738', password='strawberry123')

    db.session.add(demo)
    db.session.add(michelle)
    db.session.add(bobbie)
    db.session.add(aaron)
    db.session.add(jose)
    db.session.add(sarai)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
