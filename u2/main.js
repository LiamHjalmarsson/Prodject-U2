"use strict"; 
// https://github.com/LiamHjalmarsson?tab=repositories

// fucntion creating a new person object and returns it 
function createNewPeson (name, age, gender, crossfitExersicePreferd, crossfitExersiceWorst) {  
    // person object 
    let person = {
        name: name, 
        age: age, 
        gender: gender,
        crossfitExersicePreferd: crossfitExersicePreferd,
        crossfitExersiceWorst: crossfitExersiceWorst,
    };

    return person;
}

// Add the newly create person to database
function addNewPersonToDatabase(database, person) {
    database.push(person);
}

// Render a persons object into a html Element;
function renderPerson (person) {
    // creating div adding its "innehåll"
    let div = document.createElement("div");
    div.classList.add("person");
    div.id = person.id;

    div.innerHTML = `
    <li>${person.name}</li>
    <div>${person.age}</div>
    <div>${person.gender}</div>
    <div>${person.crossfitExersicePreferd}</div>
    <div>${person.crossfitExersiceWorst}</div>
    <button type="button" class="button-action-remove"> Remove </button>`;
        
    return div; 
}

// Render array of persons into html
function rederPersons (persons) {   
    let personsElement = document.getElementById("persons");
    // every time the function is called it does not add the person list again. 
    personsElement.innerHTML = "";

    // Goes fro all the persons and insert their html
    for (let person of persons) { 
        let personElement = renderPerson(person);
        personsElement.appendChild(personElement);
    }
    
    // acces to delete button
    removePersonHandelere();
}

// When form is filed and sumbmited add 
function addPersonOnSubmit (event) {
    // prevent send to new page
    event.preventDefault();

    // getting value from inputs
    let name = document.getElementById("name").value;
    let age = Number(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;
    let crossfitExersicePreferd = document.getElementById("crossfit-preferd").value;
    let crossfitExersiceWorst = document.getElementById("crossfit-worst").value; 

    // assing the function to a varibale 
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

    for (let i = 0; i < persons.length; i++) {
        
         // the persons for our loop 
        let person = persons[i];
            
        // see person id is the same 
        if (person.id == id) { 
            
            // if same get a confirm to delte or cancel 
            let confirming = confirm(`Do you want to delete the profile ${person.name} ${person.age}`);

            // if comfirigng is true / confirm then remove
            if (confirming == true) {
                persons.splice(i, 1);
                // change id number to go down 
                for (let j = i; j < persons.length; j++) {
                    persons[j].id = persons[j].id - 1;
                }
                // if canceling stay on page 
                rederPersons(dataBase);
                upUpdateAverage();
                updateMenAge();
                updateWomenAge();
            }
            return;
        }
    }
}

// when Clicks event to remove person
function onRemoveDeletePersonOnClick(event) {
    let button = event.target;
    let id = button.parentElement.id;

    removePersonFromDatabaseById(dataBase, id);
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

    // for each person get age 
    for (let person of persons) {

        // if the age is equal to age push persons from databse
        if (person.age == age) {
            personsAge.push(person);
        }
    }

    return personsAge;
}

// returns the pepole based on gender
function getPeopleByGender (persons, gender) {
    let genderOfpeople = []; 

    for (let person of persons) {

        // get persosn if small or big letters
        if (person.gender.toLowerCase() == gender.toLowerCase()) {
            genderOfpeople.push(person);
        }
    }

    return genderOfpeople;
}

// returns the pepole based on preferd exersice
function getPeopleByPreferd (persons, preferd) {
    let crossfitExersicePreferd = []; 

    for (let person of persons) {
       
        if (person.crossfitExersicePreferd.toLowerCase() == preferd.toLowerCase()) {
            crossfitExersicePreferd.push(person);
        }

    }

    return crossfitExersicePreferd;
}

// returns the pepole based on preferd worst
function getPeopleByWorst (persons, worst) {
    let crossfitExersiceWorst = [];

    for (let person of persons) {

        if (person.crossfitExersiceWorst.toLowerCase() == worst.toLowerCase()) {
            crossfitExersiceWorst.push(person);
        }
    }

    return crossfitExersiceWorst;
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

//filter by gender 
function filterPepoleByGender (event) {
    event.preventDefault();

    let genderOfpeople = document.getElementById("filer-gender").value;
    let people = getPeopleByGender(dataBase, genderOfpeople);

    rederPersons(people);
    resetFilters();
}

// filter by preferdExercies
function filterPepoleByPreferd (event) {
    event.preventDefault();

    let preferdOfPeople = document.getElementById("filer-preferd").value;

    let people = getPeopleByPreferd(dataBase, preferdOfPeople);

    rederPersons(people);
    resetFilters();
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

// get average of all pepole
function upUpdateAverage(){
    let averageAge = document.getElementById("addVAlue");

    averageAge.innerHTML = "";

    for (let i = 0; i < dataBase.length; i++){
        averageAge.innerHTML = getTheAverageAgeOfPeople(dataBase);
    }
}

// get the agerave women age
function updateWomenAge(){
    let women = document.getElementById("addWomen");

    women.innerHTML = "";

    for (let i = 0; i < dataBase.length; i++){
        women.innerHTML = getAverageWomen(dataBase);
    }
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

