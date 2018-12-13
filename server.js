const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const connectionString = 'postgres://tkejrpzmbqqtup:0437ff001d749c16e4b1aafa5ae4076b18ee3af2120984b4aae0ca69ef1f4f34@ec2-184-72-239-186.compute-1.amazonaws.com:5432/ddkr7qdje3b82j?ssl=true';

const app = express();
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  const db = req.app.get('db')
  db.getAllInjuries().then(injuries => {
    res.send(injuries); 
  })
});

app.get('/incidents', (req, res) => {
  const db = req.app.get('db');
  const state = req.query.state;
  if (state) {
    db.getIncidentsByState({uSstate: state}).then(incidents => {
      res.send(incidents);
    })
  }
  else {
    db.getAllIncidents().then(incidents => {
      res.send(incidents);
    })
  }
 
});

app.post('/incidents', (req, res) => {
  const incident = req.body;
  const db = req.app.get('db');
  db.createIncident(incident).then(result => {
    res.send(result[0]);
  })
  .catch(err => {
    res.status(400).send(err.message)
  })
  console.log(incident)
  
});

massive(connectionString).then(connection => {
  app.set('db', connection);
  app.listen(port, () => {
    console.log('Started server on port', port);
  });
})

