console.log("connected..")   
// We will be storing the cards, locally on the browser

/* var state = {                //state is an object
    taskList: [               // taskList is an array having multiple objects
        {
            imageUrl: "",
            taskTitle: "",
            taskType: "",
            taskDescription: "",
        },

        {
            imageUrl: "",
            taskTitle: "",
            taskType: "",
            taskDescription: "",
        },

        {
            imageUrl: "",
            taskTitle: "",
            taskType: "",
            taskDescription: "",
        },

        {
            imageUrl: "",
            taskTitle: "",
            taskType: "",
            taskDescription: "",
        },

        {
            imageUrl: "",
            taskTitle: "",
            taskType: "",
            taskDescription: "",
        },
    ], 
};

 */
/*JSON format: comma(,) is the delimiter */
// JSON stands for JavaScript Object Notation
// It is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate.
// on refreshing a page, all the data is lost(in local storage(by default)), so to prevent that we use backup storage of the browser
// by default data is stored in local storage of the browser in string format ALWAYS        
// taskList is a backup storage in case local storage is cleared. It is an array in JSON format
// we will be using this state variable to store our tasks in the local storage of the browser
const state = {
    taskList: [],
};
// state.taskList

// DOM Operations required

const taskContents = document.querySelector(".task__contents");         //query selector- used to rerieve from html and then manipulate it using js
const taskModal = document.querySelector(".task__modal__body");

// querySelector is used to select the first element that matches a specified CSS selector(s) in the document
// here we are selecting the div with class task__contents and task__modal__body respectively
// the selected elements are stored in the variables taskContents and taskModal respectively


/* console.log(taskContents);
console.log(taskModal); */


// Below is the template for the cards we will see on our screen after creating a card (using Add New Item)

// note: below you see the div tag is inside ``.........whenever you write something related to html,inside js file, use this

//Note: element identifier key=${id} is been missing on line 67
const  htmlTaskContent = ({id, title, description, type, url}) => `           
    
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>         
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-primary mr-1.5" name=${id}>
                    <i class="fa-solid fa-pencil name=${id}"></i>
                </button>
                  
                <button type="button" class="btn btn-outline-danger mr-1.5" name=${id}>
                    <i class="fa-solid fa-trash name=${id}"></i>
                </button>
            </div>
            <div class="card-body">
                ${
                    url &&
                    `<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
                }

                <h4 class="card-title task__card__title">${title}</h4>

                <p class="description trim-3-lines text-muted">${description}</p>
                
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
            </div>
            
            <div class="card-footer">
                
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
            </div>

        </div>
    </div>
    
`;  

// Below is the template for the modals that will be shown when we click Open Task
const  htmlModalContent = ({id, title, description, url}) => {

    //first we do the date, to show on which date task was created
    const date = new Date(parseInt(id));     //parseInt used to convert to integer

    return `
    <div id=${id}>
    ${
        url &&
        `<img width="100%" src=${url} alt="Card Image" class="img-fluid place__holder__image mb-3"/>`
    } 
    
    <strong class="text-muted text-sm">Created on: ${date.toDateString()}</strong>
    
    <h2 class="my-3">${title}</h2>
    <p class="text-muted">${description}</p>
    </div>
    ` ;

};


//below is mainly for updating local storage

// here we are creating a function to update local storage whenever a new card is added
//here we convert JSON to string format, as local storage only stores in string format
const updateLocalStorage = () => {                   // key should be in string format

    localStorage.setItem(
        "task",
        JSON.stringify({                                          //the stringify converts our JSON to string
            tasks: state.taskList,                            // this is how we can set items
        })
    );
};

//tasks is the key in local storage where we store our tasks
// localStorage.tasks gives us the string stored in local storage


// JSON.stringify converts JSON to string format, as local storage only stores in string format
// but, in order to display the data from local storage, we need to convert string back to JSON format
// JSON.parse converts string to JSON format
// so, when we get items from local storage, we use JSON.parse to convert string to JSON format


//localStorage.setItem is used to set items in local storage
// localStorage.getItem is used to get items from local storage




// Load Initial Data
//here we convert string to JSON format, as local storage only stores in string format
//for rendering the cards on the screen when we refresh the page
const LoadInitialData = () => {
    // fetch task from local storage
    const localStorageCopy = JSON.parse(localStorage.task);   // we get the item in string format, so we parse it to convert to JSON format

    if (localStorageCopy) state.taskList = localStorageCopy.tasks;   // we copy the tasks from local storage to our state variable

    state.taskList.map((cardDate) => {            // map function is used to iterate over an array
        taskContents.insertAdjacentHTML(          // insertAdjacentHTML is used to insert HTML code
            "beforeend",                          // beforeend means we are inserting the HTML code at the end of the parent element
            htmlTaskContent(cardDate));             // we are calling the function htmlTaskContent to get the HTML code for the card
    });
};
//localStorageCopy is a variable which stores the data from local storage after converting it to JSON format
// localStorageCopy.tasks gives us the array of tasks stored in local storage
// state.taskList is our backup storage variable which stores the tasks in JSON format
// we copy the tasks from local storage to our state variable



// when we update or when we edit a card, we need to save it to local storage
// so we create a function handleSubmit to handle the form submission
// this function will be called when the form is submitted
// we will get the values from the form and create a new task object
// then we will push this new task object to our state variable........a state variable is a variable that holds the current state of the application
// then we will update the local storage
// then we will render the new task on the screen
const handleSubmit = (event) => {
    const id = `${Date.now()}`;                // Date.now() gives us the current timestamp in milliseconds
    const input = {                                 // getting the keys from html file into our js for creating new card and manipulating it
        url: document.getElementById("imageUrl").value,         //getting value from input field having id imageUrl
        title: document.getElementById("taskTitle").value,      //getting value from input field having id taskTitle
        tags: document.getElementById("tags").value,            //getting value from input field having id tags
        taskDescription: document.getElementById("taskDescription").value,   //getting value from input field having id taskDescription
    };

    if (input.title === "" || input.tags === "" || input.taskDescription === "") {
        return alert("Please fill all the necessary fields :-)");
    }

taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({...input, id}));   //inserting the new card at the end of the parent element.The object input already conains url, title, type, description
// the above line is used to render(show/display) the new task on the screen

state.taskList.push({...input, id});    //pushing the new task object to our state variable. It is used to to store the things(tasks) in the array

updateLocalStorage();          //updating the local storage- used to store the tasks locally on the browser
};
// Date.now() gives us the current timestamp in milliseconds
// we use this timestamp as the id for our tasks, as it is unique for each task
// id refers to the date and time when the task is created
// event refers to the event object which is passed to the handleSubmit function when the form is submitted

// inside the handleSubmit function, we will get the values from the form and create a new task object
// then we will push this new task object to our state variable
// then we will update the local storage
// then we will render the new task on the screen

// document.getElementById is used to get the element by its id
// .value is used to get the value of the input field
// we are storing the values in an object called input
// input.url gives us the value of the input field having id imageUrl
// input.title gives us the value of the input field having id taskTitle
// input.type gives us the value of the input field having id taskType
// input.description gives us the value of the input field having id taskDescription



//************************************************************************************* */
// note: img-fluid makes the image responsive, so the image can fit accordingly in the card or modal


// task__card is a custom class, which we would need to define later in css
//d-flex means display is flex

// to connect to the html, do id=${id}   i.e. $ sign and then curly braces are used, so the id gets activated, rest(title, description etc..) still unactivated
/* use ${} to write js code inside html code

Inside the img tag to add the url we have to use js

since the description is very long, so we cannot show it on our ui directly, 
so we do trim-3-lines, show that only 3 lines are shown on the ui

text-muted means the text will be shown in grey colour

we created one div for the body(class="card-body"), and one for the footer(card-footer)

note: the float-right property on a button means that the button will
shift to the right when we minimize the screen

Note: Local Storage:Local Storage in JavaScript is a feature of web
browsers that allows web applications to store data locally within the 
user's browser, with no expiration date. This means the data stored in 
local storage persists even after the user closes the browser, restarts 
their computer, or navigates away from the page.

*********************************************************************************
*/

//SPREAD OPERATOR: ... (three dots) is used to spread the elements of an array or object into individual elements
// here we are using spread operator to spread the elements of the input object into individual elements
// so that we can create a new object with the same properties as the input object
// but with a new id property
/* const obj = {
    name: "Rohan",            //name and age are keys
    age: 2
} */

/* console.log(obj);
 *///output: {name: "Rohan", age: 2}


/* console.log({obj}); */                // this will print the object inside another object
//output: {obj: {name: "Rohan", age: 2}}

/* console.log({...obj}); */          // this will spread the elements of the object
//output: {name: "Rohan", age: 2}
// here we are spreading the elements of the obj object into individual elements
// so that we can create a new object with the same properties as the obj object
// but with a new property      

/* console.log({...obj, designation: "Developer"}); */
//output: {name: "Rohan", age: 2, designation: "Developer"}
// here we are spreading the elements of the obj object into individual elements
// and adding a new property designation to the new object
