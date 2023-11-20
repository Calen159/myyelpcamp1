const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const campground = require('../models/campground');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true, --not supported anymore
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '654e16c93f91dc9db623dc56',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: "https://source.unsplash.com/random/?camping",
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam nesciunt commodi fuga, corporis, quasi facere molestias alias harum provident expedita nemo sed rem quibusdam aliquam ducimus. Optio cupiditate veritatis error?',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dl06fz6ye/image/upload/v1699860493/myyelpcamp/xnjja6mivdwnol1xcdrk.jpg',
                    filename: 'myyelpcamp/xnjja6mivdwnol1xcdrk',
                },
                {
                    url: 'https://res.cloudinary.com/dl06fz6ye/image/upload/v1699860493/myyelpcamp/snnq7bpy2ve0vtyijb2i.jpg',
                    filename: 'myyelpcamp/snnq7bpy2ve0vtyijb2i',
                },
                {
                    url: 'https://res.cloudinary.com/dl06fz6ye/image/upload/v1699860495/myyelpcamp/xilsunggn8kdwj6sw8g3.jpg',
                    filename: 'myyelpcamp/xilsunggn8kdwj6sw8g3',
                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})