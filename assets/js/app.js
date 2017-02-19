const app = require('electron').remote; 
const dialog = app.dialog;
var project_home = ""

var new_project_button = document.getElementById('new-project-button');
new_project_button.onclick = selectDirectory;

function selectDirectory() {
    project_home = dialog.showOpenDialog({properties: ['openDirectory']})
    console.log(project_home[0]);
}