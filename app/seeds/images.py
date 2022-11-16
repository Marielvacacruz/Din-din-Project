from app.models import db, Image, environment, SCHEMA


# Adds images to restaurants
def seed_images():
    sylvain1 = Image(
        restaurant_id=1, url='',)
    sylvain2 = Image(
        restaurant_id=1, url='',)
    sylvain3 = Image(
        restaurant_id=1, url='',)
    besame1 = Image(
        restaurant_id=1, url='',)
    besame2 = Image(
        restaurant_id=1, url='',)
    besame3 = Image(
        restaurant_id=1, url='',)
    plume1 = Image(
        restaurant_id=1, url='',)
    plume2 = Image(
        restaurant_id=1, url='',)
    plume3 = Image(
        restaurant_id=1, url='',)

    db.session.add(demo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM images")

    db.session.commit()
