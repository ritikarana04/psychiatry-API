const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost:3306',
  user: 'root',
  password: 'Vishal@0522',
  database: 'psychiatry',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// API to register a new patient
app.post('/api/patients', (req, res) => {
  const { name, address, email, phone, password, photo, hospital_id } = req.body;

  // Basic validation
  if (!name || !address || !email || !password || !hospital_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Additional validation (you can add more based on requirements)
  if (address.length < 10 || !isValidEmail(email) || !isValidPhone(phone) || !isValidPassword(password)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const insertPatientQuery = 'INSERT INTO patients SET ?';
  const patientData = {
    name,
    address,
    email,
    phone,
    password,
    photo,
    hospital_id,
  };

  db.query(insertPatientQuery, patientData, (err, result) => {
    if (err) {
      console.error('Error inserting patient:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).json({ message: 'Patient registered successfully', patientId: result.insertId });
  });
});

// API to fetch psychiatrists and patient details for a hospital
app.get('/api/psychiatrists/:hospitalId', (req, res) => {
  const hospitalId = req.params.hospitalId;

  // Fetch psychiatrists and patient details query
  const fetchPsychiatristsQuery = `
    SELECT
      psychiatrists.id AS psychiatristId,
      psychiatrists.name AS psychiatristName,
      COUNT(patients.id) AS patientsCount
    FROM
      psychiatrists
    LEFT JOIN
      patients ON psychiatrists.id = patients.psychiatrist_id
    WHERE
      psychiatrists.hospital_id = ?
    GROUP BY
      psychiatrists.id, psychiatrists.name
  `;

  db.query(fetchPsychiatristsQuery, [hospitalId], (err, results) => {
    if (err) {
      console.error('Error fetching psychiatrists:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Fetch hospital name and total psychiatrist count
    const fetchHospitalInfoQuery = 'SELECT name FROM hospitals WHERE id = ?';
    db.query(fetchHospitalInfoQuery, [hospitalId], (err, hospitalResult) => {
      if (err) {
        console.error('Error fetching hospital info:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const hospitalName = hospitalResult[0].name;
      const totalPsychiatristsCount = results.length;
      let totalPatientsCount = 0;

      // Calculate total patients count
      for (const result of results) {
        totalPatientsCount += result.patientsCount;
      }

      // Prepare API response
      const apiResponse = {
        hospitalName,
        totalPsychiatristsCount,
        totalPatientsCount,
        psychiatristDetails: results.map((result) => ({
          psychiatristId: result.psychiatristId,
          psychiatristName: result.psychiatristName,
          patientsCount: result.patientsCount,
        })),
      };

      res.status(200).json(apiResponse);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Utility functions for validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+?[0-9]{10,}$/;
    return phoneRegex.test(phone);
}

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
  return passwordRegex.test(password);
}

