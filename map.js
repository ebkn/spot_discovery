window.onload = function(){
    let ymap = new Y.Map("div_map");
    // ymap.drawMap(new Y.LatLng( 35.6811673, 139.7670516 ),  17, Y.LayerSetId.NORMAL);
    ymap.drawMap(new Y.LatLng( 34.965543, 135.697628 ),  17, Y.LayerSetId.NORMAL);
    ymap.setConfigure("scrollWheelZoom", true);
    ymap.setConfigure("continuousZoom", true);

    let markers = [];
    let latlng  = ymap.getCenter();
    let registeredSpots = [];
    let minLat, maxLat, minLng, maxLng;

    if(ymap.isInfoWindowOpen()) {
        ymap.closeInfoWindow();
    }

    if(markers.length>0) {
        ymap.removeFeature(markers[0]);
        markers = [];
    }

    let imageUrl = [
        "./images/spot1.jpg",
        "./images/spot2.png",
        "./images/spot3.jpg",
        "./images/spot4.jpg",
        // "./images/spot5.jpg"
    ];
    let imageTitle = [
        "カラフルな住宅",
        "変わった交差点",
        "頭上に鳥居",
        "怪しくない",
        // "./images/spot5.jpg"
    ];

    let centerMarker = new Y.Marker(new Y.LatLng( latlng.lat(), latlng.lng()), Y.Icon.DEFAULT_ICON);
    // markers.push(centerMarker);
    ymap.addFeatures(centerMarker);
    

    for(let i=0; i<imageUrl.length; i++) {
        let lat, lng;
        switch(i){
            case 0:
                lat = latlng.lat()-0.0016;
                lng = latlng.lng()-0.0004;
                break;
            case 1:
                lat = latlng.lat()+0.002;
                lng = latlng.lng()+0.0014;
                break;
            case 2:
                lat = latlng.lat()+0.001;
                lng = latlng.lng()-0.0028;
                break;
            case 3:
                lat = latlng.lat()+0.003;
                lng = latlng.lng()-0.004;
                break;
            case 4:
                lat = latlng.lat()+0.004;
                lng = latlng.lng()-0.002;
                break;
        }

        let newMarker = new Y.Marker(new Y.LatLng(lat, lng));

        let title = imageTitle[i];
        let image_path = imageUrl[i];
        let data = image_path.split("/");
        data[1] = 'spots';
        let image_name = data[2];
        let name_extension = image_name.split(".");
        name_extension[1] = 'html';
        data[2] = name_extension.join('.');
        let image_url = data.join('/');
        
        newMarker.bindInfoWindow("<a href=" + image_url + " style='text-decoration: none; color: black;'><h3>" + title + "</h3></a>");

        markers.push(newMarker);
        markers.push(centerMarker);
        ymap.addFeatures(markers);
        markers.pop();

        for(let j=0; j<markers.length; j++) {
            let m = markers[j];
            let val = imageUrl[j];

            // m.setDraggable(true);

            let markerDom = m.getDOMNode();
            console.log(markerDom);
            markerDom.src = val;
            markerDom.style.width = "50px";
            markerDom.style.height = "50px";
            markerDom.style.borderRadius = "5px";
            markerDom.setAttribute("path", val);

            m.bind('mouseover', function(){
                markerDom.style.width = "150px";
                markerDom.style.height = "150px";
                markerDom.style.transition = "all 0.2s";
            });

            m.bind('mouseout', function() {
                // setTimeout(function() {
                markerDom.style.width = "50px";
                markerDom.style.height = "50px";

                // },10);
            });

            m.bind('click', function(){
                for(let j of markers){
                    let jDom = j.getDOMNode();
                    jDom.style.width = "50px";
                    jDom.style.height = "50px";
                }
                if (markerDom.style.width == "150px") {
                    let image_path = markerDom.getAttribute("path");
                    let data = image_path.split("/");
                    data[1] = 'spots';
                    let image_name = data[2];
                    let name_extension = image_name.split(".");
                    name_extension[1] = 'html';
                    data[2] = name_extension.join('.');
                    let image_url = data.join('/');
                    console.log(image_url)

                    location.href = image_url;
                    return false;
                }
                markerDom.style.width = "150px";
                markerDom.style.height = "150px";
                markerDom.style.transition = "all 0.2s";
            });
        }
    };

    ymap.bind("click", function(latlng) {
        ymap.closeInfoWindow();
        for(let m of markers){
            let markerDom = m.getDOMNode();
            markerDom.style.width = "50px";
            markerDom.style.height = "50px";
        }
    });
};
