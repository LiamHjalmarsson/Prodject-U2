"use strict"; 

// fucntion creating a new person object and returns it 
function createNewPeson (name, age, gender, crossfitExersicePreferd, crossfitExersiceWorst) {  
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
    database.push(person);
    console.log(database);
}

// Render a persons object into a html Element;
function renderPerson (person) {
    // Creating a div and applying class and that the div.id is eual to the person id.
    let div = document.createElement("div");
    div.classList.add("person");
    div.id = person.id;

    div.innerHTML = `
    <div>${person.id}</div>
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
    let personsElement = document.getElementById("persons");
    // every time the function is called it does not add the person list again. 
    personsElement.innerHTML = "";

    // Goes fro all the persons and insert their html
    for (let person of persons) { 
        let personElement = renderPerson(person);
        personsElement.appendChild(personElement);
    }
    
    //adding removePerson
    removePersonHandelere();
}

// When form is filed and sumbmited add 
function addPersonOnSubmit (event) {
    // Prevent them form from sending us to a new page
    event.preventDefault();

    let name = document.getElementById("name").value;
    let age = Number(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;
    let crossfitExersicePreferd = document.getElementById("crossfit-preferd").value;
    let crossfitExersiceWorst = document.getElementById("crossfit-worst").value;

    let person = createNewPeson(name, age, gender, crossfitExersicePreferd, crossfitExersiceWorst);

    // Calculate the new id created to databse to eual + 1 
    if (dataBase.length = dataBase.length) {
        person.id = dataBase[dataBase.length - 1].id + 1; 
    } 
    //if no one is adde then add new to be id 1 
    else {
        person.id = 1; 
    }

    //alert if something is not filed 
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
    else {
        // Global database   
        addNewPersonToDatabase(dataBase, person);
        rederPersons(dataBase);
        upUpdateAverage(); 
        updateMenAge();
        updateWomenAge();

        let form = document.getElementById("add-person-to-form");
        form.reset();
    }
}

// Add clickEvent to add button
function setAddPerssonHandler () {
    let form = document.getElementById("add-person-to-form");
    form.addEventListener("submit", addPersonOnSubmit);
}

// Removes preson from database baste on the id 
function removePersonFromDatabaseById (persons, id) {
    // loop from array to find right person with right id to be deleted 
    for (let i = 0; i < persons.length; i++) {
       
        let person = persons[i];
            
        // if persons id = the id then comfirm with name age pops
        if (person.id == id) { 
            
            let confirming = confirm(`Do you want to delete the profile ${dataBase[i].name} ${dataBase[i].age}`);

            // if comfirigng is true then remove 
            if (confirming == true) {
                persons.splice(i, 1);
                console.log(person)

                // removes the id by one 
                for (let j = i; j < persons.length; j++) {
                    persons[j].id = persons[j].id - 1;
                }
            }

            return;
        }
    }
}

// when Clicks event to remove person
function onRemoveDeletePersonOnClick(event) { 
    let button = event.target;
    let id = button.parentElement.id;

    // global varibalse and updating form list and ages count
    removePersonFromDatabaseById(dataBase, id);
    rederPersons(dataBase);
    upUpdateAverage();
    updateMenAge();
    updateWomenAge();
}

// Add "click" event handler to all remove-buttons
function removePersonHandelere() {  
    let buttons = document.querySelectorAll(".person button");

    for (let button of buttons) {
        button.addEventListener("click", onRemoveDeletePersonOnClick);
    }
}

// Returns the pepole based on age 
function getPersonsByTheAge(persons, age) {
    let personsAge = [];

    for (let person of persons) {
        // if personage age = age make loop to rearage number count
        if (person.age == age) {
            personsAge.push(person);
           
            for (let i = 0; i < personsAge.length; i++) {
                if (person.name == person)
                personsAge[i].id = i + 1;
            }
        }
    }

    return personsAge;
}

// filter by age 
function filterPepoleByAge (event) {
    event.preventDefault(); 
    // the age put
    let ageOfPeople = document.getElementById("filer-age").value;
    // get the pepole on age
    let people = getPersonsByTheAge(dataBase, ageOfPeople);

    //re-render list and reset filter search
    rederPersons(people);
    resetFilters();
}

// returns the pepole based on gender
function getPeopleByGender (persons, gender) {
    let genderOfpeople = []; 

    for (let person of persons) {
        // if personage gender = gneder make loop to rearage number count
        // make text lowercase
        if (person.gender.toLowerCase() == gender.toLowerCase()) {
            genderOfpeople.push(person);
        }

        for (let i = 0; i < genderOfpeople.length; i++) {
            if (person.name == person)
            genderOfpeople[i].id = i + 1;
        }
    }

    return genderOfpeople;
}

//filter by gender 
function filterPepoleByGender (event) {
    event.preventDefault();
    //the gender put
    let genderOfpeople = document.getElementById("filer-gender").value;
    // get the pepole on gender
    let people = getPeopleByGender(dataBase, genderOfpeople);

    //re-render list and reset filter search
    rederPersons(people);
    resetFilters();
}

// returns the pepole based on preferd exersice
function getPeopleByPreferd (persons, preferd) {
    let crossfitExersicePreferd = []; 

    for (let person of persons) {
       
        if (person.crossfitExersicePreferd.toLowerCase() == preferd.toLowerCase()) {
            crossfitExersicePreferd.push(person);
        }

        for (let i = 0; i < crossfitExersicePreferd.length; i++) {
            if (person.name == person)
            crossfitExersicePreferd[i].id = i + 1;
        }
    }

    return crossfitExersicePreferd;
}

// filter by preferdExercies
function filterPepoleByPreferd (event) { 
    event.preventDefault();

    let preferdOfPeople = document.getElementById("filer-preferd").value;

    let people = getPeopleByPreferd(dataBase, preferdOfPeople);

    rederPersons(people);
    resetFilters();
}

// returns the pepole based on preferd worst
function getPeopleByWorst (persons, worst) {
    let crossfitExersiceWorst = [];

    for (let person of persons) {
       
        if (person.crossfitExersiceWorst.toLowerCase() == worst.toLowerCase()) {
            crossfitExersiceWorst.push(person)
        }
        
        for (let i = 0; i < crossfitExersiceWorst.length; i++) {
            if (person.name == person)
            crossfitExersiceWorst[i].id = i + 1;
        }
    }

    return crossfitExersiceWorst;
}

// filter by worst exercies
function filterPepoleByWorst (event) {   
    event.preventDefault();

    let worstOfPeople = document.getElementById("filer-worst").value;
    
    let people = getPeopleByWorst(dataBase, worstOfPeople);
    rederPersons(people);
    resetFilters();
}

// submit filterform 
function filterPepoleHandelers () {   
    let ageForm = document.getElementById("filter-by-age");
    let genderForm = document.getElementById("filter-by-gender");
    let preferdForm = document.getElementById("filter-by-preferd");
    let worstForm = document.getElementById("filter-by-worst");
    let refreshSeeAll = document.getElementById("show-all");

    ageForm.addEventListener("submit", filterPepoleByAge);
    genderForm.addEventListener("submit", filterPepoleByGender);
    preferdForm.addEventListener("submit", filterPepoleByPreferd);
    worstForm.addEventListener("submit", filterPepoleByWorst);

    // shows all 
    refreshSeeAll.addEventListener("click", ShowAllOnClick);
}

// reset filter value after search
function resetFilters () {
    document.getElementById("filer-age").value = "";
    document.getElementById("filer-gender").value = "";
    document.getElementById("filer-preferd").value = "";
    document.getElementById("filer-worst").value = "";
}

// show all on click and reset value
function ShowAllOnClick () {
    document.getElementById("filer-age").value = "";
    document.getElementById("filer-gender").value = "";
    document.getElementById("filer-preferd").value = "";
    document.getElementById("filer-worst").value = "";

    rederPersons(dataBase);
}


///////////////////////////____________________ Code under extra work______________ \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
let challenges = ["Murph", "Cindy", "Karen", "Hansen", "Bert", "Angie", "Fran", "Clovis", "Nick", "Grace"];

// random challanges 
function chalangeChange(){
    let chanalngeDivBox = document.createElement("div");
    let banner = document.querySelector("#color-header");
    chanalngeDivBox.innerHTML = "Press to get a random challenge of the day!";
    chanalngeDivBox.style.fontSize = "30px"
    banner.appendChild(chanalngeDivBox);

    banner.addEventListener("click", function(){
        let challange = Math.floor(Math.random()*(challenges.length));
        chanalngeDivBox.innerHTML = challenges[challange];
    });
}

// returns average age of all 
function getTheAverageAgeOfPeople (persons) {
    let averageSumOfYears = 0; 

    for (let person of persons) {
        averageSumOfYears = averageSumOfYears + person.age;
    }

    return Math.round(averageSumOfYears / persons.length);
}   

// get average of all pepole
function upUpdateAverage(){
    let averageAge = document.getElementById("addVAlue");
    averageAge.innerHTML = "";

    for (let i = 0; i < dataBase.length; i++){
        averageAge.innerHTML = getTheAverageAgeOfPeople(dataBase);
    }
}

// returns average age of all women with f and F
function getAverageWomen () {
    let sum = 0;
    let femaleCount = 0;
    
    for (let i = 0; i < dataBase.length; i++) {
        
        if (dataBase[i].gender == "Female") {
            sum += dataBase[i].age;
            femaleCount++;
        }
        else if (dataBase[i].gender == "female") {
            sum += dataBase[i].age;
            femaleCount++;
        }
    }

    return Math.round(sum / femaleCount);
}

// get the agerave women age
function updateWomenAge(){
    let women = document.getElementById("addWomen");
    women.innerHTML = "";

    for (let i = 0; i < dataBase.length; i++){
        women.innerHTML = getAverageWomen(dataBase);
    }
}

// returns average age of all men with m and M
function getAverageMan (data) {  
    let sumMan = 0;
    let maleCount = 0;

    for ( let i = 0; i < dataBase.length; i++) {

        if(dataBase[i].gender == "Male") {
            sumMan += dataBase[i].age;
            maleCount++;
        }
        else if(dataBase[i].gender == "male") {
            sumMan += dataBase[i].age;
            maleCount++;
        }
    }

    return Math.round(sumMan / maleCount);
}

// get the agerave men age
function updateMenAge(){
    let men = document.getElementById("addMan");
    men.innerHTML = "";

    for (let i = 0; i < dataBase.length; i++){
        men.innerHTML = getAverageMan(dataBase);
    } 
}

// direct code
rederPersons(dataBase);
setAddPerssonHandler();
filterPepoleHandelers();
upUpdateAverage();
chalangeChange();
updateMenAge();
updateWomenAge();


