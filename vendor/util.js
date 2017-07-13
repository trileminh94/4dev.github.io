
function SystemUtil() {

    this.pause = false;

    this.mercuryRadius = 7;
    this.mercuryPosition = 90;

    this.venusRadius = 10;
    this.venusPosition = 135;

    this.earthRadius = 14;
    this.earthPosition = 175;

    this.marsRadius = 12;
    this.marsposition = 221;

    this.jupiterRadius = 22;
    this.jupiterPosition = 270;

    this.saturnRadius = 16;
    this.saturnPosition = 320;

    this.uranusRadius = 10;
    this.uranusPosition = 350;

    this.neptuneRadius = 8;
    this.neptunePosition = 370;


/////////////////////////////////////////////////////////////////////
//	setup planet velocity
///////////////////////////////////////////////////////////////////

    this.mercuryRotateVelocity = 0.1;
    this.earthRotateVelocity = 0.07;
    this.venusRotateVelocity = 0.09;
    this.marsRotateVelocity = 0.05;
    this.jupiterRotateVelocity = 0.04;
    this.saturnRotateVelocity = 0.02;
    this.uranusRotateVelocity = 0.01;
    this.neptuneRotateVelocity = 0.005;

    this.mercuryVelocity = 0.05;
    this.venusVelocity = 0.04;
    this.earthVelocity = 0.03;
    this.marsVelocity = 0.015;
    this.jupiterVelocity = 0.004;
    this.saturnVelocity = 0.0025;
    this.uranusVelocity = 0.0015;
    this.neptuneVelocity = 0.0005;
    this.moonVelocity = 0.125;

    this.mercuryVisible = true;
    this.venusVisible = true;
    this.earthVisible = true;
    this.marsVisible = true;
    this.jupiterVisible = true;
    this.saturnVisible = true;
    this.uranusVisible = true;
    this.neptuneVisible = true;


    this.makemercury = function () {
        var geo = new THREE.SphereGeometry(this.mercuryRadius, 32, 32);
        var map = THREE.ImageUtils.loadTexture("images/mercurymap.jpg");
        var bump = THREE.ImageUtils.loadTexture("images/mercurybump.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = map;
        mat.bumpMap = bump;
        mat.bumpScale = 0.05;
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(this.mercuryPosition, 0, 0);
        mesh.name = "mercury";
        mesh.id = 1;
        return mesh;
    };


    this.makevenus = function () {
        var geo = new THREE.SphereGeometry(this.venusRadius, 32, 32);
        var map = THREE.ImageUtils.loadTexture("images/venusmap.jpg");
        var bump = THREE.ImageUtils.loadTexture("images/venusbump.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = map;
        mat.bumpMap = bump;
        mat.bumpScale = 0.05;
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(this.venusPosition, 0, 0);
        mesh.name = "venus";
        mesh.id = 2;
        return mesh;
    };

    this.makeearth = function () {
        var geo = new THREE.SphereGeometry(this.earthRadius, 32, 32);
        var map = THREE.ImageUtils.loadTexture("images/earthmap.jpg");
        var bump = THREE.ImageUtils.loadTexture("images/earthbump.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = map;
        mat.bumpMap = bump;
        mat.bumpScale = 0.05;
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(this.earthPosition, 0, 0);
        mesh.name = "earth";
        mesh.id = 3;

        var moonPivot = new THREE.Object3D();
        var moon = this.makeMoon();
        moon.position.set(this.earthRadius + 7,0,0);
        moonPivot.add(moon);
        moonPivot.name="moonpivot";
        mesh.add(moonPivot);
        return mesh;
    };

    this.makemars = function () {
        var geo = new THREE.SphereGeometry(this.marsRadius, 32, 32);
        var map = THREE.ImageUtils.loadTexture("images/marsmap.jpg");
        var bump = THREE.ImageUtils.loadTexture("images/marsbump.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = map;
        mat.bumpMap = bump;
        mat.bumpScale = 0.05;
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(this.marsposition, 0, 0);
        mesh.name = "mars";
        mesh.id = 3;
        return mesh;
    };

    this.makejupiter = function () {
        var geo = new THREE.SphereGeometry(this.jupiterRadius, 32, 32);
        var map = THREE.ImageUtils.loadTexture("images/jupitermap.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = map;
        mat.bumpScale = 0.05;
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(this.jupiterPosition, 0, 0);
        mesh.name = "jupiter";
        mesh.id = 4;
        return mesh;
    };

    this.makesaturn = function () {
        var geo = new THREE.SphereGeometry(this.saturnRadius, 32, 32);
        var map = THREE.ImageUtils.loadTexture("images/saturnmap.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = map;
        mat.bumpScale = 0.05;
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(this.saturnPosition, 0, 0);
        mesh.name = "saturn";
        mesh.id = 5;

        var ring = this.createSaturnRing();
        ring.position.set(0,0,0);
        ring.scale = new THREE.Vector3(35,35,35);
        ring.name = "saturnring";
        mesh.add(ring);
        return mesh;
    };

    //reference from threex.planets
    this.createUranusRing	= function(){
        // create destination canvas
        var canvasResult	= document.createElement('canvas')
        canvasResult.width	= 1024
        canvasResult.height	= 72
        var contextResult	= canvasResult.getContext('2d')

        // load earthcloudmap
        var imageMap	= new Image();
        imageMap.addEventListener("load", function() {

            // create dataMap ImageData for earthcloudmap
            var canvasMap	= document.createElement('canvas')
            canvasMap.width	= imageMap.width
            canvasMap.height= imageMap.height
            var contextMap	= canvasMap.getContext('2d')
            contextMap.drawImage(imageMap, 0, 0)
            var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

            // load earthcloudmaptrans
            var imageTrans	= new Image();
            imageTrans.addEventListener("load", function(){
                // create dataTrans ImageData for earthcloudmaptrans
                var canvasTrans		= document.createElement('canvas')
                canvasTrans.width	= imageTrans.width
                canvasTrans.height	= imageTrans.height
                var contextTrans	= canvasTrans.getContext('2d')
                contextTrans.drawImage(imageTrans, 0, 0)
                var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
                // merge dataMap + dataTrans into dataResult
                var dataResult		= contextMap.createImageData(canvasResult.width, canvasResult.height)
                for(var y = 0, offset = 0; y < imageMap.height; y++){
                    for(var x = 0; x < imageMap.width; x++, offset += 4){
                        dataResult.data[offset+0]	= dataMap.data[offset+0]
                        dataResult.data[offset+1]	= dataMap.data[offset+1]
                        dataResult.data[offset+2]	= dataMap.data[offset+2]
                        dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]/2
                    }
                }
                // update texture with result
                contextResult.putImageData(dataResult,0,0)
                material.map.needsUpdate = true;
            })
            imageTrans.src	= 'images/uranusringtrans.gif';
        }, false);
        imageMap.src	= 'images/uranusringcolour.jpg';

        var geometry	= new THREE.RingGeometry(0.55, 0.75, 64);
        var material	= new THREE.MeshPhongMaterial({
            map		: new THREE.Texture(canvasResult),
            side		: THREE.DoubleSide,
            transparent	: true,
            opacity		: 0.8,
        })
        var mesh	= new THREE.Mesh(geometry, material)
        mesh.lookAt(new THREE.Vector3(0.5,-4,1))
        return mesh
    }

    //reference from threex.planets
    this.createSaturnRing	= function(){
        // create destination canvas
        var canvasResult	= document.createElement('canvas')
        canvasResult.width	= 915
        canvasResult.height	= 64
        var contextResult	= canvasResult.getContext('2d')

        // load earthcloudmap
        var imageMap	= new Image();
        imageMap.addEventListener("load", function() {

            // create dataMap ImageData for earthcloudmap
            var canvasMap	= document.createElement('canvas')
            canvasMap.width	= imageMap.width
            canvasMap.height= imageMap.height
            var contextMap	= canvasMap.getContext('2d')
            contextMap.drawImage(imageMap, 0, 0)
            var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

            // load earthcloudmaptrans
            var imageTrans	= new Image();
            imageTrans.addEventListener("load", function(){
                // create dataTrans ImageData for earthcloudmaptrans
                var canvasTrans		= document.createElement('canvas')
                canvasTrans.width	= imageTrans.width
                canvasTrans.height	= imageTrans.height
                var contextTrans	= canvasTrans.getContext('2d')
                contextTrans.drawImage(imageTrans, 0, 0)
                var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
                // merge dataMap + dataTrans into dataResult
                var dataResult		= contextMap.createImageData(canvasResult.width, canvasResult.height)
                for(var y = 0, offset = 0; y < imageMap.height; y++){
                    for(var x = 0; x < imageMap.width; x++, offset += 4){
                        dataResult.data[offset+0]	= dataMap.data[offset+0]
                        dataResult.data[offset+1]	= dataMap.data[offset+1]
                        dataResult.data[offset+2]	= dataMap.data[offset+2]
                        dataResult.data[offset+3]	= 255 - dataTrans.data[offset+0]/4
                    }
                }
                // update texture with result
                contextResult.putImageData(dataResult,0,0)
                material.map.needsUpdate = true;
            })
            imageTrans.src	= 'images/saturnringpattern.gif';
        }, false);
        imageMap.src	= 'images/saturnringcolor.jpg';

        var geometry	= new THREE.RingGeometry(0.55, 0.75, 64);
        var material	= new THREE.MeshPhongMaterial({
            map		: new THREE.Texture(canvasResult),
            // map		: THREE.ImageUtils.loadTexture(THREEx.Planets.baseURL+'images/ash_uvgrid01.jpg'),
            side		: THREE.DoubleSide,
            transparent	: true,
            opacity		: 0.8,
        })
        var mesh	= new THREE.Mesh(geometry, material)
        mesh.lookAt(new THREE.Vector3(0.5,-4,1))
        return mesh
    };

    this.makeuranus = function () {
        var geo = new THREE.SphereGeometry(this.uranusRadius, 32, 32);
        var map = THREE.ImageUtils.loadTexture("images/uranusmap.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = map;
        mat.bumpScale = 0.05;
        mat.shininess = 0.05;
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(this.uranusPosition, 0, 0);
        mesh.name = "uranus";
        mesh.id = 6;

        var ring = this.createSaturnRing();
        ring.position.set(0,0,0);
        ring.scale = new THREE.Vector3(30,30,30);
        ring.name = "uranusring";
        mesh.add(ring);
        return mesh;
    };

    this.makeneptune = function () {
        var geo = new THREE.SphereGeometry(this.neptuneRadius, 32, 32);
        var map = THREE.ImageUtils.loadTexture("images/neptunemap.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = map;
        mat.bumpScale = 0.05;
        mat.shininess = 0.05;
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(this.neptunePosition, 0, 0);
        mesh.name = "neptune";
        mesh.id = 7;
        return mesh;
    };

    this.makeOuter = function () {
        var geo = new THREE.SphereGeometry(4000, 100, 100);
        var map = THREE.ImageUtils.loadTexture("images/galaxy_starfield.png");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = map;
        mat.side = THREE.DoubleSide;
        var mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(0, 0, 0);
        mesh.name = "star";
        mesh.id = 8;
        return mesh;
    };

    this.makeMoon = function () {
        var geo = new THREE.SphereGeometry(2, 10, 10);
        var map = THREE.ImageUtils.loadTexture("images/moonmap.jpg");
        var mat = new THREE.MeshPhongMaterial();
        mat.map = map;
        mat.side = THREE.DoubleSide;
        var mesh = new THREE.Mesh(geo, mat);
        mesh.name = "moon";
        mesh.id = 9;
        return mesh;
    };

    this.makeSunLight = function () {
        var textureMau = THREE.ImageUtils.loadTexture("images/mauchoi.png");
        var textureChoi = THREE.ImageUtils.loadTexture("images/choi.png");

        var flareColor = new THREE.Color(0xffaacc);
        var lensFlare = new THREE.LensFlare(textureMau, 200, 0.0, THREE.AdditiveBlending, flareColor);

        lensFlare.add(textureChoi, 200, 0, THREE.AdditiveBlending);
        lensFlare.add(textureChoi, 220, 0.3, THREE.AdditiveBlending);
        lensFlare.add(textureChoi, 230, 0.5, THREE.AdditiveBlending);
        lensFlare.add(textureChoi, 270, 0.4, THREE.AdditiveBlending);

        return lensFlare;
    };

    this.createOrbit = function (radius, name) {
        var geometry = new THREE.TorusGeometry(radius, 0.4, 32, 100);
        var material = new THREE.MeshBasicMaterial({color: 0x666666, transparent: true, opacity: 0.1});
        material.side = THREE.DoubleSide;
        var torus = new THREE.Mesh(geometry, material);
        torus.rotation.x = Math.PI / 2;
        torus.name = name;
        return torus;
    };

    this.createCoreEarth = function(){
        var group = new THREE.Object3D();

        //phan loi
        var loiGeo = new THREE.SphereGeometry(0.3, 30, 30, 0, 6.3, 0, Math.PI);
        var core = THREE.ImageUtils.loadTexture("images/dungnham2.png");
        var corespec = THREE.ImageUtils.loadTexture("images/bummap.jpg");
        var corematerial = new THREE.MeshPhongMaterial();
        corematerial.map = core;
        corematerial.specularMap = corespec;
        corematerial.specular = new THREE.Color(0xeeeeee);
        corematerial.shininess = 1;
        var loi = new THREE.Mesh(loiGeo, corematerial);
        loi.name = "loi trai dat";
        group.add(loi);


        //phan mantitrentrong
        var mantitrenTrongGeo = new THREE.SphereGeometry(0.6, 35, 35, 0, 4.3, 0, Math.PI);
        var mantitrenTrongMaterial = new THREE.MeshPhongMaterial({color: 0xdd3300});
        mantitrenTrongMaterial.side = THREE.DoubleSide;
        var mantitren = THREE.ImageUtils.loadTexture("images/lavatile.jpg");
        var mantitrenmaterial = new THREE.MeshPhongMaterial();
        mantitrenmaterial.map = mantitren;
        mantitrenmaterial.specularMap = corespec;
        mantitrenmaterial.specular = new THREE.Color(0xffffff);
        mantitrenmaterial.shininess = 1;
        mantitrenmaterial.side = THREE.DoubleSide;
        var mantitrenTrong = new THREE.Mesh(mantitrenTrongGeo, mantitrenmaterial);
        mantitrenTrong.name = "manti tren trong";
        group.add(mantitrenTrong);

        var bitmantitrenTrongGeo = new THREE.CircleGeometry(0.6, 30, 0, Math.PI);
        var bitmantitren = new THREE.Mesh(bitmantitrenTrongGeo, mantitrenmaterial);
        bitmantitren.rotateZ(Math.PI / 2);
        //bitmantitren.rotateY(Math.PI);
        group.add(bitmantitren);

        var bitmantitrenTrongGeo1 = new THREE.CircleGeometry(0.6, 30, 0, Math.PI);
        var bitmantitren1 = new THREE.Mesh(bitmantitrenTrongGeo1, mantitrenmaterial);
        bitmantitren1.rotation.set(0, 4.3 - Math.PI, -Math.PI / 2);
        group.add(bitmantitren1);


        //man ti ngoai
        var mantitrenNgoaiGeo = new THREE.SphereGeometry(0.95, 35, 35, 0.01, 4.29, 0, Math.PI);
        var mantitrenNgoaiMaterial = new THREE.MeshPhongMaterial({color: 0xcc5500});
        mantitrenNgoaiMaterial.side = THREE.DoubleSide;

        var manti = THREE.ImageUtils.loadTexture("images/dungnham.png");
        var mantitrengoaimaterial = new THREE.MeshPhongMaterial();
        mantitrengoaimaterial.map = manti;
        mantitrengoaimaterial.specular = new THREE.Color(0xee0000);
        mantitrengoaimaterial.shininess = 0.6;
        mantitrengoaimaterial.specularMap = corespec;
        mantitrengoaimaterial.side = THREE.DoubleSide;

        var mantitrenNgoai = new THREE.Mesh(mantitrenNgoaiGeo, mantitrengoaimaterial);
        group.add(mantitrenNgoai);

        var bitmantitrenNgoaiGeo = new THREE.CircleGeometry(0.95, 30, 0, Math.PI);
        var bitmantitrenNgoai = new THREE.Mesh(bitmantitrenNgoaiGeo, mantitrengoaimaterial);
        bitmantitrenNgoai.rotation.set(0, 0.01, Math.PI / 2);
        //bitmantitren.rotateY(Math.PI);
        group.add(bitmantitrenNgoai);

        var bitmantitrenNgoaiGeo1 = new THREE.CircleGeometry(0.95, 30, 0, Math.PI);
        var bitmantitren1Ngoai = new THREE.Mesh(bitmantitrenNgoaiGeo1, mantitrengoaimaterial);
        bitmantitren1Ngoai.rotation.set(0, 4.29 - Math.PI, -Math.PI / 2);
        group.add(bitmantitren1Ngoai);


        //phan vo trong
        var votrongGeo = new THREE.SphereGeometry(0.98, 35, 35, 0.02, 4.28, 0, Math.PI);
        var votrongMaterial = new THREE.MeshPhongMaterial({color: 0xffff00});
        votrongMaterial.side = THREE.DoubleSide;

        var votrongimg = THREE.ImageUtils.loadTexture("images/dungnham4.png");
        var votrongmaterial = new THREE.MeshPhongMaterial();
        votrongmaterial.map = votrongimg;
        votrongmaterial.side = THREE.DoubleSide;

        var votrong = new THREE.Mesh(votrongGeo, votrongmaterial);
        group.add(votrong);

        var bitvotrongGeo = new THREE.CircleGeometry(0.98, 30, 0, Math.PI);
        var bitvotrong = new THREE.Mesh(bitvotrongGeo, votrongmaterial);
        bitvotrong.rotation.set(0, 0.03, Math.PI / 2);
        //bitmantitren.rotateY(Math.PI);
        group.add(bitvotrong);

        var bitvotrong1Geo = new THREE.CircleGeometry(0.98, 30, 0, Math.PI);
        var bitvotrong1 = new THREE.Mesh(bitvotrong1Geo, votrongmaterial);
        bitvotrong1.rotation.set(0, 4.27 - Math.PI, -Math.PI / 2);
        group.add(bitvotrong1);

        //phan vo ngoai
        var vongoaiGeo = new THREE.SphereGeometry(1, 35, 35, 0.03, 4.27, 0, Math.PI);
        var texture = THREE.ImageUtils.loadTexture("images/earthpart.png");
        var bumearth = THREE.ImageUtils.loadTexture("images/bumearthpart.png");
        var earthspec = THREE.ImageUtils.loadTexture("images/earthspecpart.png");
        var map = new THREE.MeshPhongMaterial();
        map.map = texture;
        map.bumpMap = bumearth;
        map.specularMap = earthspec;
        var vongoaiMaterial = new THREE.MeshPhongMaterial({color: 0x8A0808});
        vongoaiMaterial.side = THREE.DoubleSide;
        var vongoai = new THREE.Mesh(vongoaiGeo, map);
        group.add(vongoai);

        var bitvongoaiGeo = new THREE.CircleGeometry(1, 30, 0, Math.PI);
        var bitvongoai = new THREE.Mesh(bitvongoaiGeo, vongoaiMaterial);
        bitvongoai.rotation.set(0, 0.05, Math.PI / 2);
        group.add(bitvongoai);

        var bitvongoai1Geo = new THREE.CircleGeometry(1, 30, 0, Math.PI);
        var bitvongoai1 = new THREE.Mesh(bitvongoai1Geo, vongoaiMaterial);
        bitvongoai1.rotation.set(0, 4.25 - Math.PI, -Math.PI / 2);
        group.add(bitvongoai1);


        group.receiveShadow = true;
        // group.rotation.set(0.2,0,0.2);
        console.log(group);
        return group;
    }
}

