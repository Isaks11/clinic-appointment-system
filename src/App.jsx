import { useState, useEffect } from 'react';

function App() {
  // State variables for booking form
  const [patientName, setPatientName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [message, setMessage] = useState('');

  // State variables for Admin View
  const [isAdminView, setIsAdminView] = useState(false);
  const [appointmentsList, setAppointmentsList] = useState([]);

  // Function to handle booking submission to backend database
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientName || !doctor || !appointmentDate) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const response = await fetch('https://clinic-appointment-system-q4p7.onrender.com/api/appointments', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientName, doctor, appointmentDate })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Success! Saved to database ID: ${data.id}`);
        setPatientName('');
        setDoctor('');
        setAppointmentDate('');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      setMessage('Failed to connect to server.');
    }
  };

  // Function to fetch all appointments for Admin View
  const fetchAppointments = async () => {
    try {
      const response = await fetch('https://clinic-appointment-system-q4p7.onrender.com/api/appointments');
      const data = await response.json();
      if (response.ok) {
        setAppointmentsList(data.appointments);
      }
    } catch (err) {
      console.error('Failed to fetch appointments');
    }
  };

  // Trigger fetch when switching to admin view
  useEffect(() => {
    if (isAdminView) {
      fetchAppointments();
    }
  }, [isAdminView]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.navBar}>
          <h2 style={styles.heading}>NextGen Clinic App</h2>
          <button 
            onClick={() => setIsAdminView(!isAdminView)} 
            style={styles.toggleBtn}
          >
            {isAdminView ? 'Patient View' : 'Admin View'}
          </button>
        </div>

        {!isAdminView ? (
          /* --- PATIENT BOOKING FORM --- */
          <div>
            <h3 style={{color: '#0f766e', marginBottom: '15px'}}>Book Appointment</h3>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name:</label>
                <input 
                  type="text" 
                  value={patientName} 
                  onChange={(e) => setPatientName(e.target.value)} 
                  placeholder="Enter your full name"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Choose Doctor:</label>
                <select 
                  value={doctor} 
                  onChange={(e) => setDoctor(e.target.value)}
                  style={styles.input}
                >
                  <option value="">--Select a Doctor--</option>
                  <option value="Dr. Smith (General Medicine)">Dr. Smith (General Medicine)</option>
                  <option value="Dr. Peter (Pediatrics)">Dr. Peter (Pediatrics)</option>
                  <option value="Dr. Kate (Radiology)">Dr. Kate (Radiology)</option>
                  <option value="Dr. Johnson (Pediatrics)">Dr. Johnson (Pediatrics)</option>
                  <option value="Dr. Jones (Cardiology)">Dr. Jones (Cardiology)</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Appointment Date:</label>
                <input 
                  type="date" 
                  value={appointmentDate} 
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  style={styles.input}
                />
              </div>

              <button type="submit" style={styles.button}>Book Appointment</button>
            </form>
            {message && <p style={styles.success}>{message}</p>}
          </div>
        ) : (
          /* --- ADMIN RECEPTIONIST VIEW --- */
          <div>
            <h3 style={{color: '#0f766e', marginBottom: '5px'}}>Receptionist Dashboard</h3>
            <p style={{fontSize: '13px', color: '#64748b', marginBottom: '15px'}}>All booked appointments retrieved from database:</p>
            {appointmentsList.length === 0 ? (
              <p style={{textAlign: 'center', color: '#64748b', padding: '20px 0'}}>No appointments booked yet.</p>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Patient</th>
                    <th style={styles.th}>Doctor</th>
                    <th style={styles.th}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsList.map((item) => (
                    <tr key={item.id}>
                      <td style={styles.td}>{item.patientName}</td>
                      <td style={styles.td}>{item.doctor}</td>
                      <td style={styles.td}>{item.appointmentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// Lively, Vibrant, and Engaging Healthcare UI Styles
const styles = {
  page: { 
    fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
    background: 'linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)', 
    padding: '40px 20px', 
    minHeight: '100vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  container: { 
    maxWidth: '500px', 
    width: '100%', 
    background: '#ffffff', 
    padding: '40px', 
    borderRadius: '16px', 
    boxShadow: '0 15px 35px rgba(14, 116, 144, 0.1)',
    border: '1px solid #e0f2fe'
  },
  navBar: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: '25px',
    borderBottom: '2px solid #f1f5f9',
    paddingBottom: '15px'
  },
  heading: { 
    color: '#0f766e', 
    margin: 0, 
    fontSize: '24px',
    fontWeight: '800',
    letterSpacing: '-0.5px'
  },
  toggleBtn: { 
    background: '#ccfbf1', 
    color: '#115e59', 
    border: 'none', 
    padding: '8px 16px', 
    borderRadius: '8px', 
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '13px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  },
  formGroup: { 
    marginBottom: '20px' 
  },
  label: { 
    display: 'block', 
    marginBottom: '8px', 
    fontWeight: '700', 
    color: '#334155',
    fontSize: '14px'
  },
  input: { 
    width: '100%', 
    padding: '12px 15px', 
    border: '2px solid #e2e8f0', 
    borderRadius: '10px', 
    boxSizing: 'border-box',
    fontSize: '14px',
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    outline: 'none'
  },
  button: { 
    width: '100%', 
    backgroundColor: '#0d9488', 
    color: 'white', 
    padding: '14px', 
    border: 'none', 
    borderRadius: '10px', 
    fontSize: '16px', 
    fontWeight: '700',
    cursor: 'pointer', 
    marginTop: '10px',
    boxShadow: '0 6px 20px rgba(13, 148, 136, 0.3)'
  },
  success: { 
    marginTop: '20px', 
    padding: '14px',
    backgroundColor: '#ccfbf1',
    color: '#115e59', 
    textAlign: 'center', 
    fontWeight: '700',
    borderRadius: '10px',
    fontSize: '14px',
    border: '1px solid #99f6e4'
  },
  table: { 
    width: '100%', 
    borderCollapse: 'collapse', 
    marginTop: '15px' 
  },
  th: { 
    backgroundColor: '#f0fdf4',
    borderBottom: '2px solid #ccfbf1', 
    padding: '12px 10px', 
    textAlign: 'left', 
    fontSize: '13px', 
    color: '#0f766e',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  td: { 
    borderBottom: '1px solid #f1f5f9', 
    padding: '12px 10px', 
    fontSize: '14px', 
    color: '#334155' 
  }
};

export default App;