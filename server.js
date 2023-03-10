const express = require("express");
const app = express();
const ejs = require('ejs');
const pokemon = require("./models/pokemon.js");
const port = 3001;
const methodOverride = require("method-override");

///mounting middleware used to keep the site running. 
app.use(express.urlencoded({ extended: true })); //false interprets as string then goes to object , true actually sends as an obejct 
app.use(methodOverride("_method")); //this middleware install allows us to use a post as a delete
app.use((req, res, next) => {
  // takese reequest and interrcepts response on theh way out
  console.log("i run for all the routes");
  console.log(req.body);
  next();
});

// css page linking
app.use(express.static('.'));




// INDEX
app.get("/pokemon", (req, res) => {
    res.render("index.ejs", {
        pokeDex: pokemon
    });
  
});

////n
//logs a pokemon i believe
app.get("/pokemon/new", (req, res) => {
  res.render("new.ejs");
}); 




////d
app.delete("/pokemon/:indexOfPokemonArray", (req, res) => {
  pokemon.splice(req.params.indexOfPokemonArray, 1); //removes 1 item from indexOfFruits
  res.redirect("/pokemon");
}); 




// //u is for Update were just updating tthe obecjts of the array 
// app.put('/pokemon/:indexOfPokemonArray', (req, res) => {
//   // if (req.body.readyToEat === "on") {
//   //    req.body.readyToEat = true ////// need this for if i will use a checkbox later
//   // } else {
//   //     req.body.readyToEat = false
//   // }
//   let stats = {
//     hp: req.body.hp,
//     attack: req.body.attack,
//     defense: req.body.defense,
//     spattack: req.body.spattack,
//     spadefense: req.body.spdefense,
//     speed: req.body.speed,
//   };
//   let editedPokemon = {
//     name: req.body.name,
//     img: req.body.img,
//     type: req.body.type,
//     stats,
//   };
//   pokemon[req.params.indexOfPokeDexArray]=req.body
//   // pokemon[req.params.id] = Object.assign(editedPokemon.req.body )  //updated req.body;

//   res.redirect("/pokemon");
//   //what is req.body req. the array object FRuits is now in the fruits array
// })
//updated update 


app.put("/pokemon/:indexOfPokemonArray", (req, res) => {
  // if (req.body.readyToEat === "on") {
  //    req.body.readyToEat = true ////// need this for if i will use a checkbox later
  // } else {
  //     req.body.readyToEat = false
  //

     let stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
    spattack: req.body.spattack,
    spadefense: req.body.spdefense,
    speed: req.body.speed,
  };
  let editedPokemon = {
    name: req.body.name,
    img: req.body.img,
    type: req.body.type,
    stats,
  };

  pokemon[req.params.indexOfPokemonArray] = req.body;
  res.redirect("/pokemon");
  //what is req.body req. the array object FRuits is now in the fruits array
});




////create
app.post("/pokemon", (req, res) => { //this is the line that will post to the url 
//   if (req.body.readyToEat === "on") {
//     req.body.readyToEat = true;
//   } else {
//     req.body.readyToEat = false; ////// if i want to add a checkbox latere i need to keep this logic 
//   }
  //creates
  console.log(req.body);
  // res.send("data recieved")
  pokemon.push(req.body); //pushes info into body of my first pokemon page as specifieed below
  res.redirect("/pokemon"); //sends
  console.log(req)
}); 



////edit
app.get('/pokemon/:indexOfPokeDexArray/edit', (req, res) => {
    res.render('edit.ejs', {
        pokeDex: pokemon[req.params.indexOfPokeDexArray],
        pokeIndex: req.params.indexOfPokeDexArray,
    })
} )

////s
// SHOW
app.get("/pokemon/:id", (req, res) => {
    res.render("show.ejs", { pokeDex: pokemon[req.params.id] });
    
});

///listener

app.listen(port, () => { console.log(`pokedex is live on port ${port}`) });
