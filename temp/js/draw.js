require([], function(){

    // setup webgl renderer full page
    var renderer	= new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(0x000000);
    document.body.appendChild( renderer.domElement );

    //main page//////////////////////////////////////////////
    var mainscene	= new THREE.Scene();
    var camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 8000);
    camera.position.z = 400;
    camera.position.y = 200;
    camera.position.x = 200;
    camera.up.set(0,1,0);
    camera.lookAt(mainscene.position);

    // declare the rendering loop
    var onRenderFcts= [];

    // handle window resize events
    var winResize	= new THREEx.WindowResize(renderer, camera);


    /////////////////////////////////////////////////////////////////////
    //	control app
    ///////////////////////////////////////////////////////////////////
    var mode = 1; //default view all planet
    var idDetail = null; //set data for view detail

    var util = new SystemUtil();


    var gui = new dat.GUI({load:JSON});
    gui.remember(util);


    var system = gui.addFolder("System");
    system.add(util,"pause");

    var mercuryControl = gui.addFolder("Mercury");
    mercuryControl.add(util,"mercuryVelocity",0,0.1);
    mercuryControl.add(util,"mercuryVisible");

    var venusControl = gui.addFolder("Venus");
    venusControl.add(util,"venusVelocity",0,0.1);
    venusControl.add(util,"venusVisible");

    var earthControl = gui.addFolder("Earth");
    earthControl.add(util,"earthVelocity",0,0.1);
    earthControl.add(util,"earthVisible");

    var moonControl = gui.addFolder("Moon");
    moonControl.add(util,"moonVelocity",0,0.4);

    var marsControl = gui.addFolder("Mars");
    marsControl.add(util,"marsVelocity",0,0.1);
    marsControl.add(util,"marsVisible");

    var jupiterControl = gui.addFolder("Jupiter");
    jupiterControl.add(util,"jupiterVelocity",0,0.1);
    jupiterControl.add(util,"jupiterVisible");

    var saturnControl = gui.addFolder("Saturn");
    saturnControl.add(util,"saturnVelocity",0,0.1);
    saturnControl.add(util,"saturnVisible");

    var uranusControl = gui.addFolder("Uranus");
    uranusControl.add(util,"uranusVelocity",0,0.1);
    uranusControl.add(util,"uranusVisible");

    var neptuneControl = gui.addFolder("Neptune");
    neptuneControl.add(util,"neptuneVelocity",0,0.1);
    neptuneControl.add(util,"neptuneVisible");

    gui.close();


    //////////////////////////////////////////////////////////////////////////////////
    //		setup sunlight and ambient					//
    //////////////////////////////////////////////////////////////////////////////////

    var ambientLight= new THREE.AmbientLight(0x555555);
    mainscene.add( ambientLight);
    var sunLight = new THREE.PointLight(0xffffff,2,10000)
    sunLight.position.set(0,0,0);
    mainscene.add(sunLight);



    //make outter
    var star =  util.makeOuter();
    mainscene.add(star);


    //////////////////////////////////////////////////////////////////////////////////
    //		orbit						//
    //////////////////////////////////////////////////////////////////////////////////
    var mercuryOrbit = util.createOrbit(util.mercuryPosition,'mercuryOrbit');
    var venusOrbit = util.createOrbit(util.venusPosition,'vernusOrbit');
    var earthOrbit = util.createOrbit(util.earthPosition,'earthOrbit');
    var marsOrbit = util.createOrbit(util.marsposition,'marsRadius');
    var jupiterOrbit = util.createOrbit(util.jupiterPosition,'jupiterRadius');
    var saturnOrbit = util.createOrbit(util.saturnPosition,'saturnRadius');
    var uranusOrbit = util.createOrbit(util.uranusPosition,'uranusRadius');
    var neptuneOrbit = util.createOrbit(util.neptunePosition,'neptuneRadius');





    //////////////////////////////////////////////////////////////////////////////////
    //		add all planet and make it move					//
    //////////////////////////////////////////////////////////////////////////////////


    var sunLightLen = util.makeSunLight();
    sunLightLen.position.set(0,0,0);
    sunLightLen.customUpdateCallback = lensFlareUpdateCallback;
    mainscene.add(sunLightLen);

    function lensFlareUpdateCallback( object ) {

        var index, length = this.lensFlares.length;
        var flare;

        var camDistance = camera.position.length();

        for( index = 0; index < length; index ++ ) {

            flare = this.lensFlares[ index ];

            flare.scale = 1 / camDistance * 300;

        }

    }

    var mercury = util.makemercury();
    var mercuryPivot = new THREE.Object3D();
    mercuryPivot.name = "mercurypivot";
    mercuryPivot.add(mercury);
    mercuryPivot.add(mercuryOrbit);
    mainscene.add(mercuryPivot);


    var venus = util.makevenus();
    var venusPivot = new THREE.Object3D();
    venusPivot.name = "venuspivot";
    venusPivot.add(venus);
    venusPivot.add(venusOrbit);
    mainscene.add(venusPivot);

    var earth = util.makeearth();
    var earthPivot = new THREE.Object3D();
    earthPivot.name = "earthpivot";
    earthPivot.add(earth);
    earthPivot.add(earthOrbit);
    mainscene.add(earthPivot);

    var mars = util.makemars();
    var marsPivot = new THREE.Object3D();
    marsPivot.name = "marspivot";
    marsPivot.add(mars);
    marsPivot.add(marsOrbit);
    mainscene.add(marsPivot);

    var jupiter = util.makejupiter();
    var jupiterPivot = new THREE.Object3D();
    jupiterPivot.name = "jupiterpivot";
    jupiterPivot.add(jupiter);
    jupiterPivot.add(jupiterOrbit);
    mainscene.add(jupiterPivot);

    var saturn = util.makesaturn();
    var saturnPivot = new THREE.Object3D();
    saturnPivot.name = "saturnpivot";
    saturnPivot.add(saturn);
    saturnPivot.add(saturnOrbit);
    mainscene.add(saturnPivot);

    var uranus = util.makeuranus();
    var uranusPivot = new THREE.Object3D();
    uranusPivot.name = "uranuspivot";
    uranusPivot.add(uranus);
    uranusPivot.add(uranusOrbit);
    mainscene.add(uranusPivot);

    var neptune = util.makeneptune();
    var neptunePivot = new THREE.Object3D();
    neptunePivot.name = "neptunepivot";
    neptunePivot.add(neptune);
    neptunePivot.add(neptuneOrbit);
    mainscene.add(neptunePivot);





    //////////////////////////////////////////////////////////////////////////////////
    //		Camera Controls	for mode 1					//
    //////////////////////////////////////////////////////////////////////////////////
    control(mainscene,camera);


    //////////////////////////////////////////////////////////////////////////////////
    //		mode 2					//
    //////////////////////////////////////////////////////////////////////////////////


    var detailScene	= new THREE.Scene();
    var detailCamera = new THREE.OrthographicCamera(-5,5,2.5,-2.5,0.1,1000);
    detailCamera.position.z = 4;
    detailCamera.lookAt(detailScene.position);


    var ambientLight= new THREE.AmbientLight( 0xffffff )
    detailScene.add( ambientLight)
    var frontLight	= new THREE.DirectionalLight('white', 1)
    frontLight.castShadow = true;
    frontLight.position.set(0.5, 0.5, 2)
    detailScene.add( frontLight )
    var backLight	= new THREE.DirectionalLight('white', 0.75)
    backLight.position.set(-0.5, -0.5, -2)
    detailScene.add( backLight )


    var coreEarth = util.createCoreEarth();
    //coreEarth.scale = 1;
    coreEarth.position.set(-3.5,0,0);
    coreEarth.scale.set(1.2,1.2,1.2);
    coreEarth.rotation.set(-0.1,-0.3,0);
    detailScene.add(coreEarth);


    var planeGeo = new THREE.PlaneGeometry(6.5,3.6,10,10);
    var planeMaterial = new THREE.MeshBasicMaterial({wireframe:true, color:0xffffff});
    var plane = new THREE.Mesh(planeGeo,planeMaterial);
    plane.position.set(1.5,0,0);
    detailScene.add(plane);




    //////////////////////////////////////////////////////////////////////////////////
    //		render 						//
    //////////////////////////////////////////////////////////////////////////////////
    onRenderFcts.push(function(){
        if(mode === 1) {
            var camDistance = camera.position.length();
            sunLightLen.scale =  1 / camDistance * 400; ;
            update();
            renderer.render(mainscene, camera);
        }else{
            detailUpdate();
            renderer.render(detailScene,detailCamera);
        }
    })

    var detailUpdate = function(){
        coreEarth.rotation.y += 0.02;

    }

    var update = function(){
        if(util.pause === false) {
            mercuryPivot.rotation.y += util.mercuryVelocity;
            venusPivot.rotation.y += util.venusVelocity;
            earthPivot.rotation.y += util.earthVelocity;
            marsPivot.rotation.y += util.marsVelocity;
            jupiterPivot.rotation.y += util.jupiterVelocity;
            saturnPivot.rotation.y += util.saturnVelocity;
            uranusPivot.rotation.y += util.uranusVelocity;
            neptunePivot.rotation.y += util.neptuneVelocity;
            var moonPivot = earth.getChildByName("moonpivot");
            moonPivot.rotation.y += util.moonVelocity;

            mercury.rotation.y += util.mercuryRotateVelocity;
            venus.rotation.y += util.venusRotateVelocity;
            earth.rotation.y += util.earthRotateVelocity;
            mars.rotation.y += util.marsRotateVelocity;
            jupiter.rotation.y += util.jupiterRotateVelocity;
            saturn.rotation.y += util.saturnRotateVelocity;
            uranus.rotation.y += util.uranusRotateVelocity;
            neptune.rotation.y += util.neptuneRotateVelocity;
        }

        mercury.visible = util.mercuryVisible;
        venus.visible = util.venusVisible;
        earth.visible = util.earthVisible;
        var moonpivot = earth.getChildByName("moonpivot");
        var moon = moonpivot.getObjectByName("moon");
        moon.visible = util.earthVisible;
        mars.visible = util.marsVisible;
        jupiter.visible = util.jupiterVisible;
        saturn.visible = util.saturnVisible;
        var saturnring = saturn.getChildByName("saturnring");
        saturnring.visible = util.saturnVisible;
        uranus.visible = util.uranusVisible;
        var uranusring = uranus.getChildByName("uranusring");
        uranusring.visible = util.uranusVisible;
        neptune.visible = util.neptuneVisible;
    }

    //////////////////////////////////////////////////////////////////////////////////
    //		Rendering Loop runner						//
    //////////////////////////////////////////////////////////////////////////////////
    var lastTimeMsec= null
    requestAnimationFrame(function animate(nowMsec){
        // keep looping
        requestAnimationFrame( animate );
        // measure time
        lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
        var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
        lastTimeMsec	= nowMsec
        // call each update function
        onRenderFcts.forEach(function(onRenderFct){
            onRenderFct(deltaMsec/1000, nowMsec/1000)
        })
    })
})
