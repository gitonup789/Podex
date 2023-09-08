const express = require('express');
const app = express();
const port = 3001;
const pokedex = require('./database.js')

app.use(express.json())

app.get('/pokemon', (req, res) => {
  console.log(pokedex)
    res.send(pokedex);
});

app.get('/type/:type', (req, res) => {
 
  for(let i = 0; i < pokedex.length; i++) {
      // Path parameters are always strings
      if(pokedex[i].type == req.params.type) { 
          console.log(pokedex[i]);
          // We can use the splice method to delete from an array
          res.send(pokedex[i]);
      }
  }
});

app.post('/database', (req, res) => {

  const newPokemon = {
    name: req.body.name,
    hp: req.body.hp,
    id: req.body.id
    
  }
  
  pokedex.push(newPokemon)
  res.send(pokedex)
  console.log(pokedex)
})
  
    
app.delete('/pokemon/:id', (req, res) => {
  
  // Pokedex contents before API call
  let deletedPokemon = {}
  for(let i = 0; i < pokedex.length; i++) {
      // Path parameters are always strings
      if(pokedex[i].id == req.params.id) {
          console.log('Deleting pokemon');
          // We can use the splice method to delete from an array
          deletedPokemon = pokedex.splice(i, 1);
      }
  }
  res.send(deletedPokemon);
})

app.put('/pokemon/:id',(req, res) =>{
  let id = req.params.id
  let updatedData = req.body.hp;
  // use for loop to make dynamic
  for(let i = 0; i < pokedex.length; i++) {
    if(pokedex[i].id == id) { 
      pokedex[i].hp = updatedData
        console.log(pokedex[i]);
        res.send(pokedex[i]);
      }
    }
  })
app.listen(port)