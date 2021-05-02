
var firebaseConfig = {
    
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  //Ready
  var nameV, rollV , secV, genV;
  function Ready(){
      nameV = document.getElementById('namebox').value;
      rollV = document.getElementById('rollbox').value;
      secV = document.getElementById('secbox').value;
      genV = document.getElementById('genbox').value;
    }

    //upload photos
    //upload a file
    function uploadFile(){
        // Created a Storage Reference with root dir
            var storageRef = firebase.storage().ref('images');
        // Get the file from DOM
            var brochure = document.getElementById("photos").files[0];
        //dynamically set reference to the file name
            var thisRef = storageRef.child(brochure.name);
        //put request upload file to firebase storage
        thisRef.put(brochure)
    .then(snapshot => {
       return snapshot.ref.getDownloadURL();   // Will return a promise with the download link
    })
    
    .then(downloadURL => {
        alert('Uploaded');
        window.location = "./index.html";
      console.log(`Successfully uploaded file and got download link - ${downloadURL}`);
      paperurl = downloadURL;
      return downloadURL;
    })
    
    .catch(error => {
      // Use to signal error if something goes wrong.
      console.log(`Failed to upload file and get link - ${error}`);
    });
    
        }




    //insert


    document.getElementById('insert').onclick = function(){
        Ready();
        firebase.database().ref('Ad/'+rollV).set({
            name : nameV,
            rollno : rollV,
            section : secV,
            gender : genV

        });
    }

    //Select

    document.getElementById("select").onclick = function(){
        Ready();
        firebase.database().ref('Ad/'+rollV).on('value',function(snapshot){
            document.getElementById('namebox').value = snapshot.val().name;
            document.getElementById('secbox').value = snapshot.val().section;
            document.getElementById('genbox').value = snapshot.val().gender;


        });
    }

    //Update
    document.getElementById('update').onclick = function(){
        Ready();
        firebase.database().ref('Ad/'+rollV).update({
            name : nameV,
            section : secV,
            gender : genV
        });
    }


    //Delete
    document.getElementById('delete').onclick = function(){
        Ready();
        firebase.database().ref('Ad/'+rollV).remove();
    }

    //Delete the whole body

    document.getElementById('Purge').onclick = function(){
        Ready();
        firebase.database().ref('Ad/'+rollV).remove();
    }
//function to count node
function checkp(){
    var userIdad= firebase.auth().currentUser.uid;
    console.log(userIdad)
    firebase.database().ref('History/'+userIdad+'/').on('value',(snap)=>{
      var totalRecord =  snap.numChildren();
      console.log("Total Record ad: "+totalRecord);
    });
  }

    
