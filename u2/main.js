"use strict"; 

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
    div.id = person.id;

    // With in the div we apply four divs with information about person and a remove button.
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


function setAddPerssonHandler () {

    let form = document.getElementById("add-person-to-form");
    form.addEventListener("submit", addPersonOnSubmit);
}


// Removes preson from database baste on the id 
function removePersonFromDatabaseById (persons, id) {

    for (let i = 0; i < persons.length; i++) {
        
        let person = persons[i];
            
        if (person.id == id) { 
            
            let confirming = confirm(`Do you want to delete the profile ${dataBase[i].name} ${dataBase[i].age}`);
            confirming;

            if (confirming == true) {
                persons.splice(i, 1);
                console.log(person)

                for (let j = i; j < persons.length; j++) {
                    persons[j].id = persons[j].id - 1;
                }
            }

            return;
        }
    }

}


function onRemoveDeletePersonOnClick(event) {
   
    let button = event.target;
    let id = button.parentElement.id;
    // let doYouConfirm;

    // for (let i = 0; i < dataBase.length; i++) {

    //     if (dataBase[i].id == id) {
    //         doYouConfirm = confirm(`Do you want to delete the profile ${dataBase[i].name} ${dataBase[i].age}`);
    //     }

    //     if (doYouConfirm) {
    //         removePersonFromDatabaseById(dataBase, id);
    //         rederPersons(dataBase);
    //         upUpdateAverage();
    //         updateMenAge();
    //         updateWomenAge();
    //     } 
    // }

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


function getPersonsByTheAge(persons, age) {

    let personsAge = [];

    for (let person of persons) {

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


function filterPepoleByAge (event) {
    
    event.preventDefault(); 
    
    let ageOfPeople = document.getElementById("filer-age").value;
    let people = getPersonsByTheAge(dataBase, ageOfPeople);

    rederPersons(people);
    resetFilters();
}


function getPeopleByGender (persons, gender) {

    let genderOfpeople = []; 

    for (let person of persons) {

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


function filterPepoleByGender (event) {
   
    event.preventDefault();

    let genderOfpeople = document.getElementById("filer-gender").value;

    let people = getPeopleByGender(dataBase, genderOfpeople);

    rederPersons(people);
    resetFilters();
}


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


function filterPepoleByPreferd (event) {
  
    event.preventDefault();

    let preferdOfPeople = document.getElementById("filer-preferd").value;

    let people = getPeopleByPreferd(dataBase, preferdOfPeople);

    rederPersons(people);
    resetFilters();
}


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


function filterPepoleByWorst (event) {
    
    event.preventDefault();

    let worstOfPeople = document.getElementById("filer-worst").value;
    
    let people = getPeopleByWorst(dataBase, worstOfPeople);
    rederPersons(people);
    resetFilters();
}


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


function resetFilters () {

    document.getElementById("filer-age").value = "";
    document.getElementById("filer-gender").value = "";
    document.getElementById("filer-preferd").value = "";
    document.getElementById("filer-worst").value = "";
}


function ShowAllOnClick () {

    document.getElementById("filer-age").value = "";
    document.getElementById("filer-gender").value = "";
    document.getElementById("filer-preferd").value = "";
    document.getElementById("filer-worst").value = "";

    rederPersons(dataBase);
}


//////////////____________________ Code under extra work______________ \\\\\\\\\\\\\
let challenges = ["Murph", "Cindy", "Karen", "Hansen", "Bert", "Angie", "Fran", "Clovis", "Nick", "Grace"];


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


function updateWomenAge(){

    let women = document.getElementById("addWomen");

    women.innerHTML = "";

    for (let i = 0; i < dataBase.length; i++){
        women.innerHTML = getAverageWomen(dataBase);
    }
}


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

// direct new 
upUpdateAverage();
chalangeChange();
updateMenAge();
updateWomenAge();



////////////////////////////////////////////// extra NAV

