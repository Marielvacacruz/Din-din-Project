from app.models import db, Image, environment, SCHEMA


# Adds images to restaurants
def seed_images():
    sylvain1 = Image(
        restaurant_id=1, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668619510/Din%20Din%20/1600x1600_w5k3wr.jpg',)
    sylvain2 = Image(
        restaurant_id=1, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668619589/Din%20Din%20/1600x1600_wjbydw.jpg',)
    sylvain3 = Image(
        restaurant_id=1, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668619710/Din%20Din%20/1600x1600_xkmzud.jpg',)
    sylvain4 = Image(
        restaurant_id=1, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620173/Din%20Din%20/1600x1600_v7fuwb.jpg',)
    besame1 = Image(
        restaurant_id=2, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620385/Din%20Din%20/1600x1600_qmlmzg.jpg',)
    besame2 = Image(
        restaurant_id=2, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620421/Din%20Din%20/1600x1600_l6mxxe.jpg',)
    besame3 = Image(
        restaurant_id=2, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620465/Din%20Din%20/1600x1600_pj9hba.jpg',)
    besane4 = Image(
        restaurant_id=2, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620734/Din%20Din%20/1600x1600_i09hs4.jpg',)
    plume1 = Image(
        restaurant_id=3, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620828/Din%20Din%20/1600x1600_c1lo7e.jpg',)
    plume2 = Image(
        restaurant_id=3, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620847/Din%20Din%20/1600x1600_zjz23m.jpg',)
    plume3 = Image(
        restaurant_id=3, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620873/Din%20Din%20/1600x1600_si5ggy.jpg',)
    plume4 = Image(
        restaurant_id=3, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620892/Din%20Din%20/1600x1600_qyzemn.jpg',)
    paladar1 = Image(
        restaurant_id=4, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668621031/Din%20Din%20/1600x1600_ip8csl.jpg',)
    paladar2 = Image(
        restaurant_id=4, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668621053/Din%20Din%20/1600x1600_uzfvuh.jpg',)
    paladar3 = Image(
        restaurant_id=4, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668621072/Din%20Din%20/1600x1600_tc85ur.jpg',)
    paladar4 = Image(
        restaurant_id=4, url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668621104/Din%20Din%20/1600x1600_oqlkf7.jpg',)

    db.session.add_all([sylvain1, sylvain2, sylvain3, sylvain4])
    db.session.add_all([besame1, besame2, besame3, besane4])
    db.session.add_all([plume1, plume2, plume3, plume4])
    db.session.add_all([paladar1, paladar2, paladar3, paladar4])


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
