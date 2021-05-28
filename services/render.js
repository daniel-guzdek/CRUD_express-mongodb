exports.main_page = (req, res) => {
  res.render('pages/main', { viewTitle: "Programmers' Database" });
}

// exports.admin_login = (req, res) => {
//   res.render('pages/admin-login', { viewTitle: "Login as Admin" })
// } 

exports.admin_panel = (req, res) => {
  res.render('pages/admin-panel', { viewTitle: "Admin Panel" });
}

exports.database_info = (req, res) => {
  res.render('pages/database-info', { viewTitle: "Database - Information" });
}

exports.manage_programmers = (req, res) => {
  res.render('pages/manage-main', { viewTitle: "Manage Hired Programmers" });
}

exports.search_programmer = (req, res) => {
  res.render('pages/search', { viewTitle: "Search Programmers" });
}

exports.add_programmer = (req, res) => {
  res.render('pages/add-edit', { viewTitle: "Add Programmer" });
}

const axios = require('axios');

exports.show_list = (req, res) => {
  // get request to /admin/api/list
  axios.get('http://localhost:3000/admin/api/list')
    .then(function(response) {
      res.render('pages/list', { programmers : response.data, viewTitle: "Programmers' list" });
    })
    .catch(err => {
      res.send(err);
    }) 
}

exports.show_searched_list = (req, res) => {
  axios.get('http://localhost:3000/admin/search/api/list', { params : { id : req.query.id, fullName : req.query.fullName, email : req.query.email, mobile : req.query.mobile, location : req.query.location, programmingLanguage : req.query.programmingLanguage, experience : req.query.experience}})
    .then(function(response) {
      if(response.data.length === 0) {
        res.render('pages/search-error', { viewTitle: "There is no such Record in the Database matched to these query parameters" });
      } else {
        res.render('pages/list', { programmers : response.data, viewTitle: "Searched list of Programmers", resultInfo: `Found ${response.data.length} matched result(s)` });
      }
    })
    .catch(err => {
      res.send(err);
    }) 
}

exports.show_hired_programmers_list = (req, res) => {
  axios.get('http://localhost:3000/admin/manage/api/list', { params : { id : req.query.id, fullName : req.query.fullName, email : req.query.email, mobile : req.query.mobile, location : req.query.location, programmingLanguage : req.query.programmingLanguage, experience : req.query.experience, hired: req.query.hired}})
    .then(function(response) {
      if(response.data.length === 0) {
        res.render('pages/search-error', { viewTitle: "There is no such Record in the Database matched to these query parameters" });
      } else {
        res.render('pages/manage-list', { programmers : response.data, viewTitle: "List of Hired Programmers", resultInfo: `Found ${response.data.length} matched result(s)` });
      }
    })
    .catch(err => {
      res.send(err);
    }) 
}

exports.show_searched_list_to_hire_or_dismiss = (req, res) => {
  axios.get('http://localhost:3000/admin/hire-dismiss/api/list', { params : { id : req.query.id, fullName : req.query.fullName, email : req.query.email, mobile : req.query.mobile, location : req.query.location, programmingLanguage : req.query.programmingLanguage, experience : req.query.experience, hired: req.query.hired}})
    .then(function(response) {
      if(response.data.length === 0) {
        res.render('pages/search-error', { viewTitle: "There is no such Record in the Database matched to these query parameters" });
      } else {
        res.render('pages/hire-dismiss/hire-dismiss-list', { programmers : response.data, viewTitle: "Searched list of Programmers to hire or dismiss", resultInfo: `Found ${response.data.length} matched result(s)` });
      }
    })
    .catch(err => {
      res.send(err);
    }) 
}

exports.update_programmer = (req, res) => {
  axios.get('http://localhost:3000/admin/api/list', { params : { id : req.query.id }})
    .then(function(programmerdata) {
      // res.send(response.data)
      res.render("pages/update-programmer", { programmer : programmerdata.data, viewTitle: `Update Programmer with id: ` })
    })
    .catch(err => {
      res.send(err);
    })
}

exports.hire_dismiss_main = (req, res) => {
  res.render("pages/hire-dismiss/hire-dismiss-main", { viewTitle: "Hire / Dismiss Programmers"});
}

exports.hire_dismiss_list= (req, res) => {
  res.render("pages/hire-dismiss/hire-dismiss-list", { viewTitle: "List of Programmers to Hire / Dismiss"});
}

exports.show_list_to_hire_or_dismiss = (req, res) => {
  axios.get('http://localhost:3000/admin/hire-dismiss/api/list', { params : { id : req.query.id, fullName : req.query.fullName, email : req.query.email, mobile : req.query.mobile, location : req.query.location, programmingLanguage : req.query.programmingLanguage, experience : req.query.experience}})
    .then(function(response) {
      if(response.data.length === 0) {
        res.render('pages/search-error', { viewTitle: "There is no such Record in the Database matched to these query parameters" });
      } else {
        res.render('pages/hire-dismiss/hire-dismiss-list', { programmers : response.data, viewTitle: "List of All Programmers to Hire or Dismiss", resultInfo: `Found ${response.data.length} Programmers in Database matched this query` });
      }
    })
    .catch(err =>  {
      res.send(err);
    }) 
}

exports.show_tasks = (req, res) => {
  const id = req.params.id;
  // get request to /admin/manage/api/tasks/:id
  axios.get(`http://localhost:3000/admin/manage/api/tasks/${id}`)
    .then(function(response) {
      res.render('pages/manage-tasks-for-id', { data: response.data, viewTitle: `List of Tasks for Programmer with id: ${id}` });
    })
    .catch(err => {
      res.send(err);
    }) 
}

exports.show_task_form = (req, res) => {
  console.log("SHOW TASK FORM <<<<<<<<<<<<<<<<<<<<<<<<<<<")
  console.log(req.params.id);
  const id = req.params.id;
  // axios.get(`http://localhost:3000/admin/manage/api/tasks/create/${id}`)
  //   .then(function(programmerdata) {
      res.render("pages/manage-create-task-for-id", { viewTitle: `Add Task for Programmer with id: ${id}` })
    // })
    // .catch(err => {
    //   res.send(err);
    // })
}

// exports.update_programmer = (req, res) => {
//   axios.get('http://localhost:3000/admin/api/list', { params : { id : req.query.id }})
//     .then(function(programmerdata) {
//       // res.send(response.data)
//       res.render("pages/update-programmer", { programmer : programmerdata.data, viewTitle: `Update Programmer with id: ` })
//     })
//     .catch(err => {
//       res.send(err);
//     })
// }