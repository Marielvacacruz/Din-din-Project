from app.models import db, Restaurant, environment, SCHEMA
from datetime import time


# Adds 4 restaurants per city (new orleans, seattle, los angeles, new york), 16 total
def seed_restaurants():
    nola1 = Restaurant(
        name='Sylvain', type='American', url_slug='sylvain-new-orleans', rating=0, price_range='$$',
        about='Sylvain is an unruly Southern bistro for locals in the French Quarter with inspired cocktails that riff on the classics. Here, we laugh loudly, shoot whiskey, and linger among friends old and new.',
        phone_num='5042658123', website_url='https://www.sylvainnola.com/', address_line='625 Chartres St', city='New Orleans', state='LA', zip_code='70130',
        open_time=time(hour=16), closing_time=time(hour=23), neighborhood='French Quarter', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668619510/Din%20Din%20/1600x1600_w5k3wr.jpg'
        )
    nola2 = Restaurant(
        name='Besame', type='Latin, Caribbean', url_slug='besame-new-orleans', rating=0, price_range='$',
        about='Besame is a tapas style Latin American restaurant and lounge featuring cuisines from South America, Mexico and the Caribbean paired with crafted cocktails and South American wines.',
        phone_num='5043080880', website_url='https://besame-Nola.com/', address_line='110 S Rampart', city='New Orleans', state='LA', zip_code='70112',
        open_time=time(hour=17), closing_time=time(hour=22), neighborhood='Arts District', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620385/Din%20Din%20/1600x1600_qmlmzg.jpg'
        )
    nola3 = Restaurant(
        name='Plume Algiers', type='Indian', url_slug='plume-algiers-new-orleans', rating=0, price_range='$$',
        about='Plume Algiers is a celebration of regional Indian cuisine born from one couple’s love of the dynamic dishes of India. Our menu changes weekly based on what is fresh and locally available.',
        phone_num='5043814893', website_url='https://www.plumealgiers.com.com/', address_line='1113 Teche St', city='New Orleans', state='LA', zip_code='70114',
        open_time=time(hour=14), closing_time=time(hour=21), neighborhood='Algiers', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668620828/Din%20Din%20/1600x1600_c1lo7e.jpg'
        )
    nola4 = Restaurant(
        name='Paladar 511', type='Italian', url_slug='paladar-511-new-orleans', rating=0, price_range='$$',
        about='Its a neighborhood restaurant for the times, where seasonal cuisine reigns supreme. The menu features inventive pizzas, housemade pastas, gulf seafood and enough choices to satisfy everyone in your party. ',
        phone_num='5045096782', website_url='https://www.paladar511.com/', address_line='511 Marigny St', city='New Orleans', state='LA', zip_code='70117',
        open_time=time(hour=16), closing_time=time(hour=22), neighborhood='Fauborg Marigny', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668621031/Din%20Din%20/1600x1600_ip8csl.jpg'
        )
    seattle1 = Restaurant(
        name='Nishino', type='Japanese', url_slug='nishino-seattle', rating=0, price_range='$$$',
        about='Its a neighborhood restaurant for the times, where seasonal cuisine reigns supreme. The menu features inventive pizzas, housemade pastas, gulf seafood and enough choices to satisfy everyone in your party. ',
        phone_num='2063225800', website_url='https://nishinorestaurant.com/', address_line='3130 E Madison St', city='Seattle', state='WA', zip_code='98112',
        open_time=time(hour=17), closing_time=time(hour=22), neighborhood='Washington Park', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668643631/Din%20Din%20/1600x1600_yb7icy.jpg'
        )
    seattle2 = Restaurant(
        name='Oddfellows Cafe + Bar', type='American', url_slug='oddfellows-cafe-and-bar-seattle', rating=0, price_range='$',
        about="Oddfellows Café + Bar is an all-day, all-night café and bar that serves simple, fresh food without pretense. We have great coffee from Middle Fork Coffee Roasters and elevated cocktails.",
        phone_num='2063250807', website_url='https://www.oddfellowscafe.com/', address_line='1525 10th Ave', city='Seattle', state='WA', zip_code='98122',
        open_time=time(hour=14), closing_time=time(hour=21), neighborhood='Capital Hill', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668643840/Din%20Din%20/1600x1600_mbltvn.jpg'
        )
    seattle3 = Restaurant(
        name='Kamp Social House', type='Caribbean', url_slug='kamp-social-house-seattle', rating=0, price_range='$',
        about="We started Kamp Social House with the hopes of being the go-to neighborhood spot with a little something for everyone. Our menus highlight what is fresh, seasonal and local.",
        phone_num='2067081296', website_url='https://www.kampseattle.com/', address_line='2800 E Madison St', city='Seattle', state='WA', zip_code='98112',
        open_time=time(hour=17), closing_time=time(hour=22), neighborhood='Madison', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668643953/Din%20Din%20/1600x1600_wncjxb.jpg'
        )
    seattle4 = Restaurant(
        name='Maximilien', type='French', url_slug='maximilien-seattle', rating=0, price_range='$$$',
        about="Maximilien has the wine and dine playbook on lockdown: perfect views of the Seattle waterfront and seasonally-inspired, top-notch French fare.",
        phone_num='2066827270', website_url='https://www.maximilienrestaurant.com/', address_line='81a Pike Street', city='Seattle', state='WA', zip_code='98101',
        open_time=time(hour=17), closing_time=time(hour=22), neighborhood='Pike Place Market', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668644063/Din%20Din%20/1600x1600_bad1m9.jpg'
        )
    la1 = Restaurant(
        name='Lasita', type='Filipino', url_slug='lasita-los-angeles', rating=0, price_range='$$',
        about="Lasita is a casual Los Angeles restaurant and natural wine bar located in Chinatown’s Far East Plaza, where we focus on Filipino rotisserie and all things natty.",
        phone_num='2134436163', website_url='https://www.lasita-la.com/', address_line='727 N Broadway #120', city='Lost Angeles', state='CA', zip_code='90012',
        open_time=time(hour=16), closing_time=time(hour=22), neighborhood='Chinatown', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668644128/Din%20Din%20/1600x1600_dciin3.jpg'
        )
    la2 = Restaurant(
        name='Night+Market WeHo', type='Thai', url_slug='night-market-weho-lost-angeles', rating=0, price_range='$$',
        about="Chef Kris Yenbamroong likes to think of the food at NIGHT + MARKET as “LA-Thai”. Meaning, you’ll see the classic Thai staples like Pad Thai and Pad See Ew alongside dishes inspired by his SoCal upbringing: think towering Fried Chicken Sandwiches and umami-rich Pork Toro. ",
        phone_num='3102759724', website_url='https://www.nightmarketsong.com/nm-weho/', address_line='9043 Sunset Blvd', city='West Hollywood', state='CA', zip_code='90069',
        open_time=time(hour=17), closing_time=time(hour=22), neighborhood='West Hollywood', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668644199/Din%20Din%20/1600x1600_fqamdo.jpg'
        )
    la3 = Restaurant(
        name='Guelaguetza', type='Mexican', url_slug='guelaguetza-los-angeles', rating=0, price_range='$$',
        about="Guelaguetza is a James Beard award winning restaurant, first opening its doors in 1994. Since then, our goal has been to showcase the best of our families recipes and stay authentically true to Oaxacan ingredients. Guelaguetza’s mission is for all of its patrons to live and experience Oaxaca rich culinary traditions through its dishes.",
        phone_num='2134270608', website_url='https://www.ilovemole.com/', address_line='3014 W Olympic Blvd', city='Los Angeles', state='CA', zip_code='90006',
        open_time=time(hour=17), closing_time=time(hour=22), neighborhood='Koreatown', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668644343/Din%20Din%20/1600x1600_kyakc3.jpg'
        )
    la4 = Restaurant(
        name='Chulita', type='Mexican', url_slug='chulita-los-angeles', rating=0, price_range='$$',
        about="Chulita is an Alta California-style modern Mexican restaurant and mezcal/tequila bar in the heart of Venice, bringing botanas y mezcales or Mexican drinking food to Rose Avenue.",
        phone_num='3103924440', website_url='https://www.chulita.com/', address_line='533 Rose Ave', city='Venice', state='CA', zip_code='90291',
        open_time=time(hour=17), closing_time=time(hour=21), neighborhood='Venice', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668644410/Din%20Din%20/1600x1600_qrtlw0.jpg'
        )
    detroit1 = Restaurant(
        name='Mink', type='Seafood', url_slug='mink-detroit', rating=0, price_range='$$$',
        about='Modeled after Japanese Izakayas, Mink is a drinking and dining destination in the heart of Corktown, Detroit. It is an intimate community gathering place with a focus on impeccable sourcing of low intervention ingredients in a casual environment.',
        phone_num='3133510771', website_url='https://www.minkdetroit.com/', address_line='1701 Trumbull Ave', city='Detroit', state='MI', zip_code='48216',
        open_time=time(hour=17), closing_time=time(hour=22), neighborhood='Corktown', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668644509/Din%20Din%20/1600x1600_llccys.jpg'
        )
    detroit2 = Restaurant(
        name='Leila', type='Middle Eastern', url_slug='leila-detroit', rating=0, price_range='$$',
        about='Leila is decidedly contemporary, with a bigger emphasis on mezze—small plates meant to be shared.',
        phone_num='3138168100', website_url='https://www.leiladetroit.com/', address_line='1245 Griswold St', city='Detroit', state='MI', zip_code='48226',
        open_time=time(hour=17), closing_time=time(hour=23), neighborhood='Capital Park', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668644565/Din%20Din%20/1600x1600_urtbye.jpg'
        )
    detroit3 = Restaurant(
        name='Daebak Korean BBQ', type='Korean', url_slug='daebak-korean-bbq-detroit', rating=0, price_range='$$',
        about='Daebak Korean BBQ, located in Southfield Michigan, is a family-run modern Korean barbecue restaurant established in 2018.',
        phone_num='2489968922', website_url='https://daebakkbbq.com/', address_line='27566 Northwestern Hwy', city='Detroit', state='MI', zip_code='48034',
        open_time=time(hour=17), closing_time=time(hour=21), neighborhood='Metro Detroit', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668644613/Din%20Din%20/1600x1600_jj7nmt.jpg'
        )
    detroit4 = Restaurant(
        name='Voyager', type='Seafood', url_slug='voyager-detroit', rating=0, price_range='$$',
        about="A menu fit for the coast with drinks to match. Voyager features seasonal, sustainable, wild-caught & responsibly farmed seafood from near & far. ",
        phone_num='2486584999', website_url='https://www.voyagerferndale.com/', address_line='600 Vester St.', city='Detroit', state='MI', zip_code='48220',
        open_time=time(hour=17), closing_time=time(hour=22), neighborhood='Ferndale', preview_img_url='https://res.cloudinary.com/dyobydo5h/image/upload/v1668644662/Din%20Din%20/1600x1600_wh1iyb.jpg'
        )


    db.session.add_all([nola1, nola2, nola3, nola4])
    db.session.add_all([seattle1, seattle2, seattle3, seattle4])
    db.session.add_all([la1, la2, la3, la4])
    db.session.add_all([detroit1, detroit2, detroit3, detroit4])
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
