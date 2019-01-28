  // Initialize Firebase
  var config = {
      apiKey: "###########",
      authDomain: "###########",
      databaseURL: "###########",
      projectId: "###########",
      storageBucket: "###########",
      messagingSenderId: "###########"
  };
  firebase.initializeApp(config);

  $(document).ready(function () {

      $(".content-box").hide();
      $(".contorol").click(function () {
          $(this).next(".content-box").slideToggle().siblings(".content-box").slideUp();
          if ($("i").hasClass("fa-remove")) {
              $(this).find("i").toggleClass("fa-remove");

          }

      });

  });


  var engineDestination = "";
  var arrivalFrequency = "";
  var nextArrival = "";
  var minutesAway = "";
  var trainTime = "";
  var elengineDestination = $("#train-destination");
  var elTrainTime = $("#train-time").mask("00:00");
  var elTimeFreq = $("#time-freq").mask("00");
  var elTrain = $("#train-name");

  // Assign the reference to the database to a variable named 'database'
  var database = firebase.database();

  database.ref("/trains").on("child_added", function (snapshot) {

      //  create local variables to store the data from firebase
      var trainDiff = 0;
      var trainRemainder = 0;
      var minutesTillArrival = "";
      var nextTrainTime = "";
      var frequency = snapshot.val().frequency;

      // compute the difference in time from 'now' and the first train using UNIX timestamp, store in var and convert to minutes
      trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");

      // get the remainder of time by using 'moderator' with the frequency & time difference, store in var
      trainRemainder = trainDiff % frequency;

      // subtract the remainder from the frequency, store in var
      minutesTillArrival = frequency - trainRemainder;

      // add minutesTillArrival to now, to find next train & convert to standard time format
      nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");

      // append to our table of trains, inside tbody, with a new row of the train data
      $("#table-data").prepend(
          "<tr><td>" + snapshot.val().name + "</td>" +
          "<td>" + snapshot.val().destination + "</td>" +
          "<td>" + frequency + "</td>" +
          "<td>" + minutesTillArrival + "</td>" +
          "<td>" + nextTrainTime + "  " + "<a><span class='glyphicon glyphicon-remove icon-hidden' aria-hidden='true'></span></a>" + "</td></tr>"

      );

      $("span").hide();

      // Hover view of delete button
      $("tr").hover(
          function () {
              $(this).find("span").show();
          },
          function () {
              $(this).find("span").hide();
          });

      // STARTED BONUS TO REMOVE ITEMS ** not finished **
      $("#table-data").on("click", "tr span", function () {
          console.log(this);
          var trainRef = database.ref("/trains/");
          console.log(trainRef);

      });

  });

  // function to call the button event, and store the values in the input form
  var storeInputs = function (event) {
      // prevent from from reseting
      event.preventDefault();

      // get & store input values
      trainName = elTrain.val().trim();
      engineDestination = elengineDestination.val().trim();
      trainTime = moment(elTrainTime.val().trim(), "HH:mm").subtract(1, "years").format("X");
      arrivalFrequency = elTimeFreq.val().trim();

      // add to firebase databse
      database.ref("/trains").push({
          name: trainName,
          destination: engineDestination,
          time: trainTime,
          frequency: arrivalFrequency,
          nextArrival: nextArrival,
          minutesAway: minutesAway,
          date_added: firebase.database.ServerValue.TIMESTAMP
      });

      //  alert that train was added
      alert("All Aboard!");

      //  empty form once submitted
      elTrain.val("");
      elengineDestination.val("");
      elTrainTime.val("");
      elTimeFreq.val("");
  };

  // Calls storeInputs function if submit button clicked
  $("#btn-add").on("click", function (event) {
      // form validation - if empty - alert
      if (elTrain.val().length === 0 || elengineDestination.val().length === 0 || elTrainTime.val().length === 0 || elTimeFreq === 0) {
          alert("Please Fill All Required Fields");
      } else {
          // if form is filled out, run function
          storeInputs(event);
      }
  });

  // Calls storeInputs function if enter key is clicked
  $('form').on("keypress", function (event) {
      if (event.which === 13) {
          // form validation - if empty - alert
          if (elTrain.val().length === 0 || elengineDestination.val().length === 0 || elTrainTime.val().length === 0 || elTimeFreq === 0) {
              alert("Please Fill All Required Fields");
          } else {
              // if form is filled out, run function
              storeInputs(event);
          }
      }
      // prepends a value space if number is < 10
      if (minutes < 10) {
          minutes = "0" + minutes


      };
      if (hour == 0 || hour > 12) {
          hour = ((hour + 11) % 12 + 1); //allows to display ante meridiem time
      }
      $('#dtBasicExample').DataTable();
      $('.dataTables_length').addClass('bs-select');


  });
