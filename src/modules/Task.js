import { compareAsc, format, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns'

const taskFactory = (title, description, priority, project = undefined, dueDate ='') => {
    let _title = title;
    let _description = description;
    let _dueDate;
    if(dueDate === '') _dueDate = 'No date'
    else _dueDate = {
        year: dueDate.split('-')[0],
        month: dueDate.split('-')[1],
        day: dueDate.split('-')[2],
    }
    let _priorityLevel = priority;
    let _project = project;

    const getTitle = () => _title;
    const getDescription = () => _description;
    const getDate = () => {
        if(_dueDate === 'No date') return _dueDate
        else return `${_dueDate.month}/${_dueDate.day}/${_dueDate.year}`
    };
    const getDateFormatted = () => {
        if(_dueDate === 'No date') return _dueDate
        else return `${_dueDate.year}-${_dueDate.month}-${_dueDate.day}`
    };

    const getRawDate = () => {
        if(_dueDate === 'No date') return _dueDate
        else return new Date(Number(_dueDate.year), Number(_dueDate.month)-1, Number(_dueDate.day))
    }

    const getPriority = () => _priorityLevel;
    const getProject = () => _project;

    const setTitle = (newTitle) => _title = newTitle;
    const setDescription = (newDescription) => _description = newDescription;
    const setDate = (newDate) => _dueDate = {
        year: newDate.split('-')[0],
        month: newDate.split('-')[1],
        day: newDate.split('-')[2],
    };
    const setPriority = (newPriority) => _priorityLevel = newPriority;
    const setProject = (newProject) => _project = newProject;

    return {getTitle, getDescription, getDate, getDateFormatted, getRawDate, getPriority, getProject,
        setTitle, setDescription, setDate, setPriority, setProject}
}

export default taskFactory