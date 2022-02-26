"use strict"; 

// Create a new person object and returns it 
function createNewPeson (name, age, gender, crossfitExersice) {
   
    let person = {
        name: name, 
        age: age, 
        gender: gender,
        crossfitExersice: crossfitExersice,
    };

    console.log(person);

    return person;
}

// Add the new person to database
function addNewPersonToDatabase(database, person) {
    database.push(person);
    console.log(database);
}

// Render a persons object into a html Element;
function renderPerson (person) {
    let div = document.createElement("div");
    div.classList.add("person");
    div.id = person.id

    div.innerHTML = `<div>${person.name}</div>
    <div>${person.age}</div>
    <div>${person.gender}</div>
    <div>${person.crossfitExersice}</div>
    <button type="button" class="button-action-remove"> Remove </button>`;

    return div;
}


// Render an array of persons into html
function rederPersons (persons) {
    let personsElement = document.getElementById("persons");
    personsElement.innerHTML =   "";

    // Goes fro all the persons and insert their html
    for (let person of persons) { 
        let personElement = renderPerson(person);
        personsElement.appendChild(personElement);
    }
}


//////////////____________________ Ovan för fungerar som det ska______________ \\\\\\\\\\\\\


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

//////////////____________________ Ovan för fungerar som det ska______________ \\\\\\\\\\\\\

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


//direct kod 
rederPersons(dataBase);
setAddPerssonHandler();