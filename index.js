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

const state = {
    taskList: [],
};
// state.taskList

// DOM Operations required

const taskContents = document.querySelector(".task__contents");         //query selector
const taskModal = document.querySelector(".task__modal__body");

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
                    `<img width="100%" src=${url} alt="Card Image" class="card-img-top md-3 rounded-lg"`
                }

                <h4 class="card-title task__card__title">${title}</h4>

                <p class="description trim-3-lines text-muted">${description}</p>
                
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
            </div>
            
            <div class="card-footer">
                
                <button type="button" class="btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask">Open Task</button>
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
        `<img width="100%" src=${url} alt="Card Image" class="img-fluid place__holder__image mb-3"`
    } 
    
    <strong class="text-muted text-sm">Created on: ${date.toDateString()}</strong>
    
    <h2 class="my-3">${title}</h2>
    <p class="text-muted">${description}</p>
    </div>
    ` ;

};


//below is mainly for updating local storage
const updateLocalStorage = () => {

    localStorage.setItem(
        "task",
        JSON,stringify({                                          //the stringify converts our JSON to string
            tasks: state.taskList,                            // this is how we can set items
        })
    );
};


// Load Initial Data


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


*/

