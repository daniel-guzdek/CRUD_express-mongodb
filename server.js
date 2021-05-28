var cookieSession = require('cookie-session');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb');
const exphbs = require('express-handlebars');
const Handlebars = require("handlebars");
const morgan = require('morgan');

const PORT = process.env.PORT || 3000;
const app = express();

// log requests
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

// mongodb connection
const connectDB = require('./database/connection');
connectDB();

// load assets
app.use('/css', express.static(path.resolve(__dirname, "public/css")));
app.use('/img', express.static(path.resolve(__dirname, "public/img")));
app.use('/js', express.static(path.resolve(__dirname, "public/js")));

// cookie-session
// app.use(cookieSession({
//   name: 'session',
//   keys: ['MYKEY'],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))

// load routers
app.use('/', require('./routes/router'));

// set view engine
app.set('views', path.join(__dirname, '/views/'));
app.engine('handlebars', exphbs({extname: 'handlebars', defaultLayout: 'index', layoutsDir: __dirname + '/views/' }));
app.set('view engine', 'handlebars');

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
})

// async function main() {
//   const uri = `mongodb+srv://admin:admin123@cluster0.yyszp.mongodb.net/ProgrammersDB?retryWrites=true&w=majority`;
//   const client = new MongoClient(uri, {useUnifiedTopology: true});
  
//   try {
//     await client.connect();
//     // TUTAJ BĘDĄ WYWOŁYWANE FUNKCJE NAPISANE PONIŻEJ

//     // 1. function
//     // await listDatabases(client);

//     // 2. function
//     // await createListing(client, {
//     //   name: "Lovely loft",
//     //   summary: "Lovely loft in Dublin",
//     //   bedrooms: 1,
//     //   bathrooms: 1
//     // });

//     // 3. function
//     // await createMultipleListings(client, 
//     //   [
//     //     {
//     //       name: "Wonderful views",
//     //       summary: "Relaxing place in London",
//     //       bedrooms: 2,
//     //       bathrooms: 6
//     //     },
//     //     {
//     //       name: "Cosy place on the Miami Beach",
//     //       summary: "Beatifull apartment in Miami",
//     //       bedrooms: 4,
//     //       bathrooms: 1.5
//     //     },
//     //     {
//     //       name: "Wadowice Surprice",
//     //       summary: "Awfull basement in Wadowice",
//     //       bedrooms: 0,
//     //       bathrooms: 1
//     //     }
//     //   ])

//     // 4. function
//     // await findOneListingByName(client, "Wadowice Surprice");

//     // 5. function
//     // await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
//     //   minimumNumberOfBedrooms: 1,
//     //   minimumNumberOfBathrooms: 2,
//     //   maximumNumberOfResults: 5
//     // })

//     // 6. function find a potem update. A więc:
//     // await findOneListingByName(client, "Wadowice Surprice");
//     // a następnie uktualizuj np. liczbę łóżek i sypialni
//     // await updateListingByName(client, "Wadowice Surprice", {bathrooms: 9, beds: 144, last_scraped: new Date().toLocaleDateString() });
//     // await findOneListingByName(client, "Wadowice Surprice");

//     // 7. function upsert
//     // await findOneListingByName(client, "Cozy Cottage");
//     // await upsertListingByName(client, "Cozy Cottage", { name: "Cozy Cottage", bedrooms: 16, bathrooms: 300 })

//     // 8.function updateMany
//     // await updateAllListingsToHavePropertyType(client);

//     // 9. function delete
//     // await deleteListingByName(client, "Cozy Cottage");

//     // 10. function deleteMany z datą wcześniejszą niż np. 2021-05-05
//     // await deleteListingsScrapedBeforeDate(client, new Date("2021-05-07"));

//   } catch (e) {
//     console.error(e)
//   } finally {
//     await client.close();
//   }

// const db = client.db('ProgrammersDB');
// const programmers = db.collection('programmers');
// }

// main().catch(console.err);

// // async function deleteListingsScrapedBeforeDate(client, date) {
// //   const result = await client.db("StoreDB").collection("store").deleteMany({ "last_scraped": {$lt: date} });

// //   console.log(`${result.deletedCount} document(s) was/were deleted`);
// // }

// // async function deleteListingByName(client, nameOfListing) {
// //   const result = await client.db("StoreDB").collection("store").deleteOne({ name: nameOfListing });

// //   console.log(`${result.deletedCount} document(s) was/were deleted`);
// // }

// // async function updateAllListingsToHavePropertyType(client) {
// //   const result = await client.db("StoreDB").collection("store").updateMany({ property_type: {$exists: false} }, {$set: {property_type: "Unknown"}});

// //   console.log(`${result.matchedCount} document(s) matched the query criteria.`);
// //   console.log(`${result.modifiedCount} document(s) was/were updated.`);
// // }


// // // upsert to trzeci parametr w metodzie ,,upsertOne". Zobacz dokumentację MongoDB. 
// // // Jeśli nie znalazł danego rekordu, to powiadamia o tym i dodaje taki rekord. A jeśli znalazł, to go aktualizuje.
// // async function upsertListingByName(client, nameOfListing, updatedListing) {
// //   const result = await client.db('StoreDB').collection('store').updateOne(
// //     { name: nameOfListing },
// //     { $set: updatedListing },
// //     { upsert: true }
// //   )

// //   console.log(`${result.matchedCount} document(s) matched the query criteria.`);

// //   if(result.upsertedCount > 0) {
// //     console.log(`One document was inserted with the id ${result.upsertedId._id}`);
// //   } else {
// //     console.log(`${result.modifiedCount} document(s) was/were updated.`);
// //   }
// // }

// // async function updateListingByName(client, nameOfListing, updatedListing) {
// //   const result = await client.db('StoreDB').collection('store').updateOne(
// //     { name: nameOfListing },
// //     { $set: updatedListing }
// //   )
// //   console.log(`${result.matchedCount} document(s) matched the query criteria.`);
// //   console.log(`${result.modifiedCount} documents was/were updated.`);
// // }

// async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
//   minimumNumberOfBedrooms = 0,
//   minimumNumberOfBathrooms = 0,
//   maximumNumberOfResults = Number.MAX_SAFE_INTEGER
// } = {}) {
//   const cursor = client.db('StoreDB').collection('store').find({
//     bedrooms: { $gte: minimumNumberOfBedrooms },
//     bathrooms: { $gte: minimumNumberOfBathrooms } 
//   })
//   .sort( { last_review: -1 } )
//   .limit(maximumNumberOfResults);

// //   const results = await cursor.toArray();
// //   if(results.length > 0) {
// //     console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms.`);
// //     results.forEach((result, i) => {
// //       date = new Date(result.last_review).toDateString();

// //       console.log();
// //       console.log(`${i + 1}. name: ${result.name}`);
// //       console.log(`  _id: ${result._id}`);
// //       console.log(`   bedrooms: ${result.bedrooms}`);
// //       console.log(`   bathrooms: ${result.bathrooms}`);
// //       console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
// //     })
// //   }
// // }

// // async function findOneListingByName(client, nameOfListing) {
// //   const result = await client.db('StoreDB').collection('store').findOne({name: nameOfListing});
// //   // wszystko jest w dokumentacji MongoDB jakie argumenty przyjmuje funkcja ,,findOne"
// //   if(result) {
// //     console.log(`Found a listing in the collection with the name '${nameOfListing}'`);
// //     console.log(result);
// //   } else {
// //     console.log(`No listings found with the name '${nameOfListing}'`);
// //   }
// // }

// // async function createMultipleListings(client, newListings) {
// //   const result = await client.db('StoreDB').collection('store').insertMany(newListings);
// //   console.log(`${result.insertedCount} new listing(s) created with following id(s):`);
// //   console.log(result.insertedIds);
// // }

// // async function createListing(client, newListing) {
// //   const result = await client.db('StoreDB').collection('store').insertOne(newListing);
// //   console.log(`New listing created with following id: ${result.insertedId}`);
// // }

// async function listDatabases(client) {
//   const databasesList = await client.db().admin().listDatabases();
  
//   // databasesList.databases.forEach(db =>)


//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`))
// }