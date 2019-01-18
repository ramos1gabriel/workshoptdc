var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/workshoptdc")
            .then(conn => global.conn = conn.db("workshoptdc"))
            .catch(err => console.log(err))
 
/* LISTAR */
function findAll(callback){  
    global.conn.collection("customers").find({}).toArray(callback);
}

/* CADASTRO */
function insert(customer, callback){
    global.conn.collection("customers").insert(customer, callback);
}

/* CONSULTA */
var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("customers").find(new ObjectId(id)).toArray(callback);
}

/* UPDATE */
function update(id, customer, callback){
    global.conn.collection("customers").replaceOne({_id:new ObjectId(id)}, customer, callback);
}

/* DELETE */
function deleteOne(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne }