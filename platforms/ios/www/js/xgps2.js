///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////     GPS FUNCTIONS        /////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

 
 
    function gpsTriger(){ //setting up all variables involved and launching GPS query
        time = new Date().getTime();
    	CurrentLatitude = 0;
    	CurrentLongitude = 0;
    	CurrentAltitude = 0;
    	CurrentAccuracy = 0;
    	accuracy = 1000;
    	gpsoff = false;
    	list = [];
    	historic = [];

    	OptimalAccuracy = 100;
    	navigator.geolocation.getCurrentPosition(gpsOptimisation, onError, {maximumAge: 0, timeout: 5000000, enableHighAccuracy: true});
    }
    
    function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}
 
    function gpsOptimisation(position) {
   	accuracy = position.coords.accuracy;
	n = (new Date().getTime()-time)/1000;
    historic.push([n, position.coords.accuracy]);

   	if(list.length===0){  		
	   	list.push([position.coords.latitude,position.coords.longitude,position.coords.altitude,position.coords.accuracy]);
	   	CurrentLatitude = position.coords.latitude;
        CurrentLongitude = position.coords.longitude;
        CurrentAltitude = position.coords.altitude;
        CurrentAccuracy = position.coords.accuracy; 
   	}
   	else{
   		if(!((position.coords.latitude == list[list.length-1][0])||(position.coords.longitude == list[list.length-1][1])||(position.coords.longitude == list[list.length-1][2]))){
	   		list.push([position.coords.latitude,position.coords.longitude,position.coords.altitude,position.coords.accuracy]);
	    	OptimalLatitude = 0;
    		OptimalLongitude = 0;
    		OptimalAltitude = 0;
    		OptimalAccuracy = 0;
    		SumAccuracy = 0;
	   		for(var i=0;i<list.length;i++){
	   			if(list[i][3]!==0){
	   				OptimalLatitude = OptimalLatitude + list[i][0]/list[i][3];
    				OptimalLongitude = OptimalLongitude + list[i][1]/list[i][3];
    				OptimalAltitude = OptimalAltitude + list[i][2]/list[i][3];
    				OptimalAccuracy = OptimalAccuracy + 1/list[i][3];
    				SumAccuracy = SumAccuracy +  1/list[i][3];
    			}
	   		}
	   		if(SumAccuracy!==0){
	   			OptimalLatitude = OptimalLatitude / SumAccuracy;
    			OptimalLongitude = OptimalLongitude / SumAccuracy;
    			OptimalAltitude = OptimalAltitude / SumAccuracy;
    			OptimalAccuracy = 1/OptimalAccuracy;
    		
    		    CurrentLatitude = OptimalLatitude;
                CurrentLongitude = OptimalLongitude;
                CurrentAltitude = OptimalAltitude;
                CurrentAccuracy = OptimalAccuracy; 
            }
}
   		      
   		     var elementgps = document.getElementById('gpssection');
   		     //affichage de la precision dans l'onglet gpssection
   		     if(CurrentAccuracy<=2){
   		     	elementgps.innerHTML = '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">' + CurrentAccuracy + 'm </div>';
   		     	
   		     } else{ if(CurrentAccuracy<=3){	
   		     	elementgps.innerHTML = '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 90%;">' + CurrentAccuracy + 'm </div>';
   		     } else{ if(CurrentAccuracy<=4){	
   		     	elementgps.innerHTML = '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 85%;">' + CurrentAccuracy + 'm </div>';
   		     } else{ if(CurrentAccuracy<=5){	
   		     	elementgps.innerHTML = '<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 80%;">' + CurrentAccuracy + 'm </div>';
   		     } else{ if(CurrentAccuracy<=7){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 70%;">' + CurrentAccuracy + 'm </div>';
   		     } else{ if(CurrentAccuracy<=10){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">' + CurrentAccuracy + 'm </div>';
   		     } else{ if(CurrentAccuracy<=15){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">' + CurrentAccuracy + 'm </div>';
   		     } else{ if(CurrentAccuracy<=20){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 40%;">' + CurrentAccuracy + 'm </div>';
   		     } else{ if(CurrentAccuracy<=40){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 30%;">' + CurrentAccuracy + 'm </div>';
   		     } else{ if(CurrentAccuracy<=60){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 20%;">' + CurrentAccuracy + 'm </div>';
   		     } else{ if(CurrentAccuracy<=100){
   		      	elementgps.innerHTML = '<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 10%;">' + CurrentAccuracy + 'm </div>';
               }}}}}}}}}}}		
  	 	}
  
      if(gpsoff == true){ return;} 

	  navigator.geolocation.getCurrentPosition(gpsOptimisation, onError, {maximumAge: 0, timeout: 5000000, enableHighAccuracy: true});


  
   } 
   
