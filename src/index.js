import './index.css'

/*----------------------------------------------------------------*/
/*----------------------helper function start --------------------*/
/*----------------------------------------------------------------*/

// Create HTML elements i.e (div,p,section......etc) and attrs like class, id, inline style
window.create = function () {

    if (arguments.length === 0) {
        return document.createElement('div');
    }

    if (arguments.length === 1 && typeof arguments[0] != 'object') {
        return document.createElement(arguments[0]);
    }

    var tag = arguments[0];
    var attr = arguments[1] || arguments[0];

    if (arguments.length === 1 && typeof arguments[0] === 'object') {
        tag = 'div';
    }

    var element = document.createElement(tag);

    for (var i in attr) {
        element.setAttribute(i, attr[i]);
    }

    return element;
}

// Select Any Html Element Using CSS selector
window.select = function (selector) {
    return document.querySelector(selector);
}

// Add Content To Any HTML Element, You may use html or text
HTMLElement.prototype.content = function (data) {
    this.innerHTML = data
    return this;
};

// Append Child Element
HTMLElement.prototype.append = function () {
    for (var i in arguments) {
        this.appendChild(arguments[i]);
    }
    return this;
}

// Add Style
HTMLElement.prototype.css = function (styles) {
    for (var s in styles) {
        this.style[s] = styles[s];
    }
    return this;
}

// trim input value
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}

/*----------------------------------------------------------------*/
/*----------------------helper function end --------------------*/
/*----------------------------------------------------------------*/


// create main div
let parentEl = create({"class":"container py-4", "id":"mainDiv"})

// Top H1
let topH1 = create("h1",{"class":"display-4 text-center"}).content('Programmer Towheed simple task manager.')
parentEl.append(topH1)

//input
let inputEl = create({"class":"row"}).append( 
    create({"class":"col"}).append(
        create("input",{"class":"form-control","type":"text","id":"taskInput","placeholder":"Enter Your Task"})
    )
)
parentEl.append(inputEl)

//All task
let allTask = create({"class":"row", "id":"allTask"})
parentEl.append(allTask)


// onload function to workable our input field
window.onload = function(){
    //select taskInput
    let taskInput = select("#taskInput")
    let allTaskParent = select("#allTask")
    taskInput.addEventListener('keypress', function(event){
        if(event.keyCode === 13){
            createNewTask(allTaskParent,event.target.value)
            this.value = ""
        }
    })
}


//create task function
function createNewTask(parent, task){
    let col = create({'class':'col-sm-3'})
    let singleTask = create({'class':'singleTask d-flex'})
    let singleTaskP = create('p').content(task)

    //Single task p
    singleTask.append(singleTaskP)

    //create and append close btn
    let span = create('span',{"class":"ml-auto"}).content('<i class="fa fa-times-circle"></i>')
    span.addEventListener('click', function(){
        parent.removeChild(col)
    })
    //add span css
    span.css({"cursor":"pointer"})
    singleTask.append(span)

    //Single task controller create and append
    let taskController = createTaskController(singleTask)
    taskController.style.visibility = "hidden"
    singleTask.append(taskController)

    //onmouseenter taskController show
    singleTask.onmouseenter = function(){
        taskController.style.visibility = "visible"
    }

    //onmouseleave taskController hidden
    singleTask.onmouseleave = function(){
        taskController.style.visibility = "hidden"
    }

    //append single task into the  column and column append into the parent row
    col.append(singleTask)
    parent.append(col)
}



//Single task controller function
function createTaskController(parent){
    //create taskControlPanel
    let controlPanel = create({"class":"task-control-panel d-flex align-items-center"})

    //create color Palette and append into the task control panel
    let colorPalette = createColorPalette(parent)
    controlPanel.append(colorPalette)

    //create edit button and append into the task control panel
    let editBtn = createEditBtn(parent)
    controlPanel.append(editBtn)

    return controlPanel;
}

//Color palette function
function createColorPalette(parent){
    const colors = ['palegreen', 'skyblue', 'powderblue', 'salmon', 'grey', 'red']
    let colorDiv = create({"class":"d-flex"})

    colors.forEach( color => {
        let div = create({"class":"color-circle ml-1"})
        div.css({"background":color})
        div.addEventListener('click', function(){
            parent.css({"background":color})
        })
        colorDiv.append(div)
    })

    return colorDiv
}


//Task edit function
function createEditBtn(parent){
    let span = create('span',{"class":"ml-auto mr-2"}).content('<i class="fa fa-edit"></i>')
    span.css({"color":"#fff","cursor":"pointer"})
    span.addEventListener('click', function(){
        let p = parent.querySelector('p')

        let textArea = create('textarea',{"class":"inner-textarea"})
        textArea.css({"width":parent.offsetWidth+"px","height":parent.offsetHeight+"px","border":"none"})
        textArea.content(p.innerHTML)

        textArea.addEventListener('keypress', function(event){
            event.stopPropagation()
            if(event.keyCode === 13){
                if(this.value.trim()){
                    p.content(this.value)
                    parent.removeChild(this)
                }else{
                    alert("Please input some text")
                }
            }
        })

        parent.append(textArea)
    })

    return span
}

//select parent element and append context
select("#app").append(
    parentEl
);
