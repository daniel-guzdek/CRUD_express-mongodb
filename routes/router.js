const express = require('express');
const router = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');
const login = 'admin';
const password = '123';

// router.all('*', (req, res, next) => {
//   if(!req.session.admin) {
//     res.redirect('/login');

//     return;
//   }

//   next();
// })

router.get('/', services.main_page);
// router.get('/login', services.admin_login);
router.get('/admin', services.admin_panel);
router.get('/admin/database-info', services.database_info);


router.get('/admin/manage', services.manage_programmers);
router.get('/admin/manage/list', services.show_hired_programmers_list);


router.get('/admin/search', services.search_programmer);
router.get('/admin/search/list', services.show_searched_list);

router.get('/admin/add-programmer', services.add_programmer);
router.get('/admin/update-programmer', services.update_programmer);
router.get('/admin/list', services.show_list);

router.get('/admin/hire-dismiss', services.hire_dismiss_main);
router.get('/admin/hire-dismiss/list', services.show_list_to_hire_or_dismiss);
router.get('/admin/hire-dismiss/list/:id', services.show_searched_list_to_hire_or_dismiss);

// API
router.post('/', (req, res) => {
  if(req.body.login === login && req.body.password === password) {
    // req.session.admin = 1;
    res.redirect('/admin');
  } else {
    // res.render('pages/main', { logErrorMessage: "Incorrect login or password" })
    // res.redirect('/')
  }
  // console.log(req.body)
})

// get values for ,,Database info" section
router.get('/admin/database/api/info', controller.get_database_info);

// MANAGE
router.get('/admin/manage/api/list', controller.find_hired_programmers);
router.get('/admin/manage/tasks/:id', services.show_tasks);
router.put('/admin/manage/api/tasks/create', controller.create_task); //to jest jakby zwykłe ,,update"
router.get('/admin/manage/tasks/create/:id', services.show_task_form);

// HIRE / DISMISS
router.get('/admin/hire-dismiss/api/list', controller.search_by_values);
router.get('/admin/hire/api/list/:id', controller.hire);
router.get('/admin/dismiss/api/list/:id', controller.dismiss);

// SEARCH
router.get('/admin/search/api/list', controller.search_by_values);

// Add, update, delete || LIST
router.post('/admin/api/list', controller.create);
router.get('/admin/api/list', controller.find);
router.put('/admin/api/list/:id', controller.update);
router.delete('/admin/api/list/:id', controller.delete);

module.exports = router;