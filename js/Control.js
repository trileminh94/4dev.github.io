var control = function ( scene, camera ) {

        var state = 0;

	 	var stats;

        var group;

        var theta = 0;

        var x0, z0;

        //var  text, plane;

        var selection;



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

        var  mercury,venus,earth, mars,jupiter,saturn, uranus,neptune;

        var star;

        var check = 0;

        init();

      

        animate();



        function init() {

            group = new THREE.Object3D();

            mercury = scene.getObjectByName("mercurypivot");

            venus = scene.getObjectByName("venuspivot");

            earth = scene.getObjectByName("earthpivot");

            mars = scene.getObjectByName("marspivot");

            jupiter = scene.getObjectByName("jupiterpivot");

            saturn = scene.getObjectByName("saturnpivot");

            uranus = scene.getObjectByName("uranuspivot");

            neptune = scene.getObjectByName("neptunepivot");

            star = scene.getObjectByName("star");



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

                document.addEventListener( 'mousedown', onDocumentMouseDown, false );

                document.addEventListener( 'touchstart', onDocumentTouchStart, false );

                document.addEventListener( 'touchmove', onDocumentTouchMove, false );

                

                window.addEventListener('DOMMouseScroll', mousewheel, false);

                window.addEventListener('mousewheel', mousewheel, false);



                window.addEventListener( 'resize', onWindowResize, false );

                



        }



        function mousewheel( event )

        {   



            var acc=8;



                CurrentDis=Math.sqrt(camera.position.x*camera.position.x+camera.position.y*camera.position.y+camera.position.z+camera.position.z);





                deltax = (camera.position.x)/acc;

                deltay = (camera.position.y)/acc;

                deltaz = (camera.position.z)/acc;



                if (event.wheelDelta!=0)

                {

                    if (event.wheelDelta<0)   

                    {

                        if((CurrentDis+CurrentDis/acc)<1000)

                        {

                            camera.position.x +=deltax;

                            camera.position.y +=deltay;

                            camera.position.z +=deltaz;

                        }

                    }

                    else

                    {

                        if((CurrentDis-CurrentDis/acc)>40) {

                            camera.position.x -= deltax;

                            camera.position.y -= deltay;

                            camera.position.z -= deltaz;

                        }

                    }

                }

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

        function onDocumentMouseDown( event ) {

            check = 0;

            delta = 0;

                event.preventDefault();



                var vector = new THREE.Vector3((event.clientX / window.innerWidth ) * 2 - 1,-( event.clientY / window.innerHeight ) * 2 + 1, 0.5);

                projector.unprojectVector(vector, camera);

                var raycaster = new THREE.Raycaster(camera.position,vector.sub(camera.position).normalize());

                //var intersects = raycaster.intersectObjects([sun,mercury,venus,earth,mars,jupiter,saturn,uranus,neptune]);

                var intersects = raycaster.intersectObjects(scene.children,true);





                if (intersects.length > 0) {

                    selection = intersects[ 0 ].object;

                    console.log(selection.name);

                    state = selection.id;



                    x0 = selection.position.x;

                    z0 = selection.position.z;

                    if (selection.name=='star')

                    {

                        selection=null;

                        state=0;

                    }

                }

                else{

                    state = 0;

                }

				console.log(state);



                document.addEventListener( 'mousemove', onDocumentMouseMove, false );

                document.addEventListener( 'mouseup', onDocumentMouseUp, false );

                document.addEventListener( 'mouseout', onDocumentMouseOut, false );



                mouseXOnMouseDown = event.clientX - windowHalfX;

                targetRotationOnMouseDownX = targetRotationX;

                

                mouseYOnMouseDown = event.clientY - windowHalfY;

                targetRotationOnMouseDownY = targetRotationY;



        }

    var getLocation = function(event){

        if(event.clientY - windowHalfY > 0) return 1;

        else return 2;

    }

    function onDocumentMouseMove( event ) {

        if (state == 0){

            mouseX = event.clientX - windowHalfX;

            mouseY = event.clientY - windowHalfY;



            targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.01;

            targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.01;

        } else {

            if (check == 0) {

                (event.clientY - windowHalfY > 0 )?check = 1: check = 2;

            }

            if(check == 1){

                if(check == getLocation(event)) {

                    delta += event.clientX - windowHalfX - mouseXOnMouseDown;

                }else {

                    delta -= event.clientX - windowHalfX - mouseXOnMouseDown;

                }

                mouseXOnMouseDown = event.clientX;

                var theta = delta  / windowHalfX * 2 * Math.PI;

                selection.position.x = x0 * Math.cos(theta) + z0 * Math.sin(theta);

                selection.position.z = -x0 * Math.sin(theta) + z0 * Math.cos(theta);



            } else {

                console.log("2. o tren");

                if(check == getLocation(event)) {

                    delta += event.clientX - windowHalfX - mouseXOnMouseDown;

                }else {

                    delta -= event.clientX - windowHalfX - mouseXOnMouseDown;

                }

                mouseXOnMouseDown = event.clientX;

                var theta = delta  / windowHalfX * 2 * Math.PI;

                selection.position.x = x0 * Math.cos(theta) - z0 * Math.sin(theta);

                selection.position.z = x0 * Math.sin(theta) + z0 * Math.cos(theta);

            }



        }



    }



        function onDocumentMouseUp( event ) {



                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );

                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );

                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );



        }



        function onDocumentMouseOut( event ) {



                document.removeEventListener( 'mousemove', onDocumentMouseMove, false );

                document.removeEventListener( 'mouseup', onDocumentMouseUp, false );

                document.removeEventListener( 'mouseout', onDocumentMouseOut, false );



        }



        function onDocumentTouchStart( event ) {



                if ( event.touches.length == 1 ) {



                        event.preventDefault();



                        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;

                        targetRotationOnMouseDownX = targetRotationX;

                        

                        mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;

                        targetRotationOnMouseDownY = targetRotationY;

                        

                        



                }



        }



        function onDocumentTouchMove( event ) {



                if ( event.touches.length == 1 ) {



                        event.preventDefault();



                        mouseX = event.touches[ 0 ].pageX - windowHalfX;

                        targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.05;

                        

                        mouseY = event.touches[ 0 ].pageY - windowHalfY;

                        targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.05;



                }



        }



        //



        function animate() {

                requestAnimationFrame( animate );

                render();



        }



        function render() {

             //horizontal rotahion   

             group.rotation.y += ( targetRotationX - group.rotation.y ) * 0.01;

             //vertical rotation 

             finalRotationY = (targetRotationY - group.rotation.x); 



             

            if (group.rotation.x <= Math.PI/2 && group.rotation.x >= -Math.PI/2) {



                group.rotation.x += finalRotationY * 0.1;

            }

            if (group.rotation.x > Math.PI/2) {



                group.rotation.x = Math.PI/2;

            }

            else if (group.rotation.x < -Math.PI/2) {



                group.rotation.x = -Math.PI/2;

            }



        }

}