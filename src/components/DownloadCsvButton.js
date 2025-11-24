import React, { useState } from "react";
import "./DownloadCsvButton.css";

const DownloadCsvButton = () => {
  const [loadingCSV, setLoadingCSV] = useState(false);
  const [loadingChanges, setLoadingChanges] = useState(false);

  const handleDownloadCSV = async () => {
    setLoadingCSV(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/download_csv", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to download CSV");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Get filename from Content-Disposition header or use default
      const contentDisposition = response.headers.get("Content-Disposition");
      let filename = "updated_annotations.csv";
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i);
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1];
        }
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
      
      console.log(`Downloaded: ${filename}`);
      
      // Show success feedback
      showToast(`Downloaded: ${filename}`, "success");
    } catch (error) {
      console.error("Error downloading CSV:", error);
      showToast("Failed to download CSV", "error");
    } finally {
      setLoadingCSV(false);
    }
  };

  const handleDownloadChanges = async () => {
    setLoadingChanges(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/download-tracking-changes", {
        method: "GET",
      });

      if (!response.ok) {
        if (response.status === 404) {
          showToast("No tracking changes found. Make some changes first!", "warning");
          return;
        }
        throw new Error("Failed to download tracking changes");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "tracking_changes.csv";
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
      
      console.log("Downloaded tracking changes");
      showToast("Downloaded tracking changes log", "success");
    } catch (error) {
      console.error("Error downloading tracking changes:", error);
      showToast("Failed to download tracking changes", "error");
    } finally {
      setLoadingChanges(false);
    }
  };

  const showToast = (message, type) => {
    // Simple toast notification - you can replace this with a better toast library
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 24px;
      background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#ff9800"};
      color: white;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  return (
    <div className="download-buttons-container">
      <button 
        onClick={handleDownloadCSV} 
        className="download-csv-btn"
        disabled={loadingCSV}
      >
        {loadingCSV ? "Downloading..." : "Download Updated CSV"}
      </button>
      <button 
        onClick={handleDownloadChanges} 
        className="download-csv-btn download-changes-btn"
        disabled={loadingChanges}
      >
        {loadingChanges ? "Downloading..." : "Download Changes Log"}
      </button>
    </div>
  );
};

export default DownloadCsvButton;