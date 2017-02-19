const app = require('electron').remote;
const dialog = app.dialog;
const fs = require('fs');
const path = require('path');
var project_home = "";

var open_project_button = document.getElementById('open-project-button');
open_project_button.onclick = openProject;

var new_project_button = document.getElementById('new-project-button');
new_project_button.onclick = newProject;

var exit_button = document.getElementById('exit-button');
exit_button.onclick = exitApp;

function exitApp() {
    var window = app.getCurrentWindow();
    window.close();
}

function selectDirectory() {
    project_home = dialog.showOpenDialog({properties: ['openDirectory']})[0]
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(file => fs.statSync(path.join(srcpath, file)).isDirectory())
}

function setScene() {
    var start = document.getElementById('start-view');
    var project = document.getElementById('project-view');
    start.classList.add("display-none-elem");
    project.classList.remove("display-none-elem");
}

function setDirListings() {
    assetsChars = [];
    assetsChars = getDirectories(path.join(project_home, "assets", "chars"));
    var assetsCharsList = $('#assets-chars-list')
    assetsCharsList.empty();
    $.each(assetsChars, function(i)
    {
        var li = $('<li/>').addClass('list-group-item').text(assetsChars[i]).appendTo(assetsCharsList);
    });
    
    assetsEnvs = [];
    assetsEnvs = getDirectories(path.join(project_home, "assets", "envs"));
    var assetsEnvsList = $('#assets-envs-list')
    assetsEnvsList.empty();
    $.each(assetsEnvs, function(i)
    {
        var li = $('<li/>').addClass('list-group-item').text(assetsEnvs[i]).appendTo(assetsEnvsList);
    });
    
    assetsMaps = [];
    assetsMaps = getDirectories(path.join(project_home, "assets", "maps"));
    var assetsMapsList = $('#assets-maps-list')
    assetsMapsList.empty();
    $.each(assetsMaps, function(i)
    {
        var li = $('<li/>').addClass('list-group-item').text(assetsMaps[i]).appendTo(assetsMapsList);
    });
    
    assetsProps = [];
    assetsProps = getDirectories(path.join(project_home, "assets", "props"));
    var assetsPropsList = $('#assets-props-list')
    assetsPropsList.empty();
    $.each(assetsProps, function(i)
    {
        var li = $('<li/>').addClass('list-group-item').text(assetsProps[i]).appendTo(assetsPropsList);
    });
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
    
    setDirListings();
    setScene();
}

function openProject() {
    selectDirectory();
    setDirListings();
    setScene();
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
    
    setDirListings();
}

function newScene() {
    var name = document.getElementById('scene-name').value.replace(/ /g,"_");
    
    if (name != "") {
        // Create scenes/name
        if (!fs.existsSync(path.join(project_home, "scenes", name))){
            fs.mkdirSync(path.join(project_home, "scenes", name));
        }
    } else {
        alert(" You must enter a scene name!");
    }
    
    setDirListings();
}