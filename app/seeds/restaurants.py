from app.models import db, Restaurant, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    nola1 = Restaurant(
        name='Sylvain', type='American', url_slug='', rating=0, price_range='$$',
        about='Sylvain is an unruly Southern bistro for locals in the French Quarter with inspired cocktails that riff on the classics. Here, we laugh loudly, shoot whiskey, and linger among friends old and new.',
        phone_num='5042658123', website_url='https://www.sylvainnola.com/', address_line='625 Chartres St', city='New Orleans', state='LA', zip_code='70130',
        open_time='', closing_time='', neighborhood='French Quarter', preview_img_url=''
        )
    nola2 = Restaurant(
        name='Demo', type='User', url_slug='', rating=0, price_range='password',
        about='', phone_num='', website_url='', address_line='', city='', state='', zip_code='',
        open_time='', closing_time='', neighborhood='', preview_img_url=''
        )
    nola3 = Restaurant(
        name='Demo', type='User', url_slug='', rating=0, price_range='password',
        about='', phone_num='', website_url='', address_line='', city='', state='', zip_code='',
        open_time='', closing_time='', neighborhood='', preview_img_url=''
        )


    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_restaurants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.restaurants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM restaurants")

    db.session.commit()
