var canvas = document.getElementById('renderCanvas');
const ANIM_DURATION = 15;

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

var loadedModel = [];
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
        
        loadedModel = task.loadedMeshes;
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

function addAnimation(model,offset){
    var animBox = new BABYLON.Animation("anim-"+model.name,"position.y",30,BABYLON.Animation.ANIMATIONTYPE_FLOAT);
    var keys = [];
    keys.push({
        frame : 0,
        value : model.position.y,
    });
    keys.push({
        frame : ANIM_DURATION,
        value : model.position.y + offset,
    })
    animBox.setKeys(keys);
    model.animations.push(animBox);
    scene.beginAnimation(model, 0, ANIM_DURATION, false);
}
document.getElementById('btn-remove').addEventListener('click',function(){
    var num = parseInt(document.getElementById('input-num').value);
    if(num <= 0 || num > 20) return;
    if(num > 10){
        for(var i in loadedModel){
            // console.log(loadedModel[i].name)
            if(loadedModel[i].name == 'section-01') addAnimation(loadedModel[i],90);
            if(loadedModel[i].name == 'section-02') addAnimation(loadedModel[i],48);
            if(loadedModel[i].name.includes('tube-') && !loadedModel[i].name.includes('tube-sticker')){
                var tubeNum = parseInt(loadedModel[i].name.substring(5,7));
                if(tubeNum < 12) addAnimation(loadedModel[i],90);
                else addAnimation(loadedModel[i],48);
            }
            if(loadedModel[i].name.includes('tube-sticker-')){
                var stickerNum = parseInt(loadedModel[i].name.substring(14,17));
                if(stickerNum < 12) addAnimation(loadedModel[i],90);
                else addAnimation(loadedModel[i],48);
            }
        }
    }
})