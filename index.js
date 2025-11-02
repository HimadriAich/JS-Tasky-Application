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


// DOM Operations required

const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__modal__bpdy");
/* 
console.log(taskContents);
console.log(taskModal); */

const  htmlTaskContent = ({title, description, type, url}) => {};
