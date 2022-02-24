const projectFactory = (name) => {
    let _name = name;
    let tasks = [];

    const getName = () => name;
    /*const _getTasks = (allTasks) => {
        const _tasks = allTasks.filter(task => task.getProject() === _name)
        return _tasks
    };*/

    const setName = (newName) => _name = newName;
    const setTasks = (allTasks) => tasks = allTasks.filter(task => task.getProject() === _name) //_getTasks(allTasks)

    return {tasks, getName, setName, setTasks}
}

export default projectFactory;