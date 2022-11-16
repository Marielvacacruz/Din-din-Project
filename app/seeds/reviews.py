from app.models import db, Review, environment, SCHEMA


# Adds reviews to restaurants
def seed_reviews():
    demo = Review(
        user_id=1, restaurant_id=1, star_rating= 4, review='Food was tasty! Definitely coming back')
    michelle = Review(
        user_id=2, restaurant_id=3, star_rating= 5, review='Had a great time, really enjoyed my meal!')
    bobbie = Review(
        user_id=3, restaurant_id=5, star_rating= 3, review='Service was great, food was good')
    aaron = Review(
        user_id=4, restaurant_id=7, star_rating= 2, review='What an awful experience')
    jose = Review(
        user_id=5, restaurant_id=10, star_rating= 5, review='Had a lovely dinner. Came here with my wife for our anniversary.')
    sarai = Review(
        user_id=6, restaurant_id=12, star_rating= 4, review='Pretty location, service was good and food was yummy')
    demob = Review(
        user_id=1, restaurant_id=14, star_rating= 3, review='Food was good but service was not the best')
    democ = Review(
        user_id=1, restaurant_id=16, star_rating= 4, review='Had a nice meal')



    db.session.add_all([demo, michelle, bobbie, aaron, jose, sarai, demob, democ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
