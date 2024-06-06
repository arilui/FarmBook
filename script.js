
/*
Follows instructions from MongoDB by Lauren Schaefer (https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database)
*/
/*
let userCount=0;
const {MongoClient}=require('mongodb');

//initialize database
async function main(){
  const uri =   mongodb+srv:dbUser:passw0rd@farmbook.rsj9viv.mongodb.net/retryWrites=true&w=majority&appName=FarmBook
  const client = new MongoClient(uri);
  try{
    await client.connect();
    await listDatabases(client);
  }
  catch(e){
    console.error(e);
  }
  finally{
    await client.close();
  }
}

//main().catch(client.error); //catch any errors

//get a list of all databases
async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:")
  databasesList.databases.forEach(db => console.log(`- ${db.name}`));
}


function searchForProduct(){
  //read search bar

  //search database for product

  //update page with products

  //OR display error message
}
*/