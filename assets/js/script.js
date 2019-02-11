var canvas = document.getElementById('renderCanvas');

// load the 3D engine
var engine = new BABYLON.Engine(canvas, true);

var scene,camera,light,sphere,ground;
// createScene function that creates and return the scene
var createScene = function(){
    scene = new BABYLON.Scene(engine);
    
    camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(8, 5,-10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    // camera.attachControl(canvas, false);

    light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, 2, scene);
    sphere.position.y = 1;

    ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

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