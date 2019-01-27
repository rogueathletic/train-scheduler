
  var config = {
    apiKey: "AIzaSyDuyThKpM3Rx2-4pGLlnVv4fSRCZaMOdb4",
    authDomain: "train-co.firebaseapp.com",
    databaseURL: "https://train-co.firebaseio.com",
    projectId: "train-co",
    storageBucket: "train-co.appspot.com",
    messagingSenderId: "1093361277513"
  };
firebase.initializeApp(config);
var trains = [];
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
    trains.push(snapshot.val());
    render();



});

function render() {
    $('#table-data').empty();
    for (let i = 0; i < trains.length; i++) {
        const train = trains[i];
        var trainDiff = 0;
        var trainRemainder = 0;
        var frequency = train.frequency;

        trainDiff = moment().diff(moment.unix(train.time), "minutes");

        trainRemainder = trainDiff % frequency;

        train.minutesTillArrival = frequency - trainRemainder;

        train.nextTrainTime = moment().add(train.minutesTillArrival, "m").format("hh:mm A");
    }   
    trains.sort(function(a, b) {
        var trainATime = a.nextTrainTime.valueOf();
        var trainBTime = b.nextTrainTime.valueOf();
        if (trainATime < trainBTime) return -1;
        if (trainATime > trainBTime) return 1;
        return 0;
    });
    for (let i = 0; i < trains.length; i++) {
        const train = trains[i];
        $("#table-data").prepend(
            "<tr class='theRow'><td>"  + train.name + "</td>" +
            "<td class='dest'>"        + train.destination + "</td>" +
            "<td class='freq'>"        + train.frequency + "</td>" +
            "<td class='minTill'>"     + train.minutesTillArrival + "</td>" +
            "<td class='nextTrain'>"   + train.nextTrainTime + "  " + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true' id='exitX'></span></a>"    + "</td></tr>"
            
        );
    }
    $( " .theRow" ).click( function(event){
        $( this ).hide().slow()
        console.log()
    });
}

    var storeInputs = function (event) {
  
        event.preventDefault();

        trainName = elTrain.val().trim();
        engineDestination = elengineDestination.val().trim();
        trainTime = moment(elTrainTime.val().trim(), "HH:mm").subtract(1, "years").format("X");
        arrivalFrequency = elTimeFreq.val().trim();

        var trainObj = {
            name: trainName,
            destination: engineDestination,
            time: trainTime,
            frequency: arrivalFrequency,
            nextArrival: nextArrival,
            minutesAway: minutesAway,
            date_added: firebase.database.ServerValue.TIMESTAMP
        };
        trains.push(trainObj);
        database.ref( "/trains" ).push();

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
   


     $( '#dtBasicExample' ).DataTable();
     $( '.dataTables_length' ).addClass( 'bs-select' );
});

