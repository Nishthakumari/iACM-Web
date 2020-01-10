console.log('njhdkbjadfhbsd');
 var tblProjects = document.getElementById('tbl_projects_list');
 var rootRef = firebase.database().ref();
 console.log(rootRef);
 var databaseRef = firebase.database().ref("projects");
 var rowIndex = 1;

 databaseRef.once('value', function(snapshot) {
   snapshot.forEach(function(childSnapshot) {
  var childKey = childSnapshot.key;
  var childData = childSnapshot.val();
  var row = tblProjects.insertRow(rowIndex);
  var cellId = row.insertCell(0);
  var cellName = row.insertCell(1);

  cellId.appendChild(document.createTextNode(childKey));
  cellName.appendChild(document.createTextNode(childData.project_name));

  rowIndex = rowIndex + 1;
   });
 });

 function save_project(){
  var project_name = document.getElementById('project_name').value;

  var pid = firebase.database().ref().child('projects').push().key;

  var data = {
   project_id: pid,
   project_name: project_name
  }

  var updates = {};
  updates['/projects/' + pid] = data;
  firebase.database().ref().update(updates);

  alert('The project is added successfully!');
  reload_page();
 }

 function update_project(){
  var project_name = document.getElementById('project_name').value;
  var project_id = document.getElementById('project_id').value;

  var data = {
   project_id: project_id,
   project_name: project_name
  }

  var updates = {};
  updates['/projects/' + project_id] = data;
  firebase.database().ref().update(updates);

  alert('The project is updated successfully!');

  reload_page();
 }




 function delete_project(){
  var project_id = document.getElementById('project_id').value;

  firebase.database().ref().child('/projects/' + project_id).remove();
  alert('The project is deleted successfully!');
  reload_page();
 }

 function reload_page(){
  window.location.reload();
 }
