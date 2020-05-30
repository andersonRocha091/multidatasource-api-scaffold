// docker ps
// docker exec -it 3d7a6a626990 /
//     mongo -u anderson -p anderson --authenticationDatabase heroes

show dbs 
use heroes

show collections

db.heroes.insert({
    nome:'Fash',
    poder:'Velocidade',
    dataNascimento:'1998-01-01'
})

db.heroes.find().pretty()

for (let index = 0; index < 1000000; index++) {
    db.heroes.insert({
        nome:`Clone-${index}`,
        poder:'Velocidade',
        dataNascimento:'1998-01-01'
    })
    
}


db.heroes.find({},{poder:1,_id:0})
db.heroes.insert({
    nome:`Clone-${index}`,
    poder:'Velocidade',
    dataNascimento:'1998-01-01'
})

db.heroes.update({_id:ObjectId("5ecd72b028c8b96d7caac815")},{nome:'Flash'})

db.heroes.update({_id:ObjectId("5ecd735d28c8b96d7caac828")},{$set:{nome:'Lanterna Verde'}})

db.heroes.update({poder:'Velocidade'},{$set:{poder:'super força'}})


db.heroes.remove({})
