"use strict"; 

//////////////____________________ Kod below works as i should______________ \\\\\\\\\\\\\

// fucntion creating a new person object and returns it 
function createNewPeson (name, age, gender, crossfitExersice) {
   
    // person and diffrent objects 
    let person = {
        name: name, 
        age: age, 
        gender: gender,
        crossfitExersice: crossfitExersice,
    };

    console.log(person);

    return person;
}

// Add the newly create person to database
function addNewPersonToDatabase(database, person) {
    //person gets pushed to the database
    database.push(person);
    console.log(database);
}

// Render a persons object into a html Element;
function renderPerson (person) {
    // Creating a div and applying class and that the div.id is eual to the person id.
    let div = document.createElement("div");
    div.classList.add("person");
    div.id = person.id

    // with in the div we apply four divs with information about person and a remove button.
    div.innerHTML = `<div>${person.name}</div>
    <div>${person.age}</div>
    <div>${person.gender}</div>
    <div>${person.crossfitExersice}</div>
    <button type="button" class="button-action-remove"> Remove </button>`;

    return div;
}


// Render an array of persons into html
function rederPersons (persons) {
    // varibal gets assingd to get element by id. 
    let personsElement = document.getElementById("persons");
    // every time the function is called it does not add the person list again. 
    personsElement.innerHTML = "";

    // Goes fro all the persons and insert their html
    for (let person of persons) { 
        let personElement = renderPerson(person);
        personsElement.appendChild(personElement);
    }
}


//////////////____________________ Kod below works as it should______________ \\\\\\\\\\\\\


// Removes preson from database baste on the id 
function removePersonFromDatabaseById (persons, id) {
    for (let i = 0; i < persons.length; i++) {
        let person = persons[i];
            
        if (person.id == id) {
            persons.splice(i, 1);

            console.log(person)
            return;
        }
    }
}

function getPersonsByTheAge(persons, age) {

    let personsAge = [];

    for (let person of persons) {
        if (person.age == age) {
            personsAge.push(person);
        }
    }


    return personsAge;
}

function getTheAverageAgeOfPeople (persons) {

    let averageSumOfYears = 0; 

    for (let person of persons) {
        averageSumOfYears = averageSumOfYears + person.age;
    }

    return averageSumOfYears / persons.length;
}

//////////////____________________ Kod blow works as it should______________ \\\\\\\\\\\\\

function addPersonOnSubmit (event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;
    let crossfitExersice = document.getElementById("crossfit-preferd").value;

    let person = createNewPeson(name, age, gender, crossfitExersice);

    person.id = dataBase[dataBase.length - 1].id + 1; 

    // Global database   
    addNewPersonToDatabase(dataBase, person);
    rederPersons(dataBase);
 

    let form = document.getElementById("add-person-to-form");
    form.reset();
    
}

function setAddPerssonHandler () {
    let form = document.getElementById("add-person-to-form");
    form.addEventListener("submit", addPersonOnSubmit);
}

//////////////____________________ Continue coind under______________ \\\\\\\\\\\\\



//direct kod 
rederPersons(dataBase);
setAddPerssonHandler();



//////////////____________________ Code under extra work______________ \\\\\\\\\\\\\
let challenges = ["Murph", "EMOM", "Cindy", "Karen", "Hansen", "Bert", "Angie"];

function chalangeChange(){
    let chanalngeDivBox = document.createElement("div")
    chanalngeDivBox.innerHTML = "Press to get a random challang to do today!";
    chanalngeDivBox.style.fontSize = "30px"
    document.querySelector("#color-header").appendChild(chanalngeDivBox);

    chanalngeDivBox.addEventListener("click", function(){
        let challange = Math.floor(Math.random()*(challenges.length));
        chanalngeDivBox.innerHTML = challenges[challange];
    });
}

chalangeChange();
