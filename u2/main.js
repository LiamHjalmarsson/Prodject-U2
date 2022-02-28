"use strict"; 

//////////////____________________ code below works as i should______________ \\\\\\\\\\\\\

// fucntion creating a new person object and returns it 
function createNewPeson (name, age, gender, crossfitExersicePreferd, crossfitExersiceWorst) {
   
    // person and diffrent objects 
    let person = {
        name: name, 
        age: age, 
        gender: gender,
        crossfitExersicePreferd: crossfitExersicePreferd,
        crossfitExersiceWorst: crossfitExersiceWorst,
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
    div.innerHTML = `
    <div>${person.name}</div>
    <div>${person.age}</div>
    <div>${person.gender}</div>
    <div>${person.crossfitExersicePreferd}</div>
    <div>${person.crossfitExersiceWorst}</div>
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

    removePersonHandelere();
}



//////////////____________________ code below works as it should______________ \\\\\\\\\\\\\

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



// function getTheAverageAgeOfPeople (persons) {

//     let averageSumOfYears = 0; 

//     for (let person of persons) {
//         averageSumOfYears = averageSumOfYears + person.age;
//     }

//     return averageSumOfYears / persons.length;
// }



//////////////____________________ code below works as it should______________ \\\\\\\\\\\\\

function addPersonOnSubmit (event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let age = Number(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;
    let crossfitExersicePreferd = document.getElementById("crossfit-preferd").value;
    let crossfitExersiceWorst = document.getElementById("crossfit-worst").value;

    let person = createNewPeson(name, age, gender, crossfitExersicePreferd, crossfitExersiceWorst);

    if (dataBase.length = dataBase.length) {
    person.id = dataBase[dataBase.length - 1].id + 1; 
    } 
    else {
    person.id = 1; 
    }

    if(name == "") {
        alert("You did not fill in your name");
    }
    else if (age == "") {
        alert("You did not fill in your age");
    }
    else if (gender == "") {
        alert("You did not fille in your gender");
    }
    else if (crossfitExersicePreferd == "") {
        alert("You did not fill in your exercies");
    }
    else if (crossfitExersiceWorst == "") {
        alert("You did not fill in your worst exercies")
    }
    else 
    {
            // Global database   
        addNewPersonToDatabase(dataBase, person);
        rederPersons(dataBase);
        upUpdateAverage();

        let form = document.getElementById("add-person-to-form");
        form.reset();
    }
}

function setAddPerssonHandler () {
    let form = document.getElementById("add-person-to-form");
    form.addEventListener("submit", addPersonOnSubmit);
}

//////////////____________________ Continue continue under on the exerciess needed______________ \\\\\\\\\\\\\


//Delete function deletes but dosent change the average year

// When a user clicks the remove-dog-button
function onRemoveDeletePersonOnClick(event) {
    let button = event.target;
    let id = button.parentElement.id;
    // Uses the global variable `database`
    removePersonFromDatabaseById(dataBase, id);
    // Re-render (without the newly deleted dog)
    rederPersons(dataBase);
    upUpdateAverage();
    
}

// Add "click" event handler to all remove-buttons
function removePersonHandelere() {
    let buttons = document.querySelectorAll(".person button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveDeletePersonOnClick);
    }
}




//direct code 
rederPersons(dataBase);
setAddPerssonHandler();
upUpdateAverage();



//////////////____________________ code under countes the average on all people in database______________ \\\\\\\\\\\\\

function getTheAverageAgeOfPeople (persons) {

    let averageSumOfYears = 0; 

    for (let person of persons) {
        averageSumOfYears = averageSumOfYears + person.age;
    }

    return Math.round(averageSumOfYears / persons.length);
}   


function upUpdateAverage(){
    let averageAge = document.getElementById("addVAlue");

    averageAge.innerHTML = "";

    for (let i = 0; i < dataBase.length; i++){
        averageAge.innerHTML = getTheAverageAgeOfPeople(dataBase);
    }
    
}


//////////////____________________ Code Function oritanting pepole by age etc ______________ \\\\\\\\\\\\\

function getPersonsByTheAge(persons, age) {

    let personsAge = [];

    for (let person of persons) {
        if (person.age == age) {
            personsAge.push(person);
        }
    }

    return personsAge;
}

function getPeopleByGender (persons, gender) {

    let genderOfpeople = []; 

    for (let person of persons) {
        if (person.gender == gender) {
            genderOfpeople.push(person);
        }
    }
    return genderOfpeople;
}

function getPeopleByPreferd (persons, crossfitExersicePreferd) {

    let crossfitExersicePreferd = []; 

    for (let person of persons) {
        if (person.crossfitExersicePreferd == crossfitExersicePreferd) {
            crossfitExersicePreferd.pssuh(person);
        }
    }
    return crossfitExersicePreferd;
}

function filterPepoleByAge (event) {
    event.preventDefault(); 

    let ageOfPeople = document.getElementById("filer-age").value;

    let people = getPersonsByTheAge(dataBase, ageOfPeople);

    rederPersons(people);
}

function filterPeopleByGender (event) {
    event.preventDefault();

    let genderOfpeople = document.getElementById("filer-gender").value;

    let people = getPeopleByGender(dataBase, genderOfpeople); 

    rederPersons(people);
}

function filterPepoleHandelers () {
    let ageForm = document.getElementById("filter-by-age");
    let genderForm = document.getElementById("filter-by-gender");
    let refreshSeeAll = document.getElementById("show-all");


    ageForm.addEventListener("submit", filterPepoleByAge);
    genderForm.addEventListener("submit", filterPeopleByGender);
    refreshSeeAll.addEventListener("click", ShowAllOnClick);
}





filterPepoleHandelers();



///////////////___________________Code under Show All_________________\\\\\\\\\\\\\

function ShowAllOnClick() {
    document.getElementById("filer-by-age").value = "";

    rederPersons(dataBase);
}

//////////////____________________ Code under extra work______________ \\\\\\\\\\\\\
let challenges = ["Murph", "Cindy", "Karen", "Hansen", "Bert", "Angie", "Fran", "Clovis", "Nick", "Grace"];

function chalangeChange(){
    let chanalngeDivBox = document.createElement("div")
    chanalngeDivBox.innerHTML = "Press to get a random challenge of the day!";
    chanalngeDivBox.style.fontSize = "30px"
    document.querySelector("#color-header").appendChild(chanalngeDivBox);

    chanalngeDivBox.addEventListener("click", function(){
        let challange = Math.floor(Math.random()*(challenges.length));
        chanalngeDivBox.innerHTML = challenges[challange];
    });


}

// direct code
chalangeChange();
