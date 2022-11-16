from app.models import db, Favorite, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    fave1 = Favorite(
        user_id=1, restaurant_id=2)
    fave2 = Favorite(
        user_id=1, restaurant_id=5)
    fave3 = Favorite(
        user_id=1, restaurant_id=10)
    fave4 = Favorite(
        user_id=1, restaurant_id=8)
    fave5 = Favorite(
        user_id=1, restaurant_id=15)

    db.session.add_all([fave1, fave2, fave3, fave4, fave5])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM favorites")

    db.session.commit()
