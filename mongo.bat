LEVANTAR SERVIDOR:
cd C:\Program Files\MongoDB\Server\4.0\bin
mongod --dbpath c:\node\workshoptdc\data\

EXECUTAR COMANDOS:
cd C:\Program Files\MongoDB\Server\4.0\bin
mongo

COMANDOS:
use workshoptdc
db.customers.insert({ "nome" : "Gabriel", "idade" : 25 })
custArray = [{ "nome" : "Thiago", "idade" : 21 }, { "nome" : "Luiz", "idade" : 22 }, { "nome" : "Teste", "idade" : 99 }]
db.customers.insert(custArray);
db.customers.find().pretty()