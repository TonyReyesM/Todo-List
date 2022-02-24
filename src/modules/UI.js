import taskFactory from "./Task";
import projectFactory from "./Project";
import todoList from "./TodoList";

const UI = ((allProjects, allTasks) => {
    
    const sidebarDisplay = () => {
        const projectNames = allProjects.map(project => project.getName());
        const projectsList = document.querySelector('.projects-list');
        while(projectsList.firstChild) {
            projectsList.removeChild(projectsList.firstChild)
        }
        createProjectSections(projectNames)
        setSectionEvents();
    }

    const createProjectSections = (projectNames) => {
        const projectsList = document.querySelector('.projects-list');
        projectNames.forEach(name => {
            const listItem = document.createElement('li');
            listItem.classList.add('project-name')
            listItem.classList.add('section');
            listItem.innerHTML = name   
            projectsList.append(listItem)
        })
    }
    
    const projectDisplay = () => {
        displayProjectName();
        removeTasksInDisplay();
        createTaskUnits();
        setTaskUnitEvents();
    };

    const displayProjectName = () => {
        const selectedSectionName = document.querySelector('.selected-project').innerHTML;
        const displayTitle = document.querySelector('.display-title');
        displayTitle.innerHTML = selectedSectionName
    }

    const selectTasks = () => {
        const selectedSectionName = document.querySelector('.selected-project').innerHTML;
        let tasks = [];
        if(selectedSectionName === 'Inbox') {    
            tasks = allTasks
        }
        else if(selectedSectionName === 'Today') {
            tasks = todoList.getTasksForToday();
        } 
        else if(selectedSectionName === 'This Week') {
            tasks = todoList.getTasksForThisWeek();
        }
        else {
            const project = allProjects.find(_project => _project.getName() === selectedSectionName);
            tasks = project.setTasks(allTasks);
        }
        return tasks
    }

    const removeTasksInDisplay = () => {
        const taskList = document.querySelector('.display-tasks')
        while(taskList.firstChild) {
            taskList.removeChild(taskList.firstChild)
        }
    }

    const createTaskUnits = () => {
        const tasks = selectTasks();
        const taskList = document.querySelector('.display-tasks');
        for(let i = 0; i<tasks.length; i++) {
            const taskUnit = document.createElement('div');
            taskUnit.classList.add('task-unit');
            taskUnit.setAttribute('id', `${i}`)

            const taskTitle = document.createElement('div');
            taskTitle.classList.add('task-unit-title');
            taskTitle.innerHTML = tasks[i].getTitle();

            const rightSide = document.createElement('div');
            rightSide.classList.add('task-unit-side');
            const taskDate = document.createElement('div');
            taskDate.classList.add('task-unit-date');
            taskDate.innerHTML = tasks[i].getDate();
            const taskPriority = document.createElement('div');
            taskPriority.classList.add('task-unit-priority');
            if(tasks[i].getPriority() === 'High') taskPriority.style.backgroundColor = 'rgb(136, 0, 0, 0.6)'
            if(tasks[i].getPriority() === 'Medium') taskPriority.style.backgroundColor = 'rgb(202, 122, 1, 0.6)' 
            if(tasks[i].getPriority() === 'Low') taskPriority.style.backgroundColor = 'rgb(0, 148, 12, 0.6)'
            //taskPriority.innerHTML = tasks[i].getPriority();

            rightSide.append(taskDate)
            rightSide.append(taskPriority)
            taskUnit.append(taskTitle)
            taskUnit.append(rightSide)
            taskList.append(taskUnit)
        }
    }

    const setTaskUnitEvents = () => {
        const taskUnits = document.querySelectorAll('.task-unit')
        taskUnits.forEach(taskUnit => {
            taskUnit.addEventListener('mouseover', () => taskUnit.classList.add('hovered-sec'));
            taskUnit.addEventListener('mouseout', () => taskUnit.classList.remove('hovered-sec'));
            taskUnit.addEventListener('click', () => {
                if(taskUnit.classList.contains('selected-task')) taskUnit.classList.remove('selected-task')
                else {
                    const taskUnits = document.querySelectorAll('.task-unit')
                    taskUnits.forEach(unit => unit.classList.remove('selected-task'))
                    taskUnit.classList.add('selected-task')
                }
            } );
        })
    }

    const openProjectInput = () => {
        //const projects = document.querySelector('.projects')
        const sidebarBtns = document.querySelector('.sidebar-btns')
        const addProjectBtn = document.querySelector('.add-project');
        addProjectBtn.classList.add('hidden');
        const delProjectBtn = document.querySelector('.del-project');
        delProjectBtn.classList.add('hidden');

        const newProject = document.createElement('div')
        newProject.classList.add('new-project')
        const projectInput = document.createElement('input');
        projectInput.classList.add('project-input')
        
        const newProjectBtns = document.createElement('div');
        newProjectBtns.classList.add('add-project-btns-section');

        const submitProjectBtn = document.createElement('button');
        submitProjectBtn.innerHTML = 'Submit'
        submitProjectBtn.classList.add('submit-project');
        submitProjectBtn.addEventListener('click', () => {
            submitProject();
            closeProjectInput();
        })

        const cancelProjectSubmitBtn = document.createElement('button');
        cancelProjectSubmitBtn.innerHTML = 'Cancel'
        cancelProjectSubmitBtn.classList.add('cancel-submit-project');
        cancelProjectSubmitBtn.addEventListener('click', () => closeProjectInput())
        
        newProjectBtns.append(cancelProjectSubmitBtn);
        newProjectBtns.append(submitProjectBtn);
        newProject.append(projectInput);
        newProject.append(newProjectBtns);
        sidebarBtns.append(newProject)
        //projects.append(newProject);

        setHoverBtnEvent();
    }

    const closeProjectInput = () => {
        //const projects = document.querySelector('.projects')
        const sidebarBtns = document.querySelector('.sidebar-btns')
        const newProject = document.querySelector('.new-project')
        //projects.removeChild(newProject)
        sidebarBtns.removeChild(newProject)
        
        const addProjectBtn = document.querySelector('.add-project')
        addProjectBtn.classList.remove('hidden')
        const delProjectBtn = document.querySelector('.del-project')
        delProjectBtn.classList.remove('hidden')
    }

    const submitProject = () => {
        const projectName = document.querySelector('.project-input').value;
        if(projectName === '') {
            alert('Invalid project name')
            return
        } 
        const newProject = projectFactory(projectName)
        todoList.addProject(newProject)
        sidebarDisplay();   
    }

    const eraseProject = () => {
        const projectName = document.querySelector('.project-name.selected-project').innerHTML;
        const project = todoList.getProject(projectName);
        const projectTasks = selectTasks()
        projectTasks.forEach(task => todoList.delTask(task));
        todoList.delProject(project);
        document.querySelector('.inbox').classList.add('selected-project')
        projectDisplay();
        sidebarDisplay();
    }

    const openTaskInput = () => {
        const modalBg = document.querySelector('.modal-bg')
        modalBg.classList.add('bg-active')
    }
    
    const getTaskData = () => {
        const title = document.querySelector('.task-input.title').value;
        const description = document.querySelector('.task-input.description').value;
        const dueDate = document.querySelector('.task-input.duedate').value;
        const priorityCheckbox = Array.from(document.querySelectorAll('.priority-input')).find(input => input.checked)
        if(priorityCheckbox === undefined) {
            alert('Select priority')
            return
        } else {
            const priority = priorityCheckbox.value;
            let project = document.querySelector('.project-name.selected-project');
            if(project.classList.contains('default')) project = 'Inbox'
            else project = project.innerHTML
    
            return {title, description, dueDate, priority, project}
        }
    }

    const wipeModalData = () => {
        document.querySelector('.task-input.title').value = '';
        document.querySelector('.task-input.description').value = '';
        document.querySelector('.task-input.duedate').value = ''
        document.querySelectorAll('.priority-input').forEach(box => box.checked = false)
    }
    
    const submitTask = () => {
        const {title, description, dueDate, priority, project} = getTaskData();
        if(title === '') {
            alert('Missing task title')
            return
        } 
        else {
            const newTask = taskFactory(title, description, priority, project, dueDate);
            todoList.addTask(newTask);
        }
        closeTaskInput();
        projectDisplay();
    }
    
    const closeTaskInput = () => {
        const modalBg = document.querySelector('.modal-bg')
        modalBg.classList.remove('bg-active')
        const modalSubmitBtn = document.querySelector('.modal .submit');
        const modalEditBtn = document.querySelector('.modal .edit');
        modalSubmitBtn.classList.remove('hidden')
        modalEditBtn.classList.add('hidden')
        wipeModalData();
    }

    const eraseTask = () => {
        const taskID = Number(document.querySelector('.selected-task').id);
        const task = selectTasks()[taskID];
        todoList.delTask(task);
        projectDisplay();
    }

    const editTask = () => {
        const modalSubmitBtn = document.querySelector('.modal .submit');
        const modalEditBtn = document.querySelector('.modal .edit');
        modalSubmitBtn.classList.add('hidden')
        modalEditBtn.classList.remove('hidden')

        const taskID = Number(document.querySelector('.selected-task').id);
        const selectedTask = selectTasks()[taskID]
        openTaskInput();
        displayTaskData(selectedTask);
    }

    const displayTaskData = (task) => {
        document.querySelector('.task-input.title').value = task.getTitle();
        document.querySelector('.task-input.description').value = task.getDescription();
        document.querySelector('.task-input.duedate').value = task.getDateFormatted();
        Array.from(document.querySelectorAll('.priority-input')).find(box => box.value === task.getPriority()).checked = true
    }

    const setNewTaskData = () => {
        const taskID = Number(document.querySelector('.selected-task').id);
        const task = selectTasks()[taskID]
        const {title, description, dueDate, priority, project} = getTaskData();
        task.setTitle(title);
        task.setDescription(description);
        task.setDate(dueDate);
        task.setPriority(priority)
    }

    const updateTask = () => {
        setNewTaskData();
        closeTaskInput();
        projectDisplay();
    }

    const updateAllEvents = () => {
        setHoverBtnEvent();
        setSectionEvents();
        setClickEvents();
    }

    const setHoverBtnEvent = () => {
        const allBtns = document.querySelectorAll('button');
        allBtns.forEach(btn => {
            btn.addEventListener('mouseover', () => btn.classList.add('hovered-btn'))
            btn.addEventListener('mouseout', () => btn.classList.remove('hovered-btn'))
        })
    }

    const setSectionEvents = () => {
        const allSections = document.querySelectorAll('.section')
        allSections.forEach(section => {
            section.addEventListener('mouseover', () => section.classList.add('hovered-sec'))
            section.addEventListener('mouseout', () => section.classList.remove('hovered-sec'))
            section.addEventListener('click', () => {
                allSections.forEach(section => section.classList.remove('selected-project'))
                section.classList.add('selected-project');
                projectDisplay();
            })
        })
    }

    const setClickEvents = () => {
        const addProjectBtn = document.querySelector('.add-project');
        addProjectBtn.addEventListener('click', () => {
            openProjectInput();
        })

        const delProjectBtn = document.querySelector('.del-project');
        delProjectBtn.addEventListener('click', () => eraseProject());

        const addTaskBtn = document.querySelector('.add-task');
        addTaskBtn.addEventListener('click', () => openTaskInput());

        const reviewBtn = document.querySelector('.review-btn');
        reviewBtn.addEventListener('click', () => editTask());

        const deleteBtn = document.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => eraseTask());

        const modalCloseBtn = document.querySelector('.modal .close');
        modalCloseBtn.addEventListener('click', () => closeTaskInput());
    
        const modalSubmitBtn = document.querySelector('.modal .submit');
        modalSubmitBtn.addEventListener('click', () => submitTask());

        const modalEditBtn = document.querySelector('.modal .edit');
        modalEditBtn.addEventListener('click', () => updateTask())
    
        const priorityCheckboxes = document.querySelectorAll('.priority-input')
        priorityCheckboxes.forEach(box => box.addEventListener('click', () => {
            priorityCheckboxes.forEach(checkbox => checkbox.checked = false);
            box.checked = true;
        }))
    }

    return {projectDisplay, sidebarDisplay, updateAllEvents}

})(todoList.allProjects, todoList.allTasks)


export default UI