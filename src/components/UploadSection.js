// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "./UploadSection.css";


// // frame_numbers = [30, 40, 50];
// let exportedFrameNumbers = [];

// function UploadSection({ csvFile, onCsvUpload }) {
//   const [csvUploaded, setCsvUploaded] = useState(false);
//   const [logEntries, setLogEntries] = useState([]);
//   const [frameNumber, setFrameNumber] = useState("");
//   const [newClassId, setNewClassId] = useState("");
//   const [A, setA] = useState("");
//   const [B, setB] = useState("");
//   const [streamActive, setStreamActive] = useState(false);

//   useEffect(() => {
//     setCsvUploaded(!!csvFile);
//   }, [csvFile]);

//   const fetchFrameNumbers = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:5000/get-frame-numbers');
//       if (response.data?.end_frames) {
//         exportedFrameNumbers = response.data.end_frames; // Update exported variable
//         alert(`Received frames: ${exportedFrameNumbers.join(', ')}`);
//       }
//     } catch (error) {
//       console.error('Error fetching frames:', error);
//     }
//   };

//   const startMjpegStream = () => {
//     const mjpegContainer = document.querySelector('#mjpeg-container');
//     if (mjpegContainer) {
//       const timestamp = Date.now();
//       mjpegContainer.innerHTML = `
//         <img 
//           src="http://127.0.0.1:5000/mjpeg-stream?t=${timestamp}" 
//           alt="MJPEG Stream" 
//           data-mjpeg-stream="true"
//           style="max-width: 100%; height: auto; border: 1px solid #ccc;"
//           onload="this.style.opacity = '1'"
//           onerror="console.error('MJPEG stream error')"
//         />
//       `;
//       setStreamActive(true);
//     }
//   };

//   const handleCsvUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     if (file.type !== 'text/csv') {
//       alert('Please upload a valid CSV file.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('csv', file);

//     try {
//       // Send CSV to backend for processing
//       const response = await axios.post('http://127.0.0.1:5000/upload-csv', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         alert('CSV file processed successfully. Starting MJPEG stream...');
        
//         // Fetch frame numbers after successful upload
//         await fetchFrameNumbers();
        
//         // Start the MJPEG stream
//         startMjpegStream();
        
//         onCsvUpload(file, exportedFrameNumbers);
//         setCsvUploaded(true);
//       } else {
//         throw new Error('Server returned non-200 status');
//       }
//     } catch (error) {
//       console.error('CSV upload error:', error);
      
//       let errorMessage = 'Error uploading CSV file';
//       if (error.response) {
//         errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
//       } else {
//         errorMessage = error.message || errorMessage;
//       }
      
//       alert(errorMessage);
//     }
//   };

//   const handleLogChanges = () => {
//     if (!A.trim()) {
//       alert("Please enter the track id requiring modification before logging.");
//       return;
//     }
    
//     setLogEntries([...logEntries, { newClassId, A, B }]);
//     // setFrameNumber("");
//     setNewClassId("");
//     setA("");
//     setB("");
//   };

//   const handleClearTable = async () => {
//     if (logEntries.length === 0) {
//       alert("No data to send.");
//       return;
//     }
    
//     try {
//       const response = await fetch("http://localhost:5000/save-logs", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ logs: logEntries }),
//       });
      
//       const data = await response.json();
      
//       if (response.ok && data.success) {
//         // For MJPEG stream, we just need to refresh the image source
//         // The backend will automatically serve the updated frames
//         const mjpegImage = document.querySelector('img[data-mjpeg-stream]');
//         if (mjpegImage) {
//           // Force refresh by adding timestamp to prevent caching
//           const baseUrl = `http://127.0.0.1:5000/mjpeg-stream`;
//           const timestamp = Date.now();
//           mjpegImage.src = `${baseUrl}?t=${timestamp}`;
//         }
//         alert("Logs successfully saved to backend. Stream will update automatically.");
//         setLogEntries([]);
//       } else {
//         alert(data.message || "Failed to update ID and reprocess video.");
//       }
//     } catch (error) {
//       console.error("Error updating ID:", error);
//       alert(error.message || "Error updating ID.");
//     }
//   };

//   const refreshStream = () => {
//     const mjpegImage = document.querySelector('img[data-mjpeg-stream]');
//     if (mjpegImage) {
//       const timestamp = Date.now();
//       mjpegImage.src = `http://127.0.0.1:5000/mjpeg-stream?t=${timestamp}`;
//     }
//   };

//   const removeEntry = (indexToRemove) => {
//     setLogEntries(logEntries.filter((_, index) => index !== indexToRemove));
//   };

//   return (
//     <div className="upload-section">
//       {!csvUploaded ? (
//         <>
//           <label htmlFor="csv-upload" className="upload-btn">Upload CSV</label>
//           <input
//             id="csv-upload"
//             type="file"
//             accept=".csv"
//             style={{ display: "none" }}
//             onChange={handleCsvUpload}
//           />
//         </>
//       ) : (
//         <div className="stream-section">
//           {/* MJPEG Stream Container */}
//           {/* <div className="stream-container">
//             <h3>Live Stream</h3>
//             <div id="mjpeg-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
//               {streamActive ? null : <p>Loading stream...</p>}
//             </div>
//             <button onClick={refreshStream} style={{ marginBottom: '20px' }}>
//               Refresh Stream
//             </button>
//           </div> */}

//           {/* Log Section */}
//           <div className="log-section">
//             <h3 className="log-title">Change Log</h3>
//             <div className="input-container">
//               <div className="input-group">
//                 <input
//                   type="text"
//                   placeholder="A"
//                   value={A}
//                   onChange={(e) => setA(e.target.value)}
//                   className="styled-input"
//                 />
//                 <input
//                   type="text"
//                   placeholder="B"
//                   value={B}
//                   onChange={(e) => setB(e.target.value)}
//                   className="styled-input"
//                 />
//                 <input
//                   type="text"
//                   placeholder="New Class ID"
//                   value={newClassId}
//                   onChange={(e) => setNewClassId(e.target.value)}
//                   className="styled-input"
//                 />
//               </div>
//               <div className="button-group">
//                 <button onClick={handleLogChanges} className="btn-primary">
//                   Register Changes
//                 </button>
//                 <button onClick={handleClearTable} className="btn-secondary">
//                   Make Changes
//                 </button>
//               </div>
//             </div>

//             {logEntries.length > 0 && (
//               <div className="table-container">
//                 <div className="table-header">
//                   <span className="entry-count">{logEntries.length} {logEntries.length === 1 ? 'Entry' : 'Entries'}</span>
//                 </div>
//                 <div className="table-wrapper">
//                   <table className="log-table">
//                     <thead>
//                       <tr>
//                         <th>Track ID</th>
//                         <th>Frame ID</th>
//                         <th>New Class ID</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {logEntries.map((entry, index) => (
//                         <tr key={index} className="table-row">
//                           <td className="track-id">{entry.A}</td>
//                           <td className="frame-id">{entry.B}</td>
//                           <td className="class-id">
//                             <span className="class-badge">{entry.newClassId}</span>
//                           </td>
//                           <td className="actions">
//                             <button 
//                               onClick={() => removeEntry(index)}
//                               className="btn-remove"
//                               title="Remove entry"
//                             >
//                               ×
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}

//             {logEntries.length === 0 && csvUploaded && (
//               <div className="empty-state">
//                 <div className="empty-icon">📝</div>
//                 <p>No changes registered yet</p>
//                 <small>Fill in the fields above and click "Register Changes" to add entries</small>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div> 
//   );
// }

// // export { exportedFrameNumbers };
// export default UploadSection;  

import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./UploadSection.css";

// frame_numbers = [30, 40, 50];
let exportedFrameNumbers = [];

function UploadSection({ csvFile, onCsvUpload }) {
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [logEntries, setLogEntries] = useState([]);
  const [frameNumber, setFrameNumber] = useState("");
  const [newClassId, setNewClassId] = useState("");
  const [A, setA] = useState("");
  const [B, setB] = useState("");
  const [streamActive, setStreamActive] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', show: false });

  // Notification helper function
  const showNotification = (message, type = 'info', duration = 5000) => {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, duration);
  };

  useEffect(() => {
    setCsvUploaded(!!csvFile);
  }, [csvFile]);

  const fetchFrameNumbers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get-frame-numbers');
      if (response.data?.end_frames) {
        exportedFrameNumbers = response.data.end_frames; // Update exported variable
        // showNotification(`Received ${exportedFrameNumbers.length} frames successfully`, 'success');
      }
    } catch (error) {
      console.error('Error fetching frames:', error);
      showNotification(
        <>
          Error fetching frame data. Please ensure the backend server is running.{' '}
          <a 
            href="https://sparshhgupta.github.io/trackvisiongui/#/installation" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#007bff', textDecoration: 'underline' }}
          >
            Click here to know the installation steps.
          </a>
        </>,
        'error',
        10000
      );
    }
  };

  const startMjpegStream = () => {
    const mjpegContainer = document.querySelector('#mjpeg-container');
    if (mjpegContainer) {
      const timestamp = Date.now();
      mjpegContainer.innerHTML = `
        <img 
          src="http://127.0.0.1:5000/mjpeg-stream?t=${timestamp}" 
          alt="MJPEG Stream" 
          data-mjpeg-stream="true"
          style="max-width: 100%; height: auto; border: 1px solid #ccc;"
          onload="this.style.opacity = '1'"
          onerror="console.error('MJPEG stream error')"
        />
      `;
      setStreamActive(true);
    }
  };

  const handleCsvUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== 'text/csv') {
      showNotification('Please upload a valid CSV file.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('csv', file);

    try {
      // Send CSV to backend for processing
      const response = await axios.post('http://127.0.0.1:5000/upload-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // showNotification('CSV file processed successfully. Starting MJPEG stream...', 'success');
        
        // Fetch frame numbers after successful upload
        await fetchFrameNumbers();
        
        // Start the MJPEG stream
        startMjpegStream();
        
        onCsvUpload(file, exportedFrameNumbers);
        setCsvUploaded(true);
      } else {
        throw new Error('Server returned non-200 status');
      }
    } catch (error) {
      console.error('CSV upload error:', error);
      
      let errorMessage = 'Error uploading CSV file';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      // Check if it's a connection error to show installation link
      if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error') || !error.response) {
        showNotification(
          <>
            Error uploading CSV file. Please ensure the backend server is running.{' '}
            <a 
              href="https://sparshhgupta.github.io/trackvisiongui/#/installation" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#007bff', textDecoration: 'underline' }}
            >
              Click here to know the installation steps.
            </a>
          </>,
          'error',
          10000
        );
      } else {
        showNotification(errorMessage, 'error');
      }
    }
  };

  const handleLogChanges = () => {
    if (!A.trim()) {
      showNotification("Please enter the track id requiring modification before logging.", 'warning');
      return;
    }
    
    setLogEntries([...logEntries, { newClassId, A, B }]);
    // showNotification(`Entry added: Track ID ${A}${B ? ` (Frame: ${B})` : ''}`, 'success');
    // setFrameNumber("");
    setNewClassId("");
    setA("");
    setB("");
  };

  const handleClearTable = async () => {
    if (logEntries.length === 0) {
      showNotification("No data to send.", 'warning');
      return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/save-logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ logs: logEntries }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // For MJPEG stream, we just need to refresh the image source
        // The backend will automatically serve the updated frames
        const mjpegImage = document.querySelector('img[data-mjpeg-stream]');
        if (mjpegImage) {
          // Force refresh by adding timestamp to prevent caching
          const baseUrl = `http://127.0.0.1:5000/mjpeg-stream`;
          const timestamp = Date.now();
          mjpegImage.src = `${baseUrl}?t=${timestamp}`;
        }
        // showNotification(`Successfully saved ${logEntries.length} changes. Stream updated automatically.`, 'success');
        setLogEntries([]);
      } else {
        showNotification(data.message || "Failed to update ID and reprocess video.", 'error');
      }
    } catch (error) {
      console.error("Error updating ID:", error);
      
      // Check if it's a connection error
      if (error.message.includes('fetch') || error.name === 'TypeError') {
        showNotification(
          <>
            Error connecting to server. Please ensure the backend server is running.{' '}
            <a 
              href="https://sparshhgupta.github.io/trackvisiongui/#/installation" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#007bff', textDecoration: 'underline' }}
            >
              Click here to know the installation steps.
            </a>
          </>,
          'error',
          10000
        );
      } else {
        showNotification(error.message || "Error updating ID.", 'error');
      }
    }
  };

  const refreshStream = () => {
    const mjpegImage = document.querySelector('img[data-mjpeg-stream]');
    if (mjpegImage) {
      const timestamp = Date.now();
      mjpegImage.src = `http://127.0.0.1:5000/mjpeg-stream?t=${timestamp}`;
      showNotification('Stream refreshed successfully', 'info', 2000);
    } else {
      showNotification('No active stream to refresh', 'warning');
    }
  };

  const removeEntry = (indexToRemove) => {
    const removedEntry = logEntries[indexToRemove];
    setLogEntries(logEntries.filter((_, index) => index !== indexToRemove));
    // showNotification(`Removed entry: Track ID ${removedEntry.A}`, 'info', 3000);
  };

  return (
    <div className="upload-section">
      {/* Notification Component */}
      {notification.show && (
        <div 
          className={`notification notification-${notification.type}`}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: 1000,
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            animation: 'slideIn 0.3s ease-out',
            backgroundColor: 
              notification.type === 'success' ? '#10b981' :
              notification.type === 'error' ? '#ef4444' :
              notification.type === 'warning' ? '#f59e0b' :
              '#3b82f6'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              {typeof notification.message === 'string' ? notification.message : notification.message}
            </div>
            <button
              onClick={() => setNotification(prev => ({ ...prev, show: false }))}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                marginLeft: '10px',
                padding: '0',
                lineHeight: '1'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {!csvUploaded ? (
        <>
          <label htmlFor="csv-upload" className="upload-btn">Upload CSV</label>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleCsvUpload}
          />
        </>
      ) : (
        <div className="stream-section">
          {/* MJPEG Stream Container */}
          {/* <div className="stream-container">
            <h3>Live Stream</h3>
            <div id="mjpeg-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
              {streamActive ? null : <p>Loading stream...</p>}
            </div>
            <button onClick={refreshStream} style={{ marginBottom: '20px' }}>
              Refresh Stream
            </button>
          </div> */}

          {/* Log Section */}
          <div className="log-section">
            <h3 className="log-title">Change Log</h3>
            <div className="input-container">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="A"
                  value={A}
                  onChange={(e) => setA(e.target.value)}
                  className="styled-input"
                />
                <input
                  type="text"
                  placeholder="B"
                  value={B}
                  onChange={(e) => setB(e.target.value)}
                  className="styled-input"
                />
                <input
                  type="text"
                  placeholder="New Class ID"
                  value={newClassId}
                  onChange={(e) => setNewClassId(e.target.value)}
                  className="styled-input"
                />
              </div>
              <div className="button-group">
                <button onClick={handleLogChanges} className="btn-primary">
                  Register Changes
                </button>
                <button onClick={handleClearTable} className="btn-secondary">
                  Make Changes
                </button>
              </div>
            </div>

            {logEntries.length > 0 && (
              <div className="table-container">
                <div className="table-header">
                  <span className="entry-count">{logEntries.length} {logEntries.length === 1 ? 'Entry' : 'Entries'}</span>
                </div>
                <div className="table-wrapper">
                  <table className="log-table">
                    <thead>
                      <tr>
                        <th>Track ID</th>
                        <th>Frame ID</th>
                        <th>New Class ID</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logEntries.map((entry, index) => (
                        <tr key={index} className="table-row">
                          <td className="track-id">{entry.A}</td>
                          <td className="frame-id">{entry.B}</td>
                          <td className="class-id">
                            <span className="class-badge">{entry.newClassId}</span>
                          </td>
                          <td className="actions">
                            <button 
                              onClick={() => removeEntry(index)}
                              className="btn-remove"
                              title="Remove entry"
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {logEntries.length === 0 && csvUploaded && (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p>No changes registered yet</p>
                <small>Fill in the fields above and click "Register Changes" to add entries</small>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div> 
  );
}

// export { exportedFrameNumbers };
export default UploadSection;