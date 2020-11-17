const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB =  async() => {
    await Campground.deleteMany({});
    for (let i=0; i<300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author: '5faaffd68c517d7a4af7bc7c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi porro quos quas distinctio velit nihil illum? Ut accusantium a cupiditate necessitatibus maiores culpa? Soluta velit ullam nulla nemo sequi placeat.',
            price,
            geometry: {
                type: "Point",
                coordinates : [ cities[random1000].longitude, cities[random1000].latitude ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dfcxbremq/image/upload/v1605199097/YelpCamp/hqqxtnswk9xzgj1lttca.jpg',
                    filename: 'YelpCamp/hqqxtnswk9xzgj1lttca'
                },
                {
                    url: 'https://res.cloudinary.com/dfcxbremq/image/upload/v1605199094/YelpCamp/h0lh8bzkntzdre8secxm.jpg',
                    filename: 'YelpCamp/h0lh8bzkntzdre8secxm'
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close();
});