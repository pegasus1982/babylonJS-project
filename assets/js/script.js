var canvas = document.getElementById('renderCanvas');

// load the 3D engine
var engine = new BABYLON.Engine(canvas, true);

var scene,
    camera,
    light1,
    light2,
    light3,
    sphere,
    ground;
// createScene function that creates and return the scene
var createScene = function(){
    scene = new BABYLON.Scene(engine);
    
    camera = new BABYLON.ArcRotateCamera("Camera", 4, 1, 300, new BABYLON.Vector3(0,30,0), scene);
    camera.attachControl(canvas, false);
    camera.upperBetaLimit = 1.57;
    camera.lowerBetaLimit = 0.4;
    
    camera.upperRadiusLimit = 500;
    camera.lowerRadiusLimit = 200;

    light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(200, 200, 100), scene);
    light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(-400, 500, -400), scene);

    //load babylon model
    var assetsManager = new BABYLON.AssetsManager(scene);
    var meshTask = assetsManager.addMeshTask("model task", "", "assets/models/babylon/", "model.babylon");

    meshTask.onSuccess = function (task) {
        // task.loadedMeshes[0].position = new BABYLON.Vector3(0, 0, 0);
        // engine.loadingUIText = "Loaded asset " + task.loadedMeshes[0].name;
        
        console.log("load task successed");
        // console.log(task.loadedMeshes)
    }

    meshTask.onError = function(task,message,exception){
        console.log(task,message,exception);
    }

    assetsManager.load();

    return scene;
}

// call the createScene function
var scene = createScene();

// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});

// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});