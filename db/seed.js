const bcrypt = require('bcrypt');
const db = require('APP/db')

const categoriesToSeed = [
  {name: 'Accessories'},
  {name: 'Vehicles'},
  {name: 'Real Estate'},
  {name: 'Apparel'},
  {name: 'Services'},
  {name: 'Attorneys', meta_category_id: 5},
  {name: 'Bodyguards', meta_category_id: 5},
  {name: 'Accountants', meta_category_id: 5},
  {name: 'Chauffuers', meta_category_id: 5},
  {name: 'Pilots', meta_category_id: 5},
  {name: 'Butlers', meta_category_id: 5},
  {name: 'Social Media Reps', meta_category_id: 5},
  {name: 'Suits', meta_category_id: 4},
  {name: 'Ties', meta_category_id: 4},
  {name: 'Pocket Squares', meta_category_id: 4},
  {name: 'Fake Tanners', meta_category_id: 1},
  {name: 'Watches', meta_category_id: 1},
  {name: 'Toupees', meta_category_id: 1},
  {name: 'Jets', meta_category_id: 2},
  {name: 'Yachts', meta_category_id: 2},
  {name: 'Cars', meta_category_id: 2},
  {name: 'Motorcycles', meta_category_id: 2},
  {name: 'Helicopters', meta_category_id: 2},
  {name: "Mansions", meta_category_id: 3},
  {name: "Walls", meta_category_id: 3},
  {name: "Casinos", meta_category_id: 3},
  {name: "Hotels", meta_category_id: 3},
  {name: "Islands", meta_category_id: 3},
  {name: "Golf Courses", meta_category_id: 3}
];

const productsToSeed = [
  {sku: 9154950247, quantity: 1, name: 'Castle in Loire Valley', imageUrl: '/images/castle.jpg', price: 12500000, location: 'France', description: 'Better than a dream-come-true, this Castle and Chateau in the Loire Valley in France is simply one of the finest properties anywhere in Europe. Entirely private and free of any French government landmark rights, this 79 acre (32 hectare) estate features a completely-restored, 33,000 square foot chateau, made up of a 16th century castle that was later expanded to the current chateau in the 18th century. A four-year, recently-completed renovation project has restored the chateau to its original glory. And yet, the conveniences of the modern world have been added, providing all-new electrical, plumbing, heating and electronics. There is so much history attached to the chateau from French royalty to its occupation by German forces in the second world war. Today, the chateau and its surrounding property capture the elegance of yesterday, but with modern living conveniences.', isVisible: 'visible'},
  {sku: 4435561075, quantity: 1, name: 'Penthouse at Ocean Drive', imageUrl: '/images/miami.jpg', price: 6000000, location: 'Miami', description: 'Contemporary lines and a sleek white canvas meets art deco sensibility and beautiful terrazzo floors. The seemingly endless circular terrace hugs this ocean front home illuminating every room with sunshine or moonlight. Over forty five hundred square feet facing the Atlantic Ocean and boasting five spacious bedrooms and five and a half bathrooms, makes this residence one of a kind.'},
  {sku: 7662992825, quantity: 1, name: 'The Bradbury Estate', imageUrl: '/images/bradbury.jpg', price: 72000000, location: 'Sonoma Valley, CA', description: 'This regal masterpiece in guard-gated Bradbury Estates, sits on a promontory with unparalleled city, canyon and ocean views. The location was ranked by Forbes as one of the most expensive ZIP codes in America. This sprawling compound with multiple structures was magnificently realized after more than 8 years of construction by consummate craftsmen with meticulous attention to detail, using only the finest materials from around the world. The Main House is approximately 30,000 square feet plus 3,000 square feet of Loggias, 2 Master Suites, a 2 story Library, Chef’s Kitchen with pizza oven, a walk-in butler’s pantry, both walk-in refrigerator and freezer. Additionally featured is a large 3D Theater, 2,000-bottle Wine Cellar, Elevator, and a poker room with its own bar and built-in humidor. There is close to one acre of porches, decks, loggias, and walkways hewn of French limestone. One is brought to the Main House, elevated in a Palladian Neo-Classical style by way of a dramatic 600-foot Blue Stone private entry drive that ends in a circular flow entrance that allows for 60-foot truck access, or multiple limousines. This once in a lifetime trophy property with the highest level of artistic craftsmanship, state of the art engineering, and consummate attention to detail has never before been offered for sale; it belongs in the portfolio of the most astute collector.'},
  {sku: 7487601920, quantity: 90, name: 'Aerodyne 021', imageUrl: '/images/aerodyne.jpg', manufacturer: 'Richard Mille', price: 272629, description: 'Continuing the expansion and application of truly unique materials to watchmaking, the RM 021 is the first watch created with a composite baseplate utilizing a titanium exterior framework in combination with honeycombed orthorhombic titanium alumide and carbon nanofiber.'},
  {sku: 1598092930, quantity: 50, name: 'Black Caviar Bang',imageUrl: '/images/hublot.jpg', manufacturer: 'Hublot', size: 'Huge', color: 'Black', price: 895860, description: 'Polished black ceramic case with a glossy black alligator strap on black rubber. Fixed ceramic bezel. Black dial with skeletal steel hands. Dial Type: Analog. Date display appears at the 3 o\'clock position. Automatic movement. Scratch resistant sapphire crystal. Case diameter: 41 mm. Deployment clasp. Water resistant at 100 meters/ 330 feet. Functions: hours, minutes, seconds, calendar. Luxury watch style. '},
  {sku: 6848737699, quantity: 30, name: 'Perpetual Calendar Platinum 2499', imageUrl: '/images/patek.jpg',manufacturer: 'Patek Philippe', price: 3483900, description: 'Patek Philippe. An exceptionally fine, rare and important 18K pink gold perpetual calendar chronograph wristwatch with moon phases.'},
  {sku: 5886712343, quantity: 50, name: 'Great Wall of China', imageUrl: '/images/Great-Wall-of-China_05.jpg', price: 10000000, location: 'China, various', description: '"They say you’ll never be able to build a wall. Well, it’s 2,000 miles but we really need 1,000 miles. The Great Wall of China, built 2,000 years ago, is 13,000 miles, folks, and they didn’t have Caterpillar tractors, because I only want to use Caterpillar, if you want to know the truth, or John Deere. … We can do that so beautifully. And this is going to be a serious wall. This is going to be a high wall. This is going to be a very serious wall."'},
  {sku: 7220153663, quantity: 50, name: 'US-Mexico Wall', imageUrl: '/images/fence3.jpg', price: 0, location: 'US Southern Border', description: 'Guess who pays.'},
  {sku: 2118098049, quantity: 50, name: 'The Wall', imageUrl: '/images/game-of-thrones-wall.jpg', price: 70000000, location: 'Westeros', description: 'Winter is Coming, so keep those nasty white walkers at bay with this lovely full-size wall! Night\'s Watch sold separately.'},
  {sku: 2478457506, quantity: 1, name: 'Trump Tower', imageUrl: '/images/homepage-bg-tower.jpg', price: 230000000, location: 'New York, NY', description: 'Could be yours!'},
  {sku: 7909034199, quantity: 1, name: 'Marina Bay Sands', imageUrl: '/images/800px-Marina_Bay_Sands_in_the_evening_-_20101120.jpg', price: 888888888, location: 'Singapore', description: 'Three towers for the price of one!'},
  {sku: 9370961945, quantity: 1, name: 'Big Cash Casino', imageUrl: '/images/bigCashCasino.jpg', price: 64000000, location: 'Atlantic City', description: 'It may come as no surprise that one of Atlantic City’s greatest draws is its casinos. Atlantic City gaming action comes in virtually every variety. Big Cash Casino is your chance to own part of the action!'},
  {sku: 8078504454, quantity: 1, name: 'Sands Casino', imageUrl: '/images/SandsCasino.jpg', price: 100000000, location: 'Las Vegas', description: 'Own the historic Sands!'},
  {sku: 6025238950, quantity: 1, name: 'Turtle Island', imageUrl: '/images/turtle-island.jpg', price: 20000000, location: 'Cayman Islands', description: 'The only island for true turtle lovers!'},
  {sku: 1448780803, quantity: 1, name: 'Madagascar', imageUrl: '/images/baobab-ducks-000060800218_small.jpg', price: 11000000000, location: 'Africa', description: 'Actually a country but sure you can buy it!'},
  {sku: 3525016095, quantity: 1, name: 'Cypress Point', imageUrl: '/images/cypress-point.jpg', price: 250000000, location: 'Pebble Beach, CA', description: 'One of the best golf courses named after a tree.'},
  {sku: 6612167910, quantity: 1, name: 'Augusta National Golf Club', imageUrl: '/images/hole-16_0-1024x64072.jpg', price: 190000000, location: 'Augusta, GA', description: 'Golf course named after little-known ancient Etruscan monarch.'},  
  {sku: 6612167911, quantity: 10, name: 'Learjet 31', imageUrl: '/images/learjet.jpeg', price: 680999, description: 'The Learjet 31 is an American built twin-engined, high speed business jet. Manufactured by Learjet, a subsidiary of Bombardier Aerospace, as the successor to the Learjet 29, it has a capacity of eight passengers and two crew.'},
  {sku: 6612167912, quantity: 2, name: 'Dominator 800', imageUrl: '/images/yacht.jpg', price: 1780789, description: 'If you choose a Dominator, you can be sure that there is no other like yours in the world. What we build for you is as unique as your personality, your dreams and your wishes. A tailormade Dominator enables you to pamper and immerse yourself in a luxury playground by the sea!'},
  {sku: 6612167913, quantity: 2, name: 'Koenigsegg CCXR Trevita', imageUrl: '/images/egg.jpg', price: 4500000, description: 'The CCXR Trevita is a limited edition the CCXR with unique, white carbon fibre body work. Trevita is Swedish for “three whites”. Two Trevita models were produced in 2009.'},
  {sku: 6612167914, quantity: 5, name: 'Ecosse ES1', imageUrl: '/images/bike.jpg', price: 989999, description: 'The unmistakable look, sound and feel of an exclusive ECOSSE machine. Thoughtfully engineered. Handcrafted by artisans. Designed for discerning enthusiasts. Each a study in contrasts: Fierce yet agile. Wicked yet refined. Aggressive with ideal ergonomics. Luxury and performance finally unite.'},
  {sku: 6612167915, quantity: 2, name: 'Airbus Helicopters EC135 P2+', imageUrl: '/images/chopper.jpg', price: 950000, description: 'The Eurocopter EC135 is a twin-engine civil helicopter produced by Airbus Helicopters. It is capable of flight under instrument flight rules and is outfitted with digital flight controls.'},
  {sku: 6612167916, quantity: 5, name: 'Ermenegildo Zegna', imageUrl: '/images/suit.jpg', price: 5000, description: 'Never have to hold the elevator again for guys in cheaper suits!'},
  {sku: 6612167917, quantity: 5, name: 'Stefano Ricci', imageUrl: '/images/tie.jpg', price: 2999, description: 'Stefano Ricci tie in neat diamond pattern. Approx. 3.5" at widest. Silk. Made in Italy. Italian designer Stefano Ricci has been creating extraordinary men\'s clothing for more than 30 years. The Stefano Ricci line is known for exquisitely tailored suits, dress shirts, formal shirts, ties, scarves, cuff links, and more. He seeks to combine the sartorial traditions of Florence with a modern interpretation.'},
  {sku: 6612167918, quantity: 50, name: 'Serene Blue', imageUrl: '/images/square.jpeg', price: 599, description: 'Hand rolled edges. Handmade of 30% Wool/70% Silk. Imported, Dry-clean only.'},
  {sku: 6612167919, quantity: 50, name: 'Vita Liberata', imageUrl: '/images/tanner.jpg', price: 259, description: 'A fast and easy-to-apply, long-lasting, odorless self-tan mousse for a natural-looking, streak-free tan. pHenomenal mousse leaves skin beautifully tanned, amazingly nourished, and healthy-looking for up to two to three weeks.'},
  {sku: 6612167920, quantity: 5, name: 'Men\'s Hairpiece Toupee Coffee', imageUrl: '/images/wig.jpg', price: 420, description: 'Made from the finest Indian hair. Ultra rare, very hard to locate. Excellent for hair salon use.'},
  {sku: 6612167921, quantity: 2, name: 'Litigation Attorney', imageUrl: '/images/lawyer.jpg', price: 18999, description: 'Our attorneys handle cases in all New York and New Jersey state courts as well as cases before the New York Supreme Court, building a solid track record in both commercial and civil litigation. We represent business owners, corporations, consumers, and others in all manner of legal disputes. Our attorneys have even represented individuals who have been victims to serious personal injuries resulting from car accidents, burn injuries, and medical malpractice.'},
  {sku: 6612167922, quantity: 1, name: 'Pascal Duvier', imageUrl: '/images/bodyguard.jpg', price: 19799, description: 'Duvier is the CEO and Chairman for Protect Security, and has plenty of experience working with celebrities. According to his LinkedIn account, his client list includes The Black Eyed Peas, Ciara, David Guetta and Frank Ocean.'},
  {sku: 6612167923, quantity: 1, name: 'Deana Shawnson',imageUrl: '/images/accountant.jpg', price: 12000, description: 'Deana offers professional accounting and tax preparation services to both businesses and individuals in Manhattan and the New York City metropolitan area.'},
  {sku: 6612167924, quantity: 1, name: 'Mr. Smith’s Chauffeur Service',imageUrl: '/images/driver.jpg', price: 32999, description: 'It’s common knowledge that New York City has plenty on offer for its visitors. From the Empire State Building to the Statue of Liberty, the Museum of Modern Art to the galleries of Bushwick, and expensive, specialty restaurants to cozy, family run eateries from all over the world, the city caters for all tastes, budgets, and group sizes – much like Mr. Smith’s chauffeur service. Mr. Smith’s chauffeur service in New York offers drivers that are discreet and highly professional and happy to take you to your destination. Your driver will also be familiar with the city and its surrounds and use the quickest and safest routes to get you where you need to be on time. Whether you need a ride from one side of the city to the other, or would like a pickup at the end of the night after dinner and drinks, Mr. Smith offers an attractive and affordable alternative to a taxi in New York.'},
  {sku: 6612167925, quantity: 1, name: 'Casper Lee',imageUrl: '/images/pilot.Jpeg', price: 69380, description: 'Casper resides in France where he works for the Ministry of Technology and Forward Planning. Casper recently lead a team of Pilots during the France Motor Show execute and operate flawlessly during an event that draws one million attendees over the ten day annual event. Casper has outstanding communication skills and speaks multiple languages. He has Beam hardware and software expertise that positions Casper as a Class 6 rated Beam Pilot.'},
  {sku: 6612167926, quantity: 1, name: 'Colin Bryan',imageUrl: '/images/butler.jpg', price: 28999, description: '\n• Over seven years of experience in providing services as a Butler to the guests\n• Track record of providing excellent customer services to hotel guests\n• Experienced in anticipating guests’ needs and offering to provide before a service is asked for\n• Profound ability to answer queries and resolve concerns of the guests\n• Proficient in managing guests services like food, room service and cleanliness'},
  {sku: 6612167927, quantity: 1, name: 'Jessica Bak',imageUrl: '/images/pr.jpg', price: 16299, description: '"I’m a self-confessed social media addict, so most of my inspiration comes from trawling through various Instagram profiles – I get really excited when I find people with nice visual feed. I scan magazine pages for media coverage on a regular basis, so I get inspiration from fashion spreads."'}
];



const categoryProductsToSeed = [
  {product_sku: 9154950247, category_id: 24},
  {product_sku: 4435561075, category_id: 24},
  {product_sku: 7662992825, category_id: 24},
  {product_sku: 7487601920, category_id: 17},
  {product_sku: 1598092930, category_id: 17},
  {product_sku: 6848737699, category_id: 17},
  {product_sku: 5886712343, category_id: 25},
  {product_sku: 7220153663, category_id: 25},
  {product_sku: 2118098049, category_id: 25},
  {product_sku: 2478457506, category_id: 27},
  {product_sku: 7909034199, category_id: 27},
  {product_sku: 9370961945, category_id: 26},
  {product_sku: 8078504454, category_id: 26},
  {product_sku: 6025238950, category_id: 28},
  {product_sku: 1448780803, category_id: 28},
  {product_sku: 3525016095, category_id: 29},
  {product_sku: 6612167910, category_id: 29},
  {product_sku: 6612167911, category_id: 19},
  {product_sku: 6612167912, category_id: 20},
  {product_sku: 6612167913, category_id: 21},
  {product_sku: 6612167914, category_id: 22},
  {product_sku: 6612167915, category_id: 23},
  {product_sku: 6612167916, category_id: 13},
  {product_sku: 6612167917, category_id: 14},
  {product_sku: 6612167918, category_id: 15},
  {product_sku: 6612167919, category_id: 16},
  {product_sku: 6612167920, category_id: 18},
  {product_sku: 6612167921, category_id: 6},
  {product_sku: 6612167922, category_id: 7},
  {product_sku: 6612167923, category_id: 8},
  {product_sku: 6612167924, category_id: 9},
  {product_sku: 6612167925, category_id: 10},
  {product_sku: 6612167926, category_id: 11},
  {product_sku: 6612167927, category_id: 12}
];

const usersToSeed = [
  {firstName: 'Ad', lastName: 'Min', isAdmin: true, email: 'admin@admin.com', password: '123456', stripe_user_id: "cus_9WJPbG2Wzb2MBd"},
  {firstName: 'Barack', lastName: 'Obama', email: 'barack@example.gov', password: '123456', stripe_user_id: "cus_9WJPeESETNf406"},
  {firstName: 'Porkchop', lastName: 'Dog', email: 'dogface@pupper.com', password: '555555', stripe_user_id: "cus_9WJQrOLyAHri10"},
  {firstName: 'Simba', lastName: 'Matata', email: 'king@priderock.com', password: '123456', stripe_user_id: "cus_9WJQ93UCLoiPPp"},
  {firstName: 'Elsa', lastName: 'Bush', email: 'missionaccomplished@disney.com', password: '999999'},
  {firstName: 'Yeezy', lastName: 'West', email: 'shyboy77@hotmail.com', password: 'tswift'}
];

const reviewsToSeed = [
  {text: 'Wow this product was so amaze, love it, lulz', summary: 'best thing ever', stars: 5, user_id: 1, date: '2016-10-31', product_sku: productsToSeed[0].sku},
  {text: 'Worst thing ever, will never buy, terrible', summary: 'THE WORST', stars: 1, user_id: 2, date: '2016-08-19', product_sku: productsToSeed[0].sku},
  {text: 'This changed my life, hooray, I have no soul', summary: 'meh', stars: 3, user_id: 3, date: '2016-01-03', product_sku: productsToSeed[1].sku},
  {text: 'This product has ALL the best things', summary: 'Love it!', stars: 5, user_id: 2, date: '2016-09-24', product_sku: productsToSeed[1].sku},
  {text: 'Decided to write this review instead of tweeting about this product', summary: 'loser product', stars: 2, user_id: 4, date: '2015-04-04', product_sku: productsToSeed[2].sku}
];

const addressesToSeed = [
  {name: 'Alec Friedman', street1: '55 Comm Ave', street2: 'Apt 6A', city: 'Boston', state: 'MA', zip: '02140', user_id: 1},
  {name: 'Barack Obama', street1: '29 Mass Ave', street2: 'Unit 8', city: 'Boston', state: 'MA', zip: '02140', user_id: 2},
  {name: 'Porkchop Dog', street1: '100 W 99 St', street2: 'Floor 3 Office 12', city: 'New York', state: 'NY', zip: '10020', user_id: 3},
  {name: 'Jordan Lysenko', street1: '12 Main St', city: 'Omaha', state: 'NE', zip: '34242', user_id: 4},
  {name: 'Donald J Trump', street1: 'White', street2: 'House', city: 'Washington', state: 'DC', zip: '90210', user_id: 4},
  {name: 'Hillary Diane Rodham', street1: 'Rikers', city: 'New York City', state: 'NY', zip: '11111', user_id: 5},
  {name: 'FSA', street1: '5 Hanover Sq', city: 'Manhattan', state: 'NY', zip: '10000', user_id: 5}
];

const ordersToSeed = [
  {status: 'shipped', submitDate: '2016-10-01', user_id: '1', address_id: '1', payment_id: 'ch_19DH9vKnanyZJ3ptI0EhIYDk'},
  {status: 'shipped', submitDate: '2016-09-28', user_id: '1', address_id: '2', payment_id: '2'},
  {status: 'pending', submitDate: '2016-10-28', user_id: '2', address_id: '3', payment_id: '2'},
  {status: 'delivered', submitDate: '2016-10-22', user_id: '2', address_id: '4', payment_id: '3'},
  {status: 'delivered', submitDate: '2016-01-31', user_id: '3', address_id: '5', payment_id: '3'},
  {status: 'refunded', submitDate: '2016-08-15', user_id: '3', address_id: '5', payment_id: '4'},
  {status: 'partially shipped', submitDate: '2016-11-01', user_id: '4', address_id: '6', payment_id: '5'}
];

const orderItemsToSeed = [
  {status: 'shipped', quantity: 1, priceAtPurchase: 250000, shippingDate: '2016-10-03', receiveDate: '2016-10-10', taxCost: 28000, shippingCost: 7.99, itemCost: 250000,  product_sku: 7487601920, order_orderNumber: 1},
  {status: 'shipped', quantity: 2, priceAtPurchase: 150, shippingDate: '2016-11-03', receiveDate: '2016-11-10', taxCost: 11, shippingCost: 7.99, itemCost: 100,  product_sku: 9154950247, order_orderNumber: 1}
];


const seedCategories = () => db.Promise.mapSeries(categoriesToSeed, category => db.model('categories').create(category));
const seedUsers = () => db.Promise.mapSeries(usersToSeed, user => db.model('users').create(user));
const seedReviews = () => db.Promise.mapSeries(reviewsToSeed, review => db.model('reviews').create(review));
const seedProducts = () => db.Promise.mapSeries(productsToSeed, product => db.model('products').create(product));
const seedAddresses = () => db.Promise.mapSeries(addressesToSeed, address => db.model('addresses').create(address));
const seedCategoryProducts = () => db.Promise.mapSeries(categoryProductsToSeed, categoryProduct => db.model('CategoryProduct').create(categoryProduct));
const seedOrders = () => db.Promise.mapSeries(ordersToSeed, order => db.model('orders').create(order));
const seedOrderItems = () => db.Promise.mapSeries(orderItemsToSeed, order_item => db.model('order_items').create(order_item));


db.didSync
  .then(() => db.sync({force: true}))
  .then(seedCategories)
  .then(categories => console.log(`Seeded ${categories.length} categories OK`))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .then(seedCategoryProducts)
  .then(categoryProducts => console.log(`Seeded ${categoryProducts.length} categoryProducts OK`))
  .then(seedReviews)
  .then(reviews => console.log(`Seeded ${reviews.length} reviews OK`))
  .then(seedAddresses)
  .then(addresses => console.log(`Seeded ${addresses.length} addresses OK`))
  .then(seedOrders)
  .then(orders => console.log(`Seeded ${orders.length} orders OK`))
  .then(seedOrderItems)
  .then(orderItems => console.log(`Seeded ${orderItems.length} orderItems OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
