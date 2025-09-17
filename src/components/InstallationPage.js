import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InstallationPage.css';

function InstallationPage() {
  const navigate = useNavigate();

  const handleDownload = (filename, url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadData = [
    {
      os: 'Windows',
      icon: '🪟',
      version: '11/10/8',
      filename: 'TrackVision-Setup-Windows.exe',
      size: '124 MB',
      url: 'https://drive.google.com/uc?export=download&id=17QnycGIJuwG9kJ0HWhODuq-xCAfGSjCq'
    },
    {
      os: 'macOS',
      icon: '🍎',
      version: 'Intel & Apple Silicon',
      filename: 'TrackVision-macOS-Universal.dmg',
      size: '98 MB',
      url: 'https://releases.trackvision.com/v1.2.0/TrackVision-macOS-Universal.dmg'
    },
    {
      os: 'Ubuntu/Debian',
      icon: '🐧',
      version: '20.04+',
      filename: 'TrackVision-Linux-amd64.deb',
      size: '87 MB',
      url: 'https://releases.trackvision.com/v1.2.0/TrackVision-Linux-amd64.deb'
    }
  ];

  return (
    <div className="installation-container">
      <header className="installation-header">
        <button 
          onClick={() => navigate('/')}
          className="back-button"
        >
          ← Back to Home
        </button>
        <h1>Download TrackVision</h1>
        <p className="header-subtitle">Get the desktop application for enhanced performance and offline capabilities</p>
      </header>

      {/* <section className="installation-intro">
        <div className="intro-card">
          <h2>🚀 Desktop Application Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit">
              <span className="benefit-icon">⚡</span>
              <span>Faster video processing</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">🔒</span>
              <span>Offline functionality</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">💾</span>
              <span>Local data storage</span>
            </div>
            <div className="benefit">
              <span className="benefit-icon">🎯</span>
              <span>Enhanced precision tools</span>
            </div>
          </div>
        </div>
      </section> */}

      <section className="download-section">
        <h2>Choose Your Platform</h2>
        <div className="download-table-container">
          <table className="download-table">
            <thead>
              <tr>
                <th>Operating System</th>
                <th>Version</th>
                <th>File Size</th>
                <th>Download</th>
              </tr>
            </thead>
            <tbody>
              {downloadData.map((item, index) => (
                <tr key={index} className="download-row">
                  <td className="os-column">
                    <span className="os-icon">{item.icon}</span>
                    <span className="os-name">{item.os}</span>
                  </td>
                  <td className="version-column">{item.version}</td>
                  <td className="size-column">{item.size}</td>
                  <td className="download-column">
                    <button
                      onClick={() => handleDownload(item.filename, item.url)}
                      className="download-btn"
                    >
                      <span className="download-icon">⬇️</span>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    
       <section className="installation-steps">
              <h2>Installation Guide</h2>
                <div className="steps-container">

                <div className="step-card">
                    <div className="step-header">
                    <span className="step-number">01</span>
                    <h3>Download & Extract</h3>
                    </div>
                    <p>
                    Download the backend package for your operating system from the links provided above. 
                    The backend is a standalone executable that does not require installation. 
                    Just double-click (or run via terminal) to start it. 
                    For macOS and Linux, you may need to set execute permissions using <code>chmod +x filename</code>.
                    Extract the files to a folder of your choice.
                    </p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                    <span className="step-number">02</span>
                    <h3>System Requirements</h3>
                    </div>
                    <p>
                    Ensure your system has the following:
                    <ul>
                        <li>At least 4 GB RAM</li>
                        <li>Internet connection (optional, only for updates)</li>
                        <li>A modern web browser to access the frontend</li>
                    </ul>
                    No additional dependencies or installations are needed for the backend executable.
                    </p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                    <span className="step-number">03</span>
                    <h3>Run the Backend</h3>
                    </div>
                    <p>
                    Open the folder and run the backend executable:
                    <ul>
                        <li>Windows: <code>app.exe</code></li>
                        <li>Mac: <code>./app_mac</code></li>
                        <li>Linux: <code>./app_linux</code></li>
                    </ul>
                    A terminal window will appear showing logs of the backend server. Keep it running while using the frontend.
                    </p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                    <span className="step-number">04</span>
                    <h3>Access the Frontend</h3>
                    </div>
                    <p>
                    Open your web browser and go to <a href="https://sparshhgupta.github.io/trackvision.gui/">the frontend website</a>. 
                    The frontend will automatically connect to the backend running on your machine.
                    Perform your tasks as usual.
                    </p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                    <span className="step-number">05</span>
                    <h3>Exit & Cleanup</h3>
                    </div>
                    <p>
                    Once you are done, go back to the terminal running the backend and press <code>Ctrl + C</code> to stop it. 
                    Any temporary files created during execution will remain in the backend folder. 
                    Delete them manually if they are no longer needed.
                    </p>
                </div>

                <div className="step-card">
                    <div className="step-header">
                    <span className="step-number">06</span>
                    <h3>Support & Updates</h3>
                    </div>
                    <p>
                    For updates, bug reports, or support, visit our <a href="https://github.com/sparshhgupta/trackvision.gui">GitHub repository</a>. 
                    New releases of the backend executable will be available here.
                    </p>
                </div>

                </div>

        {/* <h2>Installation Guide</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-header">
              <span className="step-number">01</span>
              <h3>Download & Extract</h3>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>

          <div className="step-card">
            <div className="step-header">
              <span className="step-number">02</span>
              <h3>System Requirements</h3>
            </div>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>

          <div className="step-card">
            <div className="step-header">
              <span className="step-number">03</span>
              <h3>Configuration Setup</h3>
            </div>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.</p>
          </div>

          <div className="step-card">
            <div className="step-header">
              <span className="step-number">04</span>
              <h3>First Launch</h3>
            </div>
            <p>Explicabo nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt neque porro quisquam est.</p>
          </div>

          <div className="step-card">
            <div className="step-header">
              <span className="step-number">05</span>
              <h3>Troubleshooting</h3>
            </div>
            <p>Qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ut enim ad minima veniam.</p>
          </div>

          <div className="step-card">
            <div className="step-header">
              <span className="step-number">06</span>
              <h3>Support & Updates</h3>
            </div>
            <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur at vero eos et accusamus.</p>
          </div>
        </div>  */}
      </section>

      <section className="version-info">
        <div className="version-card">
          <h3>Current Version: v1.2.0</h3>
          <p className="release-date">Released: September 15, 2025</p>
          <div className="version-highlights">
            <h4>What's New:</h4>
            <ul>
              <li>Enhanced batch processing performance</li>
              <li>Improved CSV parsing accuracy</li>
              {/* <li>New keyboard shortcuts for faster navigation</li> */}
              <li>Bug fixes and stability improvements</li>
              <li>In depth analysis at the end of your processing.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="support-section">
        <div className="support-card">
          <h3>Need Help?</h3>
          <p>Having trouble with installation or setup?</p>
          <div className="support-links">
            <a href="#" className="support-link">📖 Documentation</a>
            <a href="#" className="support-link">💬 Community Forum</a>
            <a href="#" className="support-link">✉️ Contact Support</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InstallationPage;