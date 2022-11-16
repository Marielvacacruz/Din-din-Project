from app.models import db, Reservation, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_reservations():
    demo = Reservation(
        first_name='Demo', last_name='User', email='demo@aa.io', phone_number='509123456', password='password')

    db.session.add(demo)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reservations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reservations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reservations")

    db.session.commit()
