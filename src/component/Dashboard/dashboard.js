import React, { Component } from 'react'; // Import Component from 'react'
import './dashboard.css'; // Ensure this is the correct path to your CSS file

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            tasks: [],
            selectedProjectId: null,
        };
    }

    componentDidMount() {
        this.displayProjectLists();
    }

    displayProjectLists() {
        const projects = [
            { id: 'project1', name: 'Project 1' },
            { id: 'project2', name: 'Project 2' }
        ];
        this.setState({ projects });
    }

    displayTaskLists(projectId) {
        const tasks = [
            { id: 'task1', name: 'Task 1', status: 'Pending' },
            { id: 'task2', name: 'Task 2', status: 'Completed' }
        ];
        this.setState({ tasks, selectedProjectId: projectId });
    }

    updateTaskStatus(taskId, newStatus) {
        this.setState(prevState => ({
            tasks: prevState.tasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        }));
    }

    addNewTask(projectId, taskName) {
        const newTask = { id: `task${Math.random()}`, name: taskName, status: 'Pending' };
        this.setState(prevState => ({
            tasks: [...prevState.tasks, newTask]
        }));
    }

    assignTeamMemberToTask(taskId, memberId) {
        console.log(`Assign member ${memberId} to task ${taskId}`);
    }

    renderProjectLists() {
        return (
            <ul className="project-list">
                {this.state.projects.map(project => (
                    <li key={project.id} onClick={() => this.displayTaskLists(project.id)}>
                        {project.name}
                    </li>
                ))}
            </ul>
        );
    }

    renderTaskLists() {
        return (
            <ul className="task-list">
                {this.state.tasks.map(task => (
                    <li key={task.id}>
                        {task.name} - {task.status}
                        <button onClick={() => this.updateTaskStatus(task.id, 'Completed')}>Mark as Completed</button>
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="dashboard-container">
                <h1 className="dashboard-header">Project Management Dashboard</h1>
                {this.renderProjectLists()}
                {this.state.selectedProjectId && this.renderTaskLists()}
            </div>
        );
    }
}

export default Dashboard;

