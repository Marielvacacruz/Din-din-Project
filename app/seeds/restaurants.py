from app.models import db, Restaurant, environment, SCHEMA
from datetime import time


# Adds a demo user, you can add other users here if you want
def seed_restaurants():
    nola1 = Restaurant(
        name='Sylvain', type='American', url_slug='sylvain-new-orleans', rating=0, price_range='$$',
        about='Sylvain is an unruly Southern bistro for locals in the French Quarter with inspired cocktails that riff on the classics. Here, we laugh loudly, shoot whiskey, and linger among friends old and new.',
        phone_num='5042658123', website_url='https://www.sylvainnola.com/', address_line='625 Chartres St', city='New Orleans', state='LA', zip_code='70130',
        open_time=time(hour=16), closing_time=time(hour=23), neighborhood='French Quarter', preview_img_url=''
        )
    nola2 = Restaurant(
        name='Besame', type='Spanish Latin Caribbean', url_slug='besame-new-orleans', rating=0, price_range='$',
        about='Besame is a tapas style Latin American restaurant and lounge featuring cuisines from South America, Mexico and the Caribbean paired with crafted cocktails and South American wines.',
        phone_num='5043080880', website_url='https://besame-Nola.com/', address_line='110 S Rampart', city='New Orleans', state='LA', zip_code='70112',
        open_time=time(hour=17), closing_time=time(hour=22), neighborhood='Arts District', preview_img_url=''
        )
    nola3 = Restaurant(
        name='Plume Algiers', type='Indian', url_slug='plume-algiers-new-orleans', rating=0, price_range='$$',
        about='Plume Algiers is a celebration of regional Indian cuisine born from one couple’s love of the dynamic dishes of India. Our menu changes weekly based on what is fresh and locally available.',
        phone_num='5043814893', website_url='https://www.plumealgeirs.com.com/', address_line='1113 Teche St', city='New Orleans', state='LA', zip_code='70114',
        open_time=time(hour=14), closing_time=time(hour=21), neighborhood='Algiers', preview_img_url=''
        )
    nola4 = Restaurant(
        name='Paladar 511', type='Italian', url_slug='paladar-511-new-orleans', rating=0, price_range='$$',
        about='Its a neighborhood restaurant for the times, where seasonal cuisine reigns supreme. The menu features inventive pizzas, housemade pastas, gulf seafood and enough choices to satisfy everyone in your party. ',
        phone_num='5045096782', website_url='https://www.paladar511.com/', address_line='511 Marigny St', city='New Orleans', state='LA', zip_code='70117',
        open_time=time(hour=16), closing_time=time(hour=22), neighborhood='Fauborg Marigny', preview_img_url=''
        )
    seattle1 = Restaurant(
        name='Paladar 511', type='Italian', url_slug='paladar-511-new-orleans', rating=0, price_range='$$',
        about='Its a neighborhood restaurant for the times, where seasonal cuisine reigns supreme. The menu features inventive pizzas, housemade pastas, gulf seafood and enough choices to satisfy everyone in your party. ',
        phone_num='5045096782', website_url='https://www.paladar511.com/', address_line='511 Marigny St', city='New Orleans', state='LA', zip_code='70117',
        open_time=time(hour=16), closing_time=time(hour=22), neighborhood='Fauborg Marigny', preview_img_url=''
        )
    seattle2 = Restaurant(
        name='Paladar 511', type='Italian', url_slug='paladar-511-new-orleans', rating=0, price_range='$$',
        about='Its a neighborhood restaurant for the times, where seasonal cuisine reigns supreme. The menu features inventive pizzas, housemade pastas, gulf seafood and enough choices to satisfy everyone in your party. ',
        phone_num='5045096782', website_url='https://www.paladar511.com/', address_line='511 Marigny St', city='New Orleans', state='LA', zip_code='70117',
        open_time=time(hour=16), closing_time=time(hour=22), neighborhood='Fauborg Marigny', preview_img_url=''
        )
    seattle3 = Restaurant(
        name='Paladar 511', type='Italian', url_slug='paladar-511-new-orleans', rating=0, price_range='$$',
        about='Its a neighborhood restaurant for the times, where seasonal cuisine reigns supreme. The menu features inventive pizzas, housemade pastas, gulf seafood and enough choices to satisfy everyone in your party. ',
        phone_num='5045096782', website_url='https://www.paladar511.com/', address_line='511 Marigny St', city='New Orleans', state='LA', zip_code='70117',
        open_time=time(hour=16), closing_time=time(hour=22), neighborhood='Fauborg Marigny', preview_img_url=''
        )
    seattle4 = Restaurant(
        name='Paladar 511', type='Italian', url_slug='paladar-511-new-orleans', rating=0, price_range='$$',
        about='Its a neighborhood restaurant for the times, where seasonal cuisine reigns supreme. The menu features inventive pizzas, housemade pastas, gulf seafood and enough choices to satisfy everyone in your party. ',
        phone_num='5045096782', website_url='https://www.paladar511.com/', address_line='511 Marigny St', city='New Orleans', state='LA', zip_code='70117',
        open_time=time(hour=16), closing_time=time(hour=22), neighborhood='Fauborg Marigny', preview_img_url=''
        )


    db.session.add_all([nola1, nola2, nola2, nola4])
    db.session.add_all([seattle1, seattle2, seattle3, seattle4])
    db.session.add_all([la1, la2, la3, la4])
    db.session.add_all([ny1, ny2, ny3, ny4])
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
