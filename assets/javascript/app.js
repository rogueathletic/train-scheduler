
  var config = {
    apiKey: "AIzaSyDuyThKpM3Rx2-4pGLlnVv4fSRCZaMOdb4",
    authDomain: "train-co.firebaseapp.com",
    databaseURL: "https://train-co.firebaseio.com",
    projectId: "train-co",
    storageBucket: "train-co.appspot.com",
    messagingSenderId: "1093361277513"
  };
firebase.initializeApp(config);

$(document).ready(function () {
 
	$(".content-box").hide();
	$(".contorol").click(function() {
		    $( this ).next( ".content-box" ).slideToggle().siblings( ".content-box" ).slideUp();
		    if ($( "i" ).hasClass( "fa-remove" )) {
			$( this ).find( "i" ).toggleClass( "fa-remove"  );         
        }
     });

});
    var engineDestination   = "";
    var arrivalFrequency    = "";
    var nextArrival         = "";
    var minutesAway         = "";
    var trainTime           = "";
    var elengineDestination = $( "#train-destination" );
    var elTrainTime         = $( "#train-time" ).mask( "00:00" );
    var elTimeFreq          = $(  "#time-freq" ).mask( "00" );
    var elTrain             = $( "#train-name" );

    var database = firebase.database();
database.ref("/trains").on("child_added", function (snapshot) {
    
    var trainDiff = 0;
    var trainRemainder = 0;
    var minutesTillArrival = "";
    var nextTrainTime = "";
    var frequency = snapshot.val().frequency;

    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");

    trainRemainder = trainDiff % frequency;

    minutesTillArrival = frequency - trainRemainder;

    nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");

    $("#table-data").append(
        "<tr class='theRow'><td>"  + snapshot.val().name + "</td>" +
        "<td class='dest'>"        + snapshot.val().destination + "</td>" +
        "<td class='freq'>"        + frequency + "</td>" +
        "<td class='minTill'>"     + minutesTillArrival + "</td>" +
        "<td class='nextTrain'>"   + nextTrainTime + "  " + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true' id='exitX'></span></a>"    + "</td></tr>"
        
    );

    $( " .theRow" ).click( function(event){
    $( this ).fadeOut().slow()
                 console.log()
           });

});

    var storeInputs = function (event) {
  
        event.preventDefault();

        trainName = elTrain.val().trim();
        engineDestination = elengineDestination.val().trim();
        trainTime = moment(elTrainTime.val().trim(), "HH:mm").subtract(1, "years").format("X");
        arrivalFrequency = elTimeFreq.val().trim();

    database.ref( "/trains" ).push({
        name: trainName,
        destination: engineDestination,
        time: trainTime,
        frequency: arrivalFrequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        date_added: firebase.database.ServerValue.TIMESTAMP
    });

        alert( "All Aboard!" );

        elTrain.val( "" );
        elengineDestination.val( "" );
        elTrainTime.val(  "" );
        elTimeFreq.val( "" );
};

$( "#btn-add" ).on( "click", function (event) {
    
    if ( elTrain.val().length === 0 || elengineDestination.val().length === 0 || elTrainTime.val().length === 0 || elTimeFreq === 0 ) {
        alert( "Please Fill All Required Fields" );
    }   else {
        
        storeInputs(event);
    }

});

$('form').on("keyup", function (event) {
    if (event.which === 13) {
       
    if (elTrain.val().length === 0 || elengineDestination.val().length === 0 || elTrainTime.val().length === 0 || elTimeFreq === 0) {
            alert("Please Fill All Required Fields");
  } else {
           
            storeInputs(event);
        }
    }
   
    if     ( minutes < 10 ) {
             minutes = "0" + minutes

    };
    if ( hour == 0 || hour > 12 ) {
        hour = (( hour + 11 ) % 12 + 1 ); 
    }
     $( '#dtBasicExample' ).DataTable();
     $( '.dataTables_length' ).addClass( 'bs-select' );
});


