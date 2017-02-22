const app = require('electron').remote;
const dialog = app.dialog;
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
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

function setDirListings() {
    assetsChars = [];
    assetsChars = getDirectories(path.join(project_home, "assets", "chars"));
    var assetsCharsList = $('#assets-chars-list')
    assetsCharsList.empty();
    $.each(assetsChars, function(i)
    {
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.classList.add('btn-margin');
        button.addEventListener('click', function(){
            deleteItem("assets", "chars", assetsChars[i]);
        });
        
        var li = $('<li/>')
        li.addClass('list-group-item');
        li.text(assetsChars[i]);
        li.append(button);
        li.appendTo(assetsCharsList);
    });
    
    assetsEnvs = [];
    assetsEnvs = getDirectories(path.join(project_home, "assets", "envs"));
    var assetsEnvsList = $('#assets-envs-list')
    assetsEnvsList.empty();
    $.each(assetsEnvs, function(i)
    {
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.classList.add('btn-margin');
        button.addEventListener('click', function(){
            deleteItem("assets", "envs", assetsEnvs[i]);
        });
        
        var li = $('<li/>')
        li.addClass('list-group-item');
        li.text(assetsEnvs[i]);
        li.append(button);
        li.appendTo(assetsEnvsList);
    });
    
    assetsMaps = [];
    assetsMaps = getDirectories(path.join(project_home, "assets", "maps"));
    var assetsMapsList = $('#assets-maps-list')
    assetsMapsList.empty();
    $.each(assetsMaps, function(i)
    {
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.classList.add('btn-margin');
        button.addEventListener('click', function(){
            deleteItem("assets", "maps", assetsMaps[i]);
        });
        
        var li = $('<li/>')
        li.addClass('list-group-item');
        li.text(assetsMaps[i]);
        li.append(button);
        li.appendTo(assetsMapsList);
    });
    
    assetsProps = [];
    assetsProps = getDirectories(path.join(project_home, "assets", "props"));
    var assetsPropsList = $('#assets-props-list')
    assetsPropsList.empty();
    $.each(assetsProps, function(i)
    {
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.classList.add('btn-margin');
        button.addEventListener('click', function(){
            deleteItem("assets", "props", assetsProps[i]);
        });
        
        var li = $('<li/>')
        li.addClass('list-group-item');
        li.text(assetsProps[i]);
        li.append(button);
        li.appendTo(assetsPropsList);
    });
    
    toolsAddons = [];
    toolsAddons = getDirectories(path.join(project_home, "tools", "addons"));
    var toolsAddonsList = $('#tools-addons-list')
    toolsAddonsList.empty();
    $.each(toolsAddons, function(i)
    {
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.classList.add('btn-margin');
        button.addEventListener('click', function(){
            deleteItem("tools", "addons", toolsAddons[i]);
        });
        
        var li = $('<li/>')
        li.addClass('list-group-item');
        li.text(toolsAddons[i]);
        li.append(button);
        li.appendTo(toolsAddonsList);
    });
    
    toolsScripts = [];
    toolsScripts = getDirectories(path.join(project_home, "tools", "scripts"));
    var toolsScriptsList = $('#tools-scripts-list')
    toolsScriptsList.empty();
    $.each(toolsScripts, function(i)
    {
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.classList.add('btn-margin');
        button.addEventListener('click', function(){
            deleteItem("tools", "scripts", toolsScripts[i]);
        });
        
        var li = $('<li/>')
        li.addClass('list-group-item');
        li.text(toolsScripts[i]);
        li.append(button);
        li.appendTo(toolsScriptsList);
    });
    
    scenes = [];
    scenes = getDirectories(path.join(project_home, "scenes"));
    var scenesList = $('#scenes-list')
    scenesList.empty();
    $.each(scenes, function(i)
    {
        var button = document.createElement("button");
        button.innerHTML = "Delete";
        button.classList.add('btn');
        button.classList.add('btn-danger');
        button.classList.add('btn-sm');
        button.classList.add('btn-margin');
        button.addEventListener('click', function(){
            deleteItem("scenes", "none", scenes[i]);
        });
        
        var li = $('<li/>')
        li.addClass('list-group-item');
        li.text(scenes[i]);
        li.append(button);
        li.appendTo(scenesList);
    });
}

function setScene() {
    var start = document.getElementById('start-view');
    var project = document.getElementById('project-view');
    start.classList.add("display-none-elem");
    project.classList.remove("display-none-elem");
}

function deleteItem(type, item, name) {
    if (confirm('Do you really want to delete '+name+'?')) {
        if (item != "none") {
            deletePath = path.join(project_home, type, item, name);
        } else {
            deletePath = path.join(project_home, type, name);
        }
        rimraf(deletePath, function () { setDirListings(); setScene(); });
    }
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
        alert("You must enter an asset name!");
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
        alert("You must enter a scene name!");
    }
    
    setDirListings();
}

function newTool() {
    var name = document.getElementById('tool-name').value.replace(/ /g,"_");
    var type = document.getElementById('tool-type').value;
    
    if (name != "") {
        // Create tools/type/name
        if (!fs.existsSync(path.join(project_home, "tools", type, name))){
            fs.mkdirSync(path.join(project_home, "tools", type, name));
        }
    } else {
        alert("You must enter a tool name!");
    }
    
    setDirListings();
}