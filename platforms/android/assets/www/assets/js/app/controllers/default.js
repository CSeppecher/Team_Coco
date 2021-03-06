
var db;

//Main controller
myApp.controller('mainController', function($scope, localStorageService, $location, $webSql) {

	$scope.title	= 'Homepage';
    db = $webSql.openDatabase('crewdb', '1.0', 'Test DB', 2 * 1024 * 1024); // opening db
                 
    $scope.importData = function () {
                 //WEB SQL filling database
                 // reading from html files with json architecture
                 var dataLines = [];
                 $.ajax({ url: 'datas/html/input.html', type:'get', async:false, success: function(html, $scope) { dataLines = angular.fromJson( String(html)); } });
                 
                 
                 
                 // deleting tables making room for new data and dat architecture
                 db.dropTable("lines");
                 
                 
                 db.createTable('lines', { "id":{"type":"INTEGER"},"topo":{ "type": "TEXT"}, "name":{ "type": "TEXT"}, "grade": { "type": "TEXT" }, "latitude": { "type": "TEXT" }, "longitude": { "type": "TEXT" }, "accuracy": { "type": "INTEGER" }, "sector": { "type": "TEXT" } });
                 
          
                 
                 // filling tables with data
                 
                 for(var i=0; i< dataLines.length; i++){
                 db.insert('lines', {"id": dataLines[i].id, "topo": dataLines[i].topo, "name": dataLines[i].name, "grade": dataLines[i].grade, "latitude": dataLines[i].latitude, "longitude": dataLines[i].longitude, "accuracy": dataLines[i].accuracy, "sector": dataLines[i].sector}).then(function(results) { console.log(results.insertId); });
                 }
                 
                 alert('data imported from "input.html"');
                 
                 
    };
    
                 
    $scope.exportData = function () {
                 
        $scope.lines = [];
        db.selectAll("lines").then(function(results) {
                                            
            for(i=0; i < results.rows.length; i++){
                document.write(results.rows.item(i).id + ";");
                document.write(results.rows.item(i).name + ";");
                document.write(results.rows.item(i).latitude + ";");
                document.write(results.rows.item(i).longitude + ";");
                document.write(results.rows.item(i).accuracy + "<br>");
            }
        });
                 
        
    }
                 
    $scope.showList = function() {
                 $location.path('/list');
    };
    


});



myApp.controller('ListCtrl', function($scope, $location, $webSql) {
    $scope.lines = [];
    db.selectAll("lines").then(function(results) {
        
        for(i=0; i < results.rows.length; i++){
                $scope.lines.push(results.rows.item(i));
        }
    });
                 
    
                 
    $scope.back = function() {
        $location.path('/home');
    }
	
	$scope.detail = function(lineId) {
		$location.path('/detail/' + lineId);
	}
});;

myApp.controller('DetailCtrl', function($scope, $routeParams, $location, $webSql) {
                 

   id = parseInt($routeParams.lineId);
   gpsTriger();
                 
   $scope.pingGps = function(){
        gpsTriger();
   };
                 
                 
    $scope.line = {};
    db.select("lines", { "id": { "value": id}}).then(function(results) {
                                                     $scope.line = results.rows.item(0); });
                 
                 
                 
    $scope.updating = function() {
        db.update("lines", {"latitude": CurrentLatitude}, {'id': id });
        db.update("lines", {"longitude": CurrentLongitude}, {'id': id });
        db.update("lines", {"accuracy": CurrentAccuracy}, {'id': id });
                 gpsoff == true;
        $location.path('/list');
    };
                 
    $scope.discard = function() {
        $location.path('/list');
    };
                 
});

