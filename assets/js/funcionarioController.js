/**
 * Created by Owner on 9/29/2014.
 */
app.controller("funcionarioCTL", ['$scope', '$http','$filter' ,function ($scope, $http, $filter) {

    $scope.viajes = window.viajes;
    $scope.funcionario = window.funcionario;
    $scope.totalViaticos = 0.0;
    for (var i=0;i<$scope.viajes.length;i++) {
        var el = $scope.viajes[i];
        $scope.totalViaticos += el.gasto_viatico;
    }

    $scope.fbShare = function(url) {
        console.log(url);
        window.open(
        'https://www.facebook.com/sharer/sharer.php?u='+url, 
        'facebook-share-dialog', 
        'width=520,height=350'); 
        return false;
    };

    $scope.startRadialD3 = function(){
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        var day = Math.floor(diff / oneDay);

        var days = 0;

        $scope.viajes.map(function(viaje){
           var dateInicio = new Date(viaje.fecha_inicio_com);
           var dateFin = new Date(viaje.fecha_fin_com);
           var dateDiff = dateFin - dateInicio;
           var vacas = Math.floor(dateDiff / oneDay);
           days += days + vacas;
        });

        var rp1 = radialProgress(document.getElementById('radial-one'))
            .diameter(150)
            .value((days/day) * 100)
            .label('De viaje')
            .render();

        var rp2 = radialProgress(document.getElementById('radial-two'))
            .diameter(150)
            .value(((day-days)/day) * 100)
            .label('En casa')
            .render();

        //$scope.addTextRadial('radial-international-trips','Internacionales');
        //$scope.addTextRadial('radial-rnational-trips','Nacionales');

    };

    $scope.getTotal = function(){
        var total = 0;
        for(var i = 0; i < $scope.viajes.length; i++){
            var viaje = $scope.viajes[i];
            total += viaje.gasto_total;
        }
        return total;
    };

    $scope.getDateString = function(viaje){
        var inicio = new Date(viaje.fecha_inicio_com);
        var fin = new Date(viaje.fecha_fin_com);
        var inicioAux = $filter('date')(inicio, 'longDate');
        var finAux = $filter('date')(fin, 'longDate');
        return inicioAux + " al " + finAux;
    };

    $scope.setData = function() {
        var comprobados = 0;
        var sincomprobar = 0;
        var devuelto = 0;
        for (var i=0;i<$scope.viajes.length;i++) {
            var el = $scope.viajes[i];
            comprobados += el.viatico_comprobado;
            sincomprobar += el.viatico_sin_comprobar;
            devuelto += el.viatico_devuelto;
        }

        $scope.dataViaticos = [comprobados,sincomprobar,devuelto];
        $scope.labelsViaticos = ['Comprobados', 'Sin comprobar' , 'Devueltos'];
    };

    $scope.drawChartHorizontal = function(){
        var options = {
            scaleIntegersOnly: true,
            responsive: true,
            scaleGridLineColor : "rgb(255,255,255)",
            showTooltips:true,
            scaleLabel : "$<%=value%>",
            legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
        };
        $scope.setData();
        var barChartData = {
            labels : $scope.labelsViaticos,
            datasets : [
                {
                    fillColor : "#2f96e9",
                    strokeColor : "#2f96e9",
                    data : $scope.dataViaticos,
                },
            ]
        }
        var element = document.getElementById("chart-horizontal").getContext("2d");
        $scope.myLine = new Chart(element).Bar(barChartData,options);
    };

    $scope.layers =  {
        baselayers: {
            xyz: {
                name: 'OpenStreetMap (XYZ)',
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                type: 'xyz'
                //layerOptions: {
                  //  attribution: '<a href="http://spaceshiplabs.com" target="_blank">Spaceshiplabs.com</a> | <a  target="_blank" href="http://gasolinapp.com">Gasolinapp.com</a>'
                //}
            }
        }
    };
    $scope.options = {
        attributionControl : true, 
        zoomControlPosition: 'bottomright',
        imagePath : '/bower_components/leaflet/dist/images/'
    };

    $scope.mapCenter = {
        lng : -99.133208,
        lat : 19.4326077,
        zoom : 4,
    };

    $scope.$on('leafletDirectiveMarker.click', function(event, args){
        var place = $scope.markers[args.markerName].message;
        place = $.parseHTML(place);
        place = place[2].innerHTML;
        $scope.loadViajes(place);
    });

    $scope.leafIcon = {
        iconUrl: '../images/pin_mapa.png',
        iconSize:     [33, 46], // size of the icon
        iconAnchor:   [16, 36] // point of the icon which will correspond to marker's location
    };


    $scope.get_markers = function(){
        var markers = [];
        $scope.markers = [];
        var msg;
        $scope.viajes.forEach(function(marker){
                var parcialGastado = (parseInt(marker.gasto_pasaje,10) ? parseInt(marker.gasto_pasaje,10) : 0) + (parseInt(marker.gasto_viatico,10) ? parseInt(marker.gasto_viatico,10) : 0);
                var parcialGastadoStr = $filter('currency')(parcialGastado, '$');
                msg = '<p><strong>' + parcialGastadoStr +' MXP'+'</strong></p>Gasto hasta el dia de hoy de viajes en <span class="place">'
                      + marker.ciudad_destino + '</span>';
                markers.push({
                    lat: parseFloat(marker.destino_latitud),
                    lng: parseFloat(marker.destino_longitud),
                    message: msg,
                    icon : $scope.leafIcon
                });
        });
        $scope.markers = markers;
        if(markers.length == 1){
            var mark = markers[0];
            $scope.mapCenter = {
                lng : mark.lat,
                lat : mark.lng,
                zoom : 2
            }
        }
    };

    $scope.loadViajes = function(ciudad) {
        $scope.mapPlace = ciudad;
        $scope.toggleSidebar = true;

        $http({method: 'POST', url: '/home/vajesPorCiudadJson?ciudad=' + ciudad})
            .success(function(data){
                $scope.items = data;
            });
    };

    $scope.startRadialD3();
    $scope.drawChartHorizontal();
    $scope.get_markers();
}]);

app.controller("listadoCTL", ['$scope', '$http','$filter' ,function ($scope, $http, $filter) {
    $scope.totalItems = window.count;
    $scope.currentPage = window.page;
    $scope.siteUrl = window.siteUrl;
    $scope.pageChanged = function(){
        window.location.href = $scope.siteUrl + "/funcionario/list?page=" + $scope.currentPage;
    }
}]);

app.controller("compararCTL", ['$scope', '$http','$filter' ,function ($scope, $http, $filter) {
    $scope.funcionarios = window.funcionarios;
    $scope.quantity = 1;
    $scope.getTotal = function(viajes){
        var total = 0;
        for(var i = 0; i < viajes.length; i++){
            var viaje = viajes[i];
            total += viaje.gasto_total;
        }
        return total;
    };
    $scope.setDataViajes = function(viajes){
        var now = new Date();
        var start = new Date(now.getFullYear(), 0, 0);
        var diff = now - start;
        var oneDay = 1000 * 60 * 60 * 24;
        $scope.day = Math.floor(diff / oneDay);

        var days = 0;

        viajes.map(function(viaje){
           var dateInicio = new Date(viaje.fecha_inicio_com);
           var dateFin = new Date(viaje.fecha_fin_com);
           var dateDiff = dateFin - dateInicio;
           var vacas = Math.floor(dateDiff / oneDay);
           days += days + vacas;
        });
        return days;
    }
    $scope.drawDonuts = function(){
        setTimeout(
            function(){
                var days1 = $scope.setDataViajes($scope.funcionarios[0].viajes);
                var days2 = $scope.setDataViajes($scope.funcionarios[1].viajes);

                var rp1 = radialProgress(document.getElementById('radial-one0'))
                    .diameter(150)
                    .value((days1/$scope.day) * 100)
                    .label('De viaje')
                    .render();

                var rp2 = radialProgress(document.getElementById('radial-two0'))
                    .diameter(150)
                    .value((($scope.day-days1)/$scope.day) * 100)
                    .label('En casa')
                    .render();

                var rp3 = radialProgress(document.getElementById('radial-one1'))
                    .diameter(150)
                    .value((days2/$scope.day) * 100)
                    .label('De viaje')
                    .render();

                var rp4 = radialProgress(document.getElementById('radial-two1'))
                    .diameter(150)
                    .value((($scope.day-days2)/$scope.day) * 100)
                    .label('En casa')
                    .render();

            },1000
        );

    }
    
    $scope.drawDonuts();
}]);
