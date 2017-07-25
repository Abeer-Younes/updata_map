
var map;
var markers = [];

//// this function make search button ////
function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("my_search");
    li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

}
//// End of this function ////

var musical_places = [
    {
        name : 'Cairo Jazz Club',
        LatLong : 
        {
            lat : 30.062237 ,
            lng : 31.212256
        },

    },
    
     {
        name : 'Naguib Mahfouz Cafe',
        LatLong : 
        {
            lat : 30.048023 ,
            lng : 31.261643
        },

    },
    
    {
        name : 'Bab El Nil',
        LatLong : 
        {
            lat : 30.071877 ,
            lng : 31.227714
        },

    },
    
    {
        name : 'Moon Deck',
        LatLong : 
        {
            lat : 30.045860,
            lng : 31.228294
        },

    },

    {
        name : 'Al Saraya',
        LatLong : 
        {
            lat : 30.050369,
            lng : 31.227998
        },

    },
];

function initmap(){
    map = new google.maps.Map(document.getElementById('map'),{
    center : {lat: 30.044420 , lng: 31.235712 },
    zoom : 13
    });

var i=0;
while(i < musical_places.length ){
    
    var position = musical_places[i].LatLong;
    var name = musical_places[i].name;
    
    var marker = new google.maps.Marker({        
        position : position,
        name : name,
        map : map,
        animation : google.maps.Animation.DROP,
    });
    
    //appViewModel.musical_places()[i].marker = marker;
    var infowindow = new google.maps.InfoWindow();
    var largeinfowindow = new google.maps.InfoWindow();
    
    marker.addListener('click' , function(){
        populate_infowindow(this , largeinfowindow)
    });
    
    markers.push(marker);
    marker.setMap(map);
    i++;
}
}

function populate_infowindow (marker , infowindow){
    
    if (infowindow.marker != marker){
        infowindow.marker=marker;
        infowindow.setContent('<div>' + marker.name + '</div>');
        infowindow.open( map , marker);
        
        infowindow.addListener('closeclick' , function(){
             infowindow.setMarker(null);
             marker.setAnimation(google.maps.Animation.DROP);
         });
    }
}

var AppViewModel = function (){
    self.clickHandler = function (musical_places) {
        google.maps.event.trigger(musical_places.marker, 'click');
    };
}

//var appViewModel = new AppViewModel();

// Apply the binding
self.ko.applyBindings(new AppViewModel());

















