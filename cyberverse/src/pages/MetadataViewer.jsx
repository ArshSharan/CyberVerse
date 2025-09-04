import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFileImage, 
  FaFileAlt, 
  FaCamera, 
  FaCalendarAlt, 
  FaMapMarkerAlt,
  FaLock,
  FaShieldAlt,
  FaEye,
  FaDownload
} from "react-icons/fa";
import { 
  HiOutlineDocumentSearch,
  HiOutlineFingerPrint,
  HiOutlinePhotograph
} from "react-icons/hi";
import { 
  RiFileSearchLine,
  RiSecurePaymentLine,
  RiInformationLine
} from "react-icons/ri";

export default function MetadataInspector() {
  const features = [
    {
      icon: <FaFileImage size={24} />,
      title: "Image Analysis",
      description: "Extract EXIF data, GPS coordinates, and camera settings from photos",
      color: "#00ffe1"
    },
    {
      icon: <FaFileAlt size={24} />,
      title: "Document Forensics", 
      description: "Analyze PDF, Office, and other document metadata for hidden information",
      color: "#ff6b6b"
    },
    {
      icon: <HiOutlineFingerPrint size={24} />,
      title: "Digital Fingerprinting",
      description: "Identify file origins, creation tools, and modification history",
      color: "#4ecdc4"
    }
  ];

  const metadataTypes = [
    { type: "EXIF Data", icon: <FaCamera size={16} />, description: "Camera settings, timestamps, GPS" },
    { type: "File Properties", icon: <RiInformationLine size={16} />, description: "Size, format, creation date" },
    { type: "Author Info", icon: <FaEye size={16} />, description: "Creator, editor, software used" },
    { type: "Hidden Text", icon: <HiOutlineDocumentSearch size={16} />, description: "Comments, revisions, tracked changes" },
  ];

  return (
    <div className="metadata-container">
      {/* Hero Header */}
      <motion.div 
        className="hero-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <div className="icon-wrapper">
            <RiFileSearchLine size={48} />
          </div>
          <h1 className="page-title">METADATA INSPECTOR</h1>
          <p className="page-subtitle">
            Advanced forensic analysis tool for extracting hidden metadata from digital files
          </p>
          <div className="security-badge">
            <FaShieldAlt size={16} />
            <span>SECURE ANALYSIS</span>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.section 
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="section-title">Forensic Capabilities</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="feature-icon" style={{ color: feature.color }}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Metadata Types */}
      <motion.section 
        className="metadata-types"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <h3 className="types-title">Extractable Metadata</h3>
        <div className="types-grid">
          {metadataTypes.map((type, index) => (
            <motion.div
              key={index}
              className="type-item"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            >
              <div className="type-icon">{type.icon}</div>
              <div className="type-content">
                <h4 className="type-name">{type.type}</h4>
                <p className="type-description">{type.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tool Embed */}
      <motion.section 
        className="tool-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div className="tool-header">
          <h2 className="tool-title">Live Analysis Tool</h2>
          <div className="tool-status">
            <div className="status-indicator"></div>
            <span>OPERATIONAL</span>
          </div>
        </div>
        
        <div className="tool-wrapper">
          <iframe
            src="https://metadata-inspector-tool.onrender.com/"
            width="100%"
            height="720px"
            style={{ border: 'none', backgroundColor: '#000' }}
            title="Metadata Inspector"
          />
        </div>

        <div className="tool-info">
          <div className="info-item">
            <FaLock size={16} />
            <span>Files processed locally - no data uploaded to servers</span>
          </div>
          <div className="info-item">
            <FaDownload size={16} />
            <span>Export analysis results in multiple formats</span>
          </div>
        </div>
      </motion.section>

      <style jsx>{`
        .metadata-container {
          min-height: 100vh;
          background: 
            radial-gradient(ellipse at top, rgba(0, 255, 225, 0.02) 0%, transparent 70%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
          padding: 2rem;
          color: #ffffff;
        }

        /* HERO HEADER */
        .hero-header {
          text-align: center;
          padding: 3rem 0 4rem;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero-content {
          position: relative;
        }

        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          background: rgba(0, 255, 225, 0.1);
          border: 2px solid rgba(0, 255, 225, 0.3);
          border-radius: 20px;
          color: #00ffe1;
          margin-bottom: 2rem;
        }

        .page-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          margin: 0 0 1rem 0;
          letter-spacing: -0.025em;
          background: linear-gradient(135deg, #ffffff 0%, #00ffe1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2rem;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .security-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 255, 225, 0.1);
          color: #00ffe1;
          padding: 0.6rem 1.2rem;
          border-radius: 25px;
          border: 1px solid rgba(0, 255, 225, 0.3);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        /* FEATURES SECTION */
        .features-section {
          max-width: 1200px;
          margin: 0 auto 4rem;
        }

        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 3rem;
          color: #ffffff;
          letter-spacing: -0.025em;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .feature-card:hover {
          border-color: rgba(0, 255, 225, 0.3);
          background: rgba(255, 255, 255, 0.05);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 1.5rem;
        }

        .feature-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.3rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          color: #ffffff;
        }

        .feature-description {
          font-family: 'Inter', sans-serif;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin: 0;
        }

        /* METADATA TYPES */
        .metadata-types {
          max-width: 800px;
          margin: 0 auto 4rem;
        }

        .types-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 2rem;
          color: #ffffff;
        }

        .types-grid {
          display: grid;
          gap: 1rem;
        }

        .type-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(0, 255, 225, 0.03);
          border: 1px solid rgba(0, 255, 225, 0.1);
          border-radius: 12px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .type-item:hover {
          border-color: rgba(0, 255, 225, 0.3);
          background: rgba(0, 255, 225, 0.05);
        }

        .type-icon {
          color: #00ffe1;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .type-content {
          flex: 1;
        }

        .type-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: #ffffff;
        }

        .type-description {
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        /* TOOL SECTION */
        .tool-section {
          max-width: 1400px;
          margin: 0 auto;
        }

        .tool-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .tool-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          color: #ffffff;
        }

        .tool-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          color: #00ffe1;
          font-weight: 600;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          background: #00ffe1;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .tool-wrapper {
          border: 2px solid rgba(0, 255, 225, 0.2);
          border-radius: 12px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .tool-info {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
          flex-wrap: wrap;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .info-item svg {
          color: #00ffe1;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        /* RESPONSIVE DESIGN */
        @media (max-width: 768px) {
          .metadata-container {
            padding: 1rem;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
          }
          
          .tool-header {
            flex-direction: column;
            text-align: center;
          }
          
          .tool-info {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
