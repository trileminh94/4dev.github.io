function control2(scene, camera,mystore) {
    var show = false;
    var state = 0;
    var stats;
    var group;
    var theta = 0;
    var x0, z0;
    //var  text, plane;
    var selection = null;
    var pressed = false;
    var moved = false;

    var targetRotationX = 0;
    var targetRotationOnMouseDownX = 0;

    var targetRotationY = 0;
    var targetRotationOnMouseDownY = 0;

    var mouseX = 0;
    var mouseXOnMouseDown = 0;

    var mouseY = 0;
    var mouseYOnMouseDown = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var finalRotationY;
    var mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;
    var star;
    var check = 0;

    var positionPlanet = 0;

    var positionRotation = [];
    for (var i = 0; i < 8; i++) {
        positionRotation.push(i * Math.PI / 4);
    }
    function reduceAngle(angle) {
        while (angle > 2 * Math.PI) {
            var s = Math.floor(angle / (2 * Math.PI));
            angle -= s * 2 * Math.PI;
        }
        while (angle < -2 * Math.PI) {
            var s = Math.floor(angle / (-2 * Math.PI));
            angle += s * 2 * Math.PI;
        }
        if(angle < 0){
            angle += 2 * Math.PI;
        }
        return angle;
    }

    function getGapValue(angle) {
        var cloestPosition = 0;
        var closetValue = Math.abs(angle - positionRotation[0]);
        for (var i = 1; i < 8; i++) {
            if (closetValue > Math.abs((angle - positionRotation[i]))) {
                cloestPosition = i;
                closetValue = Math.abs((angle - positionRotation[i]));
            }
        }
        myStore.visibleIndex = cloestPosition;
        // alert("position: " + positionRotation[cloestPosition] + " " +  angle);
        return (positionRotation[cloestPosition] - angle);
    }

    init();

    animate();

    function init() {
        group = new THREE.Object3D();
        mercury = scene.getObjectByName("mercury");
        venus = scene.getObjectByName("venus");
        earth = scene.getObjectByName("earth");
        mars = scene.getObjectByName("mars");
        jupiter = scene.getObjectByName("jupiter");
        saturn = scene.getObjectByName("saturn");
        uranus = scene.getObjectByName("uranus");
        neptune = scene.getObjectByName("neptune");
        star = scene.getObjectByName("star");
        //camera.position.y -= 160;
        group.add(mercury);
        group.add(venus);
        group.add(earth);
        group.add(mars);
        group.add(jupiter);
        group.add(saturn);
        group.add(uranus);
        group.add(neptune);
        group.add(star);

        scene.add(group);
        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);

        //window.addEventListener('DOMMouseScroll', mousewheel, false);
        //window.addEventListener('mousewheel', mousewheel, false);

        window.addEventListener('resize', onWindowResize, false);


    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        // renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //
    var projector = new THREE.Projector();
    var delta = 0;

    function onDocumentMouseDown(event) {
        check = 0;
        delta = 0;
        pressed = false;
        moved = false;

        event.preventDefault();

        var vector = new THREE.Vector3((event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
        projector.unprojectVector(vector, camera);
        var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
        //var intersects = raycaster.intersectObjects([sun,mercury,venus,earth,mars,jupiter,saturn,uranus,neptune]);
        var intersects = raycaster.intersectObjects(scene.children, true);


        if (intersects.length > 0) {
            selection = intersects[0].object;
            //console.log(selection.name);
            state = selection.id;

            x0 = selection.position.x;
            z0 = selection.position.z;
            if (selection.name == 'star') {
                selection = null;
                state = 0;
            }

        }
        else {
            state = 0;
        }
        //console.log(state);

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.addEventListener('mouseout', onDocumentMouseOut, false);

        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDownX = targetRotationX;

        mouseYOnMouseDown = event.clientY - windowHalfY;
        targetRotationOnMouseDownY = targetRotationY;

    }

    var getLocation = function (event) {
        if (event.clientY - windowHalfY > 0) return 1;
        else return 2;
    }

    function onDocumentMouseMove(event) {

        // if (state == 0) {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;

            //targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.1;
            targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.005; //Math.max((mouseX - mouseXOnMouseDown) * 0.01, 0.78);
        

    }

    function onDocumentMouseUp(event) {
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
        document.removeEventListener('mouseout', onDocumentMouseOut, false);
        targetRotationX += getGapValue(reduceAngle(targetRotationX));
        //alert("postion: " + getGapValue(reduceAngle(targetRotationX)));
        if ((selection != null) && (state != 0)) {
            pressed = true;
        }

    }
    
    this.checkClicked = function () {
        if ((pressed === true) && (moved == false)) {
            pressed = false;
            return selection.id;
        }
        else {
            return -1;
        }
    }

    function onDocumentMouseOut(event) {

        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
        document.removeEventListener('mouseout', onDocumentMouseOut, false);

    }

    function onDocumentTouchStart(event) {

        if (event.touches.length == 1) {

            event.preventDefault();

            mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
            targetRotationOnMouseDownX = targetRotationX;

            mouseYOnMouseDown = event.touches[0].pageY - windowHalfY;
            targetRotationOnMouseDownY = targetRotationY;


        }

    }

    function onDocumentTouchMove(event) {

        if (event.touches.length == 1) {

            event.preventDefault();

            mouseX = event.touches[0].pageX - windowHalfX;
            targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.05;

            mouseY = event.touches[0].pageY - windowHalfY;
            targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.05;

        }

    }

    //

    function animate() {
        requestAnimationFrame(animate);
        render();

    }

    function render() {
        //horizontal rotahion
        group.rotation.y += ( targetRotationX - group.rotation.y ) * 0.1;
        //vertical rotation
        finalRotationY = (targetRotationY - group.rotation.x);


        if (group.rotation.x <= Math.PI / 2 && group.rotation.x >= -Math.PI / 2) {

            group.rotation.x += finalRotationY * 0.1;
        }
        if (group.rotation.x > Math.PI / 2) {

            group.rotation.x = Math.PI / 2;
        }
        else if (group.rotation.x < -Math.PI / 2) {

            group.rotation.x = -Math.PI / 2;
        }

    }
}