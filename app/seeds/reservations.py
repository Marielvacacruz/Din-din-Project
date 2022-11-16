from app.models import db, Reservation, environment, SCHEMA
from datetime import date, time


# Adds reservations seed data
def seed_reservations():
    res1 = Reservation(
        user_id=1, restaurant_id=1, time=time(hour=17, minute=30),
        date=date(year=2022, month=2, day=19), guest_count=2)
    res2 = Reservation(
        user_id=1, restaurant_id=2, time=time(hour=19, minute=00),
        date=date(year=2022, month=4, day=15), guest_count=4)
    res3 = Reservation(
        user_id=1, restaurant_id=10, time=time(hour=17, minute=45),
        date=date(year=2022, month=5, day=5), guest_count=6)
    res4 = Reservation(
        user_id=1, restaurant_id=8, time=time(hour=18, minute=30),
        date=date(year=2022, month=8, day=8), guest_count=3)
    res5 = Reservation(
        user_id=1, restaurant_id=3, time=time(hour=18, minute=00),
        date=date(year=2022, month=12, day=15), guest_count=5)
    res6 = Reservation(
        user_id=1, restaurant_id=14, time=time(hour=17, minute=00),
        date=date(year=2022, month=12, day=19), guest_count=2)
    res7 = Reservation(
        user_id=1, restaurant_id=16, time=time(hour=20, minute=30),
        date=date(year=2023, month=1, day=14), guest_count=4)

    db.session.add_all([res1, res2, res3, res4, res5, res6, res7])
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
