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
//htmlTaskContent is a function which takes an object as parameter and returns a string
// its purpose is to generate the HTML code for a task card based on the provided data
// we are using template literals to create the HTML code for the card
// we are using destructuring to get the values from the object
// we are using backticks(``) to create multi-line strings  
// we are using ${} to insert the values from the object into the HTML code
const  htmlTaskContent = ({id, title, description, type, url}) => `           
    
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>         
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-primary mr-1.5" name=${id} onclick="editTask.apply(this, arguments)">
                    <i class="fa-solid fa-pencil name=${id}"></i>
                </button>
                  
                <button type="button" class="btn btn-outline-danger mr-1.5" name=${id} onclick="DeleteTask.apply(this, arguments)">
                    <i class="fa-solid fa-trash name=${id}"></i>
                </button>
            </div>
            <div class="card-body">
                ${
                    url 
                    ? `<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
                    : `<img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/330px-Placeholder_view_vector.svg.png" alt="Card Image" class="card-img-top md-3 rounded-lg" />`
                }

                <h4 class="card-title task__card__title">${title}</h4>

                <p class="description trim-3-lines text-muted">${description}</p>
                
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
            </div>
            
            <div class="card-footer">
                
                <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" onclick="OpenTask.apply(this, arguments)" id=${id}>Open Task</button>
            </div>

        </div>
    </div>
    
`;  

// Below is the template for the modals that will be shown when we click Open Task
//htmlModalContent is a function which takes an object as parameter and returns a string
// its purpose is to generate the HTML code for a task modal based on the provided data

const  htmlModalContent = ({id, title, description, url}) => {            // this method is used to create the big modal that will be shown on clicking open task button

    //first we do the date, to show on which date task was created
    const date = new Date(parseInt(id));     //parseInt used to convert to integer

    return `
    <div id=${id}>
    ${
        url 
        ? `<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg" />`
        : `<img width="100%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/330px-Placeholder_view_vector.svg.png" alt="Card Image" class="card-img-top md-3 rounded-lg" />`
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

    localStorage.setItem(                           //setItem is used to set items in local storage
        "task",                                      // "task" is the key in local storage where we store our tasks
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
//for rendering the initial cards(that we made) on the screen when we refresh the page
const LoadInitialData = () => {
    // fetch task from local storage using the key "task"
    const localStorageCopy = JSON.parse(localStorage.getItem("task")) || { tasks: [] };   // we get the item in string format, so we parse it to convert to JSON format
// fallback object to avoid crash on first load
/********************************************************** */

     // copying tasks from local storage into our state variable
    // this ensures state and local storage are always in sync
    state.taskList = localStorageCopy.tasks;   // we copy the tasks from local storage to our state variable

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
        type: document.getElementById("tags").value,            //getting value from input field having id tags
        description: document.getElementById("taskDescription").value,   //getting value from input field having id taskDescription
    };

    if (input.title === "" || input.type === "" || input.description === "") {
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


/****************************** D5CRUD ********************************** */

// OPEN TASK MODAL- when we click on open task button, the modal should open with the details of the task
// so we create a function to handle the click event on the open task button
// this function will get the id of the task from the button's name attribute
// then it will find the task in the state variable using the id

const OpenTask = (e) => {
    //console.log(e);               // e is the event object which is passed to the OpenTask function when the button is clicked
    if (!e) e = window.event;      // if e is not defined, then we get the event object from the window object. window.event is used to get the event object in older browsers
    const getTask = state.taskList.find(({id}) => id === e.target.id);   // getting the id of the task from the button's id attribute
    taskModal.innerHTML = htmlModalContent(getTask);   // inserting the HTML code for the modal into the modal body
}


//NOTE: The above function OpenTask is to open the modal with the details of the task when we click on the open task button
// e.target.id gives us the id of the button which was clicked
// state.taskList.find is used to find the task in the state variable using the id
// we are using destructuring to get the id from the object
// htmlModalContent is a function which generates the HTML code for the modal
// we are inserting the HTML code for the modal into the modal body using innerHTML

 /**************************************************** */
//DELETE TASK FUNCTIONALITY
// when we click on the delete button, the task should be deleted from the state variable and local storage
// so we create a function to handle the click event on the delete button

const DeleteTask = (e) => {
    if (!e) e = window.event;    // fallback for older browsers if event object is not passed
    const targetId = e.target.getAttribute("name");   // getting the id of the task from the button's name attribute
   /* console.log(targetId); */   // to check if we are getting the correct id

   const type = e.target.tagName;    // getting the tag name of the button which was clicked
   /* console.log(type); */    // to check if we are getting the correct tag name

   const removeTask = state.taskList.filter(({id}) => id !== targetId);   // filtering out the task which is to be deleted- except the task with the targetId, rest all tasks will be there in the taskList
   /* console.log(removeTask); */   // to check if we are getting the correct array after filtering
   
   state.taskList = removeTask;    // updating the state variable with the new array after deleting the task. without this, the task will come back after page refresh    

   updateLocalStorage();          // updating the local storage after deleting the task, just like we updated the taskList after adding a new task

   //very important conditon below- used to delete the task on the UI
   if (type === "BUTTON") { 
    //console.log(e.target.parentNode.parentNode.parentNode.parentNode);
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode
    );
   } 

   else if (type === "I") {
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
    );
   }
};

//Note: The above if condition is used to check if the element clicked is a button or not. If it is a button, then we remove the task from the DOM.
// e.target.parentNode gives us the parent element of the button which was clicked
// e.target.parentNode.parentNode gives us the grandparent element of the button which was clicked
// e.target.parentNode.parentNode.parentNode gives us the great grandparent element of the button which was clicked
// e.target.parentNode.parentNode.parentNode.parentNode gives us the great great grandparent element of the button which was clicked
// removeChild is used to remove the child element from the parent element
// here we are removing the great grandparent element of the button which was clicked from the great great grandparent element of the button which was clicked
// i.e. we are removing the card from the DOM
// similarly for the <i> tag
// e.target.tagName gives us the tag name of the element which was clicked
// here we are checking if the tag name is BUTTON or I (for the icon inside the button)

/***********************D6EditNOpenLgModal************************************* */

// EDIT TASK

const editTask = (e) => {
    if (!e) e = window.event;
    const targetId = e.target.id;   // getting the id of the task from the button's id attribute
    const type = e.target.tagName;    // getting the tag name of the button which was clicked

    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;    //when we  click on edit task button, the save changes button will be created dynamically


if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;   // getting the parent element of the button which was clicked
}
else {
    parentNode = e.target.parentNode.parentNode.parentNode;  // getting the parent element of the <i> tag which was clicked
}

/* taskTitle = parentNode.childNodes[3].childNodes[3]; */   // getting the title of the task

// here we will get the title of the task
// similarly for taskDescription and taskType
//in the above line we are basically navigating through the DOM to get the title, description and type of the task
// childNodes is an array-like object which contains all the child nodes of the parent element

// NOTE: ONLY THE ODD NUMBERED CHILDNODES ARE ELEMENT NODES, EVEN NUMBERED CHILDNODES ARE TEXT NODES (SPACES, NEWLINES ETC..)
// so, we have to use the odd numbered childNodes to get the element nodes

taskTitle = parentNode.childNodes[3].childNodes[3];   // getting the title of the task
taskDescription = parentNode.childNodes[3].childNodes[5];   // getting the description of the task
taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];   // getting the type of the task
submitButton = parentNode.childNodes[5].childNodes[1];   // getting the submit button of the task


/* console.log(taskTitle, taskDescription, taskType); */   // to check if we are getting the correct values

/*taskTitle=parentNode.childNodes[3].childNodes[3] means we are accessing the 4th child node of the parentNode(which is card-body) and then accessing the 4th child node of that(which is h4 tag having the title of the task)*/
//taskDescription = parentNode.childNodes[3].childNodes[5];  // here we are accessing the 6th child node of the parentNode(which is card-body) and then accessing the 6th child node of that(which is p tag having the description of the task)
//taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];  // here we are accessing the 8th child node of the parentNode(which is card-body) and then accessing the 2nd child node of that(which is span tag having the type of the task)


//TO EDIT DIRECTLY ON THE UI- use setAttribute to make the fields editable

taskTitle.setAttribute("contenteditable", "true");    //true means we are allowed to edit the field  (by default it is false)
taskDescription.setAttribute("contenteditable", "true");
taskType.setAttribute("contenteditable", "true");

//when we click on the edit task button, we want the save changes button to be created in place of the open task button

submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");   // when we click on the save changes button, the saveEdit function will be called
submitButton.removeAttribute("data-bs-toggle");
submitButton.removeAttribute("data-bs-target");
//after this, when we click on the edit button, the modal will not open(open task button wont work)
submitButton.innerHTML = "Save Changes";   // changing the text of the button to save changes
};


//saveEdit function to save the edited task
const saveEdit = (e) => {
    if (!e) e = window.event;
    const targetId = e.target.id;
//no need for const type = e.target.tagName; here as we are not using any icon

    const parentNode = e.target.parentNode.parentNode;   // getting the parent element of the button which was clicked

    const taskTitle = parentNode.childNodes[3].childNodes[3];   // getting the title of the task
    const taskDescription = parentNode.childNodes[3].childNodes[5];   // getting the description of the task
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];   // getting the type of the task
    const submitButton = parentNode.childNodes[5].childNodes[1];   // getting the submit button of the task 

    const updateData = {               //to store the updated data in an object
        taskTitle: taskTitle.innerHTML,                   // innerHTML is used to get the text from the UI(content in the html tags)
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML,
    };
    
    let stateCopy = state.taskList;   // creating a copy of the state variable

    stateCopy = stateCopy.map((task) =>         // iterating over the array using map function
        task.id === targetId                    // checking if the id of the task is equal to the targetId
    ? {
        id: task.id,                             // if yes, then we create a new object with the updated data
        title: updateData.taskTitle,
        description: updateData.taskDescription,
        type: updateData.taskType,
        url: task.url,
      } 
      : task                            // if no, then we return the task as it is
    );

    state.taskList = stateCopy;        // updating the state variable with the updated data

    updateLocalStorage();              // updating the local storage with the updated data

// making the fields non-editable after editing and saving the changes(click on Save Changes button)
    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");

    //changing the button back to open task button
    submitButton.setAttribute("onclick", "OpenTask.apply(this, arguments)");

    // adding back the attributes to open the modal
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#showTask");
    
    //after this, when we click on the button, the modal will open again
    submitButton.innerHTML = "Open Task";   // changing the text of the button back to open task
};

//NOTE: The above function saveEdit is used to save the edited task when we click on the save changes button
// e.target.id gives us the id of the button which was clicked
// we are using destructuring to get the id from the object
// innerHTML is used to get the text from the UI(content in the html tags)
// we are creating a copy of the state variable to update the task
// we are using map function to iterate over the array and update the task
// if the id of the task is equal to the targetId, then we create a new object with the updated data
// if not, then we return the task as it is
// finally, we update the state variable with the updated data
// then we update the local storage with the updated data
// then we make the fields non-editable after editing and saving the changes
// then we change the button back to open task button



/****************D7-SEARCH TASK*********************** */
// when we type in the search bar, the searchTask function is called and task is getting searched based on the title

const searchTask = (e) => {
    if (!e) e = window.event;

    while (taskContents.firstChild) {
        taskContents.removeChild(taskContents.firstChild);
    }
    const resultData = state.taskList.filter(({title}) => 
        title.toLowerCase().includes(e.target.value.toLowerCase())         // includes is used to check if the title contains the search string
    );

    console.log(resultData);  // to check if we are getting the correct result

// below what we are doing in simple words is that we are rendering(providing/presenting) the cards which match the search string
// we are inserting the HTML code for the card into the taskContents div
// for each cardData in the resultData array
// we are calling the htmlTaskContent function to get the HTML code for the card
    resultData.map((cardData) => {
        taskContents.insertAdjacentHTML(
            "beforeend",
            htmlTaskContent(cardData)
        )
    });
};






