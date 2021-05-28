const Programmerdb = require('../model/model');

exports.get_database_info = (req, res) => {
  const query = Programmerdb.find(); // `query` is an instance of `Query`
  query.setOptions({ lean : true });
  query.collection(Programmerdb.collection);

  query.where('programmingLanguage', 'C++').countDocuments(function(err, count) {
    if (err) return;
    console.log(`Tere are ${count} programmers of C++ language.`);
    res.send(`Tere are ${count} programmers of C++ language.`);
  });
}

exports.find_hired_programmers = (req, res) => {
  const id = req.query.id;
  const fullName = req.query.fullName;
  const email = req.query.email;
  const mobile = req.query.mobile;
  const location = req.query.location;
  const programmingLanguage = req.query.programmingLanguage;
  const experience = req.query.experience;
  // const hired = true;
  const query = Programmerdb.find(); // `query` is an instance of `Query`
  query.setOptions({ lean : true });
  query.collection(Programmerdb.collection);

  query.where('hired', 'true')
    .then(data => {
      if(!data) {
        res.status(404).send({ message : `Not found`})
      } else {
        console.log(data)
        res.send(data)
      }
      })
    .catch(err => {
      res.status(500).send({ message: `Error during searching`})
    })
   
  

  // Programmerdb.find({
  //     // {id: id}, 
  //     // {fullName: fullName}, 
  //     // {email: email}, 
  //     // {mobile: mobile}, 
  //     // {location: location}, 
  //     // {programmingLanguage: programmingLanguage}, 
  //     // {experience: experience},
  //     hired: true
  // })
  //   .then(data => {
  //     if(!data) {
  //       res.status(404).send({ message : `Not found`})
  //     } else {
  //       console.log(data)
  //       res.send(data)
  //     }
  //     })
  //   .catch(err => {
  //     res.status(500).send({ message: `Error during searching`})
  //   })
}

exports.search_by_values = (req, res) => {
  const id = req.query.id;
  const fullName = req.query.fullName;
  const email = req.query.email;
  const mobile = req.query.mobile;
  const location = req.query.location;
  const programmingLanguage = req.query.programmingLanguage;
  const experience = req.query.experience;
  const hired = req.query.hired;

  Programmerdb.find({
    $or: [
      {id: id}, 
      {fullName: fullName}, 
      {email: email}, 
      {mobile: mobile}, 
      {location: location}, 
      {programmingLanguage: programmingLanguage}, 
      {experience: experience},
      {hired: hired}
    ]
  })
    .then(data => {
      if(!data) {
        res.status(404).send({ message : `Not found programmer with search parameters - id: ${id}, fullName: ${fullName}, email: ${email}, mobile: ${mobile}, location: ${location}, programmingLanguage: ${programmingLanguage}, experience: ${experience}, hired: ${hired}`})
      } else {
        console.log(data)
        res.send(data)
      }
      })
    .catch(err => {
      res.status(500).send({ message: `Error during searching programmer with search parameters - id: ${id}, fullName: ${fullName}, email: ${email}, mobile: ${mobile}, location: ${location}, programmingLanguage: ${programmingLanguage}, experience: ${experience}, hired: ${hired}`})
    })
}

exports.create = (req, res) => {
  // validate request
  if(!req.body){
    res.status(400).send({ message : "Content is required."});
    return;
  }
  // new programmer
  const programmer = new Programmerdb({
    fullName : req.body.fullName,
    email : req.body.email,
    mobile: req.body.mobile,
    location: req.body.location,
    programmingLanguage: req.body.programmingLanguage,
    experience: req.body.experience,
    hired: false
  })

  // save programmer in the database
  programmer
    .save(programmer)
    .then(data => {
      //res.send(data)
      res.redirect('/admin/list');
    })
    .catch(err => {
      res.status(500).send({
        message : err.message || "Some error occurred while creating a create operation"
      });
    });
}

// find and return all programmers/ a single programmer
exports.find = (req, res) => {
  if(req.query.id) {
    const id = req.query.id;

    Programmerdb.findById(id)
      .then(data => {
        if(!data) {
          res.status(404).send({ message : "Not found programmer with id: "+ id})
        } else {
          res.send(data)
        }
        })
      .catch(err => {
        res.status(500).send({ message: "Error during searching programmer with id: "+ id})
      })
  } else {
      Programmerdb.find()
        .then(programmer => {
          res.send(programmer)
        })
        .catch(err => {
          res.status(500).send({ message : err.message || "Error Occurred while retriving programmer information" })
        })
  }
}

// Update a new idetified Programmer by id
exports.update = (req, res) => {
  if(!req.body) {
    return res
      .status(400)
      .send({ message : "Data to update can not be empty"})
  }
  const id = req.params.id;
  Programmerdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
      if(!data) {
        res.status(404).send({ message: `Cannot Update Programmer with ${id}.`})
      } else {
          res.send(data)
        }
    })
    .catch(err => {
      res.status(500).send({ message: "Error during updating process"})
    })
}

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Programmerdb.findByIdAndDelete(id)
    .then(data => {
      if(!data) {
        res.status(404).send({ message : `Cannot Delete with id ${id}.`})
      } else {
        res.send({
          message : "Programmer was deleted successfully!"
        })
        // res.redirect('/admin/list');
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Programmer with id: " + id
      });
    });
}

// hire programmer by id
exports.hire = (req, res) => {
  const id = req.params.id;
  Programmerdb.findByIdAndUpdate(id, { $set: {hired: true} }, {new: true}, function(err, data) {
    res.redirect('/admin/hire-dismiss/list');
  })
}

// dismiss programmer by id on Hire-Dismiss Page
exports.dismiss = (req, res) => {
  const id = req.params.id;
  Programmerdb.findByIdAndUpdate(id, { $set: {hired: false} }, {new: true}, function(err, data) {
    res.redirect('/admin/hire-dismiss/list');
  })
}

// show tasks of programmer with id
exports.find_tasks_for_id = (req, res) => {
  const id = req.params.id;

  Programmerdb.findById(id)
    .then(data => {
      if(!data) {
        res.status(404).send({ message : "Not found programmer with id: "+ id})
      } else {
        res.send(data)
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error during searching programmer with id: "+ id})
    })
}

exports.create_task = (req, res) => {
  console.log("CONTROLLER.CREATE_TASK <<<<<<<<<")
  const id = req.query.id;
  console.log(id);

  const taskTitle = req.body.task.title;
  const taskDescription = req.body.task.description;
  const taskDeadline = req.body.task.deadline;

  Programmerdb.findByIdAndUpdate(
    id, req.body,
    {
      $push: {
        tasks: {
          title: {taskTitle},
          description: {taskDescription},
          deadline: {taskDeadline}
        }
      }
    }
  )
}
