// Handle tabs on main page
let tabHeader = document.getElementsByClassName("tab-header")[0];
let tabBody = document.getElementsByClassName("tab-body")[0];
let tabsPane = document.getElementsByClassName("tab-menu__item-container");
 
for(let i=0; i<tabsPane.length; i++) {
  tabsPane[i].addEventListener("click",function(){
    tabHeader.getElementsByClassName("active")[0].classList.remove("active");
    tabsPane[i].classList.add("active");
    tabBody.getElementsByClassName("active")[0].classList.remove("active");
    tabBody.getElementsByClassName("tab-body__content")[i].classList.add("active");
  });
}

// Handle submit events
$("#add_programmer").submit(function(event){
  alert("Data Inserted Successfully!");
})

$("#update_programmer").submit(function(event){
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {}

  $.map(unindexed_array, function(n, i){
      data[n['name']] = n['value']
  })

  var request = {
    "url" : `http://localhost:3000/admin/api/list/${data.id}`,
    "method" : "PUT",
    "data" : data
  }

  $.ajax(request).done(function(response){
      alert("Data Updated Successfully!");
  })
})

if(window.location.pathname == "/admin/list"){
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function(){
    var id = $(this).attr("data-id")

    var request = {
      "url" : `http://localhost:3000/admin/api/list/${id}`,
      "method" : "DELETE"
    }

    if(confirm("Do you really want to delete this record?")){
      $.ajax(request).done(function(response){
        alert("Data Deleted Successfully!");
          location.reload();
      })
    }
  })
}


// Create and Delete TASK
$("#create_task").submit(function(event){
  event.preventDefault();

  var unindexed_array = $(this).serializeArray();
  var data = {}

  $.map(unindexed_array, function(n, i){
      data[n['name']] = n['value']
  })

  var request = {
    "url" : `http://localhost:3000/admin/manage/api/tasks/create/${data.id}`,
    "method" : "PUT",
    "data" : data
  }

  $.ajax(request).done(function(response){
      alert("Tasks was created Successfully!");
  })
})

if(window.location.pathname == "/admin/manage/api/tasks/${id}"){
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function(){
    var id = $(this).attr("data-id")

    var request = {
      "url" : `http://localhost:3000/admin/manage/api/tasks/create/${id}`,
      "method" : "DELETE"
    }

    if(confirm("Do you really want to delete this record?")){
      $.ajax(request).done(function(response){
        alert("Data Deleted Successfully!");
          location.reload();
      })
    }
  })
}