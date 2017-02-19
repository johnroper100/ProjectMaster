const app = require('electron').remote;
const dialog = app.dialog;
const fs = require('fs');
const path = require('path');
var project_home = "";

var open_project_button = document.getElementById('open-project-button');
open_project_button.onclick = selectDirectory;

var new_project_button = document.getElementById('new-project-button');
new_project_button.onclick = newProject;

function selectDirectory() {
    project_home = dialog.showOpenDialog({properties: ['openDirectory']})[0]
}

function newProject() {
    selectDirectory();

    // Create assets folder
    if (!fs.existsSync(path.join(project_home, "assets"))){
        fs.mkdirSync(path.join(project_home, "assets"));
    }

    // Create assets/chars
    if (!fs.existsSync(path.join(project_home, "assets", "chars"))){
        fs.mkdirSync(path.join(project_home, "assets", "chars"));
    }
    
    // Create assets/envs
    if (!fs.existsSync(path.join(project_home, "assets", "envs"))){
        fs.mkdirSync(path.join(project_home, "assets", "envs"));
    }
    
    // Create assets/maps
    if (!fs.existsSync(path.join(project_home, "assets", "maps"))){
        fs.mkdirSync(path.join(project_home, "assets", "maps"));
    }
    
    // Create assets/maps/src
    if (!fs.existsSync(path.join(project_home, "assets", "maps", "src"))){
        fs.mkdirSync(path.join(project_home, "assets", "maps", "src"));
    }
    
    // Create assets/props
    if (!fs.existsSync(path.join(project_home, "assets", "props"))){
        fs.mkdirSync(path.join(project_home, "assets", "props"));
    }
    
    // Create tools folder
    if (!fs.existsSync(path.join(project_home, "tools"))){
        fs.mkdirSync(path.join(project_home, "tools"));
    }

    // Create tools/addons
    if (!fs.existsSync(path.join(project_home, "tools", "addons"))){
        fs.mkdirSync(path.join(project_home, "tools", "addons"));
    }
    
    // Create tools/scripts
    if (!fs.existsSync(path.join(project_home, "tools", "scripts"))){
        fs.mkdirSync(path.join(project_home, "tools", "scripts"));
    }
    
    // Create scenes folder
    if (!fs.existsSync(path.join(project_home, "scenes"))){
        fs.mkdirSync(path.join(project_home, "scenes"));
    }
}

function newAsset() {
    var name = document.getElementById('asset-name').value.replace(/ /g,"_");
    var type = document.getElementById('asset-type').value;
    
    if (name != "") {
        // Create assets/type/name
        if (!fs.existsSync(path.join(project_home, "assets", type, name))){
            fs.mkdirSync(path.join(project_home, "assets", type, name));
        }

        // Create assets/type/name/maps
        if (!fs.existsSync(path.join(project_home, "assets", type, name, "maps"))){
            fs.mkdirSync(path.join(project_home, "assets", type, name, "maps"));
        }
    } else {
        alert(" You must enter an asset name!");
    }
}