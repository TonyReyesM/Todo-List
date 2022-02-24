import taskFactory from "./Task";
import { compareAsc, format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns'
import projectFactory from "./Project";

const todoList = (() => {

    const allTasks = [];
    const task1 = taskFactory ('Task1', 'First Task', 'Low', 'Inbox', format(new Date(), 'yyyy-MM-dd'));
    const task2 = taskFactory ('Task2', 'Second Task', 'High', 'Inbox', '1995-05-04');
    const task3 = taskFactory ('Task3', 'Third Task', 'Medium', 'Inbox', '2022-02-21');
    const task4 = taskFactory ('Task4', 'Fourth Task', 'Low', 'Inbox', '2022-02-24');
    const task5 = taskFactory ('Task5', 'First Task', 'Low', 'Inbox', format(new Date(), 'yyyy-MM-dd'));
    const task6 = taskFactory ('Task6', 'Second Task', 'High', 'Inbox', '1995-05-04');
    const task7 = taskFactory ('Task7', 'Third Task', 'Medium', 'Inbox', '2022-02-21');
    const task8 = taskFactory ('Task8', 'Fourth Task', 'Low', 'Inbox', '2022-02-24');
    const task9 = taskFactory ('Task9', 'First Task', 'Low', 'Inbox', format(new Date(), 'yyyy-MM-dd'));
    const task10 = taskFactory ('Task10', 'Second Task', 'High', 'Inbox', '1995-05-04');
    const task11 = taskFactory ('Task11', 'Third Task', 'Medium', 'Inbox', '2022-02-21');
    const task12 = taskFactory ('Task12', 'Fourth Task', 'Low', 'Inbox', '2022-02-24');
    allTasks.push(task1, task2, task3, task4, task5, task6, task7, task8, task9, task10, task11, task12);
    const allProjects = [];
    const project1 = projectFactory('Project 1');
    const project2 = projectFactory('Project 2');
    const project3 = projectFactory('Project 3');
    const project4 = projectFactory('Project 4');
    const project5 = projectFactory('Project 5');
    const project6 = projectFactory('Project 6');
    const project7 = projectFactory('Project 7');
    const project8 = projectFactory('Project 8');
    const project9 = projectFactory('Project 9');
    const project10 = projectFactory('Project 10');
    allProjects.push(project1, project2, project3, project4, project5, project6, project7, project8, project9, project10)

    const getTask = (taskName) => {
        const task = allTasks.find(_task => _task.getTitle() === taskName)
        return task
    };

    const getTasksForToday = () => {
        const todaysDate = format(new Date(), 'yyyy-MM-dd')
        const tasks = allTasks.filter(_task => _task.getDateFormatted() === todaysDate)
        return tasks
    }

    const getTasksForThisWeek = () => {
        const todaysDate = new Date();
        const weekStart = startOfWeek(todaysDate);
        const weekEnd = endOfWeek(todaysDate);
        const tasks = allTasks.filter(_task =>  isWithinInterval(
            _task.getRawDate(),
            {
                start: weekStart,
                end: weekEnd,
            },
        ))
        console.log(tasks)
        return tasks
    }
    
    const addTask = (newTask) => {
        allTasks.push(newTask)
    };
    
    const delTask = (task) => {
        const _taskIndex = allTasks.indexOf(task);
        if(_taskIndex !== -1) allTasks.splice(_taskIndex, 1)
        else console.log('Error: Task not found.')
    };
    
    const getProject = (projectName) => {
        const project = allProjects.find(_project => _project.getName() === projectName) 
        return project
    };
    
    const addProject = (newProject) => {
        allProjects.push(newProject)
    }
    
    const delProject = (project) => {
        const _projectIndex = allProjects.indexOf(project);
        if(_projectIndex !== -1) allProjects.splice(_projectIndex, 1)
        else console.log('Error: Project not found.')
    }

    return {allTasks, allProjects, getTask, getTasksForToday, getTasksForThisWeek, getProject, addTask, delTask, addProject, delProject}
})();

export default todoList;