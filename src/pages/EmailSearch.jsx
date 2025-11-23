import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  FaGlobe, FaBookOpen, FaPlayCircle, FaUpload, FaSignOutAlt
} from "react-icons/fa";

// New Icon Components with magnifying glass
const PersonSearchIcon = ({ size = 24, color = '#1890FF' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#E6F7FF"/>
    <path d="M20 12C18.3431 12 17 13.3431 17 15C17 16.6569 18.3431 18 20 18C21.6569 18 23 16.6569 23 15C23 13.3431 21.6569 12 20 12Z" fill={color}/>
    <path d="M20 20C16.6863 20 14 22.6863 14 26H26C26 22.6863 23.3137 20 20 20Z" fill={color}/>
    <circle cx="28" cy="28" r="6" stroke={color} strokeWidth="2"/>
    <line x1="32" y1="32" x2="36" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FolderSearchIcon = ({ size = 24, color = '#595959' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#F5F5F5"/>
    <path d="M12 14H28V28H12V14Z" fill={color}/>
    <path d="M12 14L16 10H24L28 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="28" cy="28" r="6" stroke={color} strokeWidth="2"/>
    <line x1="32" y1="32" x2="36" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const FileStackSearchIcon = ({ size = 24, color = '#595959' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#F5F5F5"/>
    <path d="M14 12H26V26H14V12Z" fill={color}/>
    <path d="M16 14H24V24H16V14Z" fill="#F5F5F5"/>
    <path d="M12 14H24V28H12V14Z" fill={color}/>
    <path d="M14 16H22V26H14V16Z" fill="#F5F5F5"/>
    <circle cx="28" cy="28" r="6" stroke={color} strokeWidth="2"/>
    <line x1="32" y1="32" x2="36" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const InFlagSearchIcon = ({ size = 24, color = '#595959' }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#F5F5F5"/>
    <path d="M12 12H28V28H12V12Z" fill={color}/>
    <text x="20" y="22" fontFamily="Arial" fontSize="10" fontWeight="bold" textAnchor="middle" fill="white">in</text>
    <circle cx="28" cy="28" r="6" stroke={color} strokeWidth="2"/>
    <line x1="32" y1="32" x2="36" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Prop types validation for new icons
PersonSearchIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

FolderSearchIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

FileStackSearchIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

InFlagSearchIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
};

// Use color from previous mint image for buttons
const BUTTON_BG = "#D2F8F6";
const ORANGE = "#ff731d";

const COLORS = {
  bgLight: "#f8fbf9",
  accent: "#06c8b5",
  accentDark: "#0bac95",
  sidebarBg: "#fff",
  sidebarBorder: "#e0e3e4",
  sidebarSelected: "#e7f7f7",
  menuGray: "#636c72",
  menuAccent: "#06c8b5",
  boxBorder: "#e0e3e4",
  greenBg: "#eafafa",
  greenBorder: "#c4efe7",
  red: "#e74c3c"
};

const SIDEBAR_ITEMS = [
  { key: "email-person", label: "Email Search", icon: <PersonSearchIcon size={21} color={COLORS.menuGray} /> },
  { key: "email-envelope", label: "Email Search", icon: <FolderSearchIcon size={21} color={COLORS.red} /> },
  { key: "database", label: "Database Search", icon: <FileStackSearchIcon size={21} color={COLORS.menuGray} /> },
  { key: "social", label: "Social URL Search", icon: <InFlagSearchIcon size={21} color={COLORS.menuGray} /> },
];

// --- Custom Notification Icon ---
const NotificationIcon = ({ hasNewNotifications }) => (
  <span style={{ position: "relative", display: "inline-block", width: 32, height: 32 }}>
    <img 
      src="https://z-cdn-media.chatglm.cn/files/a06c6d0b-5936-42c7-af65-d377a6499e50_pasted_image_1763720504228.png?auth_key=1863720711-f78f5acd69b24dd09ac1e3aba9f62522-0-5e711ec83c0286d7e1435fed473662be"
      alt="Notification"
      style={{ width: '100%', height: '100%' }}
    />
    {hasNewNotifications && (
      <span style={{
        position: "absolute",
        top: 3, left: 20,
        width: 11, height: 11,
        background: ORANGE,
        borderRadius: "50%",
        border: "2px solid #fff"
      }} />
    )}
  </span>
);

// --- Custom Settings (Gear) Icon ---
const SettingsIcon = () => (
  <img 
    src="https://z-cdn-media.chatglm.cn/files/0ed49086-00d6-41d1-aec7-580db48fc539_pasted_image_1763720528360.png?auth_key=1863720711-cae55c878e5046658cf7b6932557847a-0-9abbce8ee2e46def8b82d87b826396ec"
    alt="Settings"
    style={{ width: 32, height: 32 }}
  />
);

const EmailSearch = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [domain, setDomain] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [emailResult, setEmailResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("email-person");
  const [hasNewNotifications, setHasNewNotifications] = useState(false); // Initially no notifications
  
  // User state for the particular user
  const [user, setUser] = useState({
    name: "Eliza Chris",
    email: "elizachris@gmail.com",
    profileImage: "https://z-cdn-media.chatglm.cn/files/33e01e90-8b34-46c8-9ef0-255d0ad497ea_pasted_image_1763721440014.png?auth_key=1863721597-71b8a50686344a6f9c142df63807f4fd-0-90c053b1bae85ccae74bc35f91f5809c"
  });

  // Simulate receiving a notification after 10 seconds
  useEffect(() => {
    const notificationTimer = setTimeout(() => {
      setHasNewNotifications(true);
    }, 10000);

    return () => clearTimeout(notificationTimer);
  }, []);

  const handleEmailSearch = (e) => {
    e.preventDefault();
    if (firstName && lastName && domain) {
      if (!selectedFile) {
        alert("Please select a file when entering first name, last name, and domain");
        return;
      }
    } else if (!firstName || !lastName || !domain) {
      alert("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setEmailResult(`${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`);
      setIsLoading(false);
    }, 1200);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSignOut = () => {
    // Reset user state to null to simulate sign out
    setUser(null);
    alert("Signed out successfully!");
  };

  const handleNotificationClick = () => {
    // Only show alert and remove dot if there are new notifications
    if (hasNewNotifications) {
      setHasNewNotifications(false);
      alert("You have new notifications!");
    }
  };

  // If user is not logged in, show a message
  if (!user) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: COLORS.bgLight,
        flexDirection: "column"
      }}>
        <h2 style={{ color: COLORS.menuAccent, marginBottom: 20 }}>You have been signed out</h2>
        <button 
          onClick={() => {
            setUser({
              name: "Eliza Chris",
              email: "elizachris@gmail.com",
              profileImage: "https://z-cdn-media.chatglm.cn/files/33e01e90-8b34-46c8-9ef0-255d0ad497ea_pasted_image_1763721440014.png?auth_key=1863721597-71b8a50686344a6f9c142df63807f4fd-0-90c053b1bae85ccae74bc35f91f5809c"
            });
            // Reset notifications when signing in
            setHasNewNotifications(false);
          }}
          style={{
            background: BUTTON_BG,
            color: COLORS.menuAccent,
            border: "none",
            fontWeight: 600,
            fontSize: 15,
            borderRadius: 7,
            padding: "11px 37px",
            cursor: "pointer",
            boxShadow: "0 2px 7px 0 #d4f3f1"
          }}
        >
          Sign In Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex" style={{
      backgroundColor: COLORS.bgLight,
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 330.3,
          background: COLORS.sidebarBg,
          borderRight: `1.5px solid ${COLORS.sidebarBorder}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box"
        }}
      >
        <div>
          <div style={{ 
            padding: "15px 0 5px 26px",
            display: "flex",
            alignItems: "center"
          }}>
            {/* === UPTOSKILLS Logo Image === */}
            <img
              src="https://z-cdn-media.chatglm.cn/files/19992aa9-85b0-4fd7-8bd1-492a048a4b09_pasted_image_1763714953609.png?auth_key=1863714986-1d6259cd6e3d4a038068421eb1f04d00-0-3055b31e3364697af7e8a4fb3e881be5"
              alt="UPTOSKILLS Logo"
              style={{ 
                width: 210, 
                height: 150,
                objectFit: "contain", 
                display: 'block'
              }}
            />
          </div>
          <div style={{
            paddingLeft: 26,
            fontWeight: 700,
            fontSize: 16,
            color: COLORS.menuAccent,
            marginBottom: 17,
            marginTop: 0,
            display: "flex",
            alignItems: "center"
          }}>
            <PersonSearchIcon style={{ marginRight: 9, verticalAlign: "middle", fontSize: 18 }} />
            All tools
          </div>
          <nav>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {SIDEBAR_ITEMS.map(item => (
                <li key={item.key}>
                  <button
                    style={{
                      width: "93%",
                      padding: "12px 0 12px 21px",
                      background: selectedMenu === item.key ? COLORS.sidebarSelected : COLORS.sidebarBg,
                      color: selectedMenu === item.key ? COLORS.menuAccent : COLORS.menuGray,
                      fontSize: 16.5,
                      border: "none",
                      borderRadius: 8,
                      fontWeight: selectedMenu === item.key ? 700 : 500,
                      textAlign: "left",
                      marginBottom: 8,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 13,
                      outline: "none",
                      letterSpacing: 0.12,
                      transition: "background 0.18s"
                    }}
                    onClick={() => setSelectedMenu(item.key)}
                  >
                    {React.cloneElement(item.icon, {
                      color: selectedMenu === item.key ? COLORS.menuAccent : 
                             (item.key === "email-envelope" ? COLORS.red : COLORS.menuGray),
                      size: 21
                    })}
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Account Section - Now using user state */}
        <div style={{
          margin: "20px auto 15px auto",
          padding: "12px 15px",
          borderRadius: 10,
          background: "#fff",
          border: `1.5px solid #d8d8e5`,
          width: 323,
          boxSizing: "border-box"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Left: User Profile Image from state */}
            <img
              src={user.profileImage}
              alt="User Profile"
              style={{ 
                width: 50, 
                height: 50, 
                borderRadius: "50%",
                objectFit: "cover"
              }}
            />
            
            {/* Middle: User Name and Email from state */}
            <div style={{ flex: 1, marginLeft: 12 }}>
              <div style={{ fontWeight: 700, color: "#333", fontSize: 15 }}>{user.name}</div>
              <div style={{ fontSize: 13, color: "#666" }}>{user.email}</div>
            </div>
            
            {/* Right: Log out Button */}
            <button
              onClick={handleSignOut}
              style={{
                background: "#e6f7ff",
                color: ORANGE,
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 14,
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
                transition: "background 0.2s",
                whiteSpace: "nowrap"
              }}
              onMouseOver={(e) => e.target.style.background = "#d0eaff"}
              onMouseOut={(e) => e.target.style.background = "#e6f7ff"}
            >
              Log out
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-y-auto"
        style={{
          background: COLORS.bgLight,
          padding: 0,
          margin: 0,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "flex-start"
        }}>
        {/* Notification + Settings Bar */}
        <div style={{
          width: "100%",
          minHeight: 70,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 22,
          boxSizing: "border-box",
          padding: "11px 44px 11px 0",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}>
          <button 
            onClick={handleNotificationClick}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              cursor: "pointer",
              marginRight: 8,
              padding: 0,
              width: 34,
              height: 34
            }}
          >
            <NotificationIcon hasNewNotifications={hasNewNotifications} />
          </button>
          <button style={{
            background: "none",
            border: "none",
            outline: "none",
            cursor: "pointer",
            padding: 0,
            width: 34,
            height: 34
          }}>
            <SettingsIcon />
          </button>
        </div>
        
        {/* Modified Banner - Centered in one row */}
        <div style={{
          width: "100%",
          margin: "0",
          backgroundColor: "#32d9df",
          backgroundImage: `
            repeating-linear-gradient(0deg, #13b6b7, #13b6b7 1px, transparent 1px, transparent 16px),
            repeating-linear-gradient(90deg, #13b6b7, #13b6b7 1px, transparent 1px, transparent 16px)
          `,
          borderRadius: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 44px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 20,
          boxSizing: "border-box",
          minHeight: 65,
          position: "relative",
          gap: "30px"
        }}>
          <span>Learn how to collect targeted leads from any domain</span>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#fff",
              color: COLORS.accent,
              border: "none",
              fontWeight: 700,
              padding: "11px 26px",
              borderRadius: 36,
              fontSize: 16,
              cursor: "pointer"
            }}>
              <FaPlayCircle style={{ color: COLORS.accent, fontSize: 21 }} />
              Watch tutorial
            </button>
            <button style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "#fff",
              color: COLORS.accent,
              border: "none",
              fontWeight: 700,
              padding: "11px 26px",
              borderRadius: 36,
              fontSize: 16,
              cursor: "pointer"
            }}>
              <FaBookOpen style={{ color: COLORS.accent, fontSize: 21 }} />
              Read Guide
            </button>
          </div>
        </div>
        
        {/* Email Search box */}
        <div style={{
          width: "99%",
          margin: "0 auto 35px auto",
          borderRadius: 15,
          border: '1.5px solid #e0e3e4',
          background: "#fff",
          padding: "38px 34px",
          boxSizing: "border-box"
        }}>
          <h2 style={{ color: "#162944", fontSize: 18, marginBottom: 14, fontWeight: 700 }}>
            Email Search
          </h2>
          <p style={{ fontSize: 15, marginBottom: 16, color: "#454545" }}>
            Find email from your leads name and company
          </p>
          <form onSubmit={handleEmailSearch}>
            <div style={{ display: "flex", gap: 27, marginBottom: 22 }}>
              <input style={{ flex: 1, padding: "11px", fontSize: 15, borderRadius: 8, border: '1.5px solid #e0e3e4', background: "#fff" }}
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
              <input style={{ flex: 1, padding: "11px", fontSize: 15, borderRadius: 8, border: '1.5px solid #e0e3e4', background: "#fff" }}
                placeholder="Last Name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
              <input style={{ flex: 1, padding: "11px", fontSize: 15, borderRadius: 8, border: '1.5px solid #e0e3e4', background: "#fff" }}
                placeholder="Company Domain Name"
                value={domain}
                onChange={e => setDomain(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button type="submit" style={{
                background: BUTTON_BG,
                color: COLORS.menuAccent,
                border: "none",
                fontWeight: 600,
                fontSize: 15,
                borderRadius: 7,
                padding: "11px 37px",
                marginTop: 2,
                cursor: "pointer",
                boxShadow: "0 2px 7px 0 #d4f3f1"
              }}>
                {isLoading ? "Searching..." : "Find Email"}
              </button>
            </div>
            {emailResult && (
              <div className="mt-8 p-5 rounded-lg text-center"
                style={{
                  background: "#e3faf3",
                  border: "1.5px solid #c4efe7",
                  fontSize: 16,
                  marginTop: "21px",
                  fontWeight: "bold"
                }}>
                <p style={{ color: "#0bac95" }}>
                  Found email: <span style={{ fontWeight: 800 }}>{emailResult}</span>
                </p>
              </div>
            )}
          </form>
        </div>
        
        {/* Bulk Email Search box */}
        <div style={{
          width: "99%",
          margin: "0 auto 37px auto",
          borderRadius: 15,
          border: '1.5px solid #e0e3e4',
          background: "#fff",
          padding: "36px 32px",
          boxSizing: "border-box"
        }}>
          <h2 style={{ color: "#162944", fontSize: 18, marginBottom: 14, fontWeight: 700 }}>
            Bulk Email Search
          </h2>
          <p style={{ fontSize: 15, marginBottom: 14, color: "#454545" }}>
            Collect emails in bulk from a list of lead names and company domains
          </p>
          <div style={{
            border: "1.5px solid #e0e3e4",
            borderRadius: 12,
            background: COLORS.greenBg,
            padding: "36px 0 34px 0",
            textAlign: "center",
            minHeight: 140,
            position: "relative"
          }}>
            <div style={{
              color: "#344755",
              fontWeight: 700,
              fontSize: 19,
              marginBottom: 17,
              marginTop: 7
            }}>
              Upload or drop a file here
            </div>
            <label
              htmlFor="file-upload"
              style={{
                color: "#344755",
                background: BUTTON_BG,
                fontSize: 17,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '15px 40px',
                border: "none",
                borderRadius: 9,
                fontWeight: 600,
                marginBottom: 6,
                marginTop: 4,
                cursor: "pointer",
                boxShadow: "0 1px 5px 0 #b7efef",
                letterSpacing: 0.4,
              }}
            >
              <FaUpload style={{ fontSize: 20 }} />
              <span>Choose file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            <div style={{
              margin: '18px auto 0 auto',
              color: COLORS.menuGray,
              fontSize: 15,
              fontWeight: 500,
              maxWidth: 530
            }}>
              Process up to 50,000 domain searches at once with our Bulk Email Search feature.
            </div>
            {selectedFile && (
              <div style={{
                backgroundColor: "#d9f8fa",
                border: '1.5px solid #c4efe7',
                borderRadius: "8px",
                padding: "10px 18px",
                marginTop: 16,
                fontSize: 15,
                color: COLORS.accentDark,
                fontWeight: 600,
                display: "inline-block"
              }}>
                Selected file: <span style={{ fontWeight: "bold" }}>{selectedFile.name}</span>
              </div>
            )}
            
            {/* Robot Image at Bottom Right of the green container */}
            <img
              src="https://z-cdn-media.chatglm.cn/files/0dce847b-9329-40ab-a23f-d708d82cf37a_pasted_image_1763723195756.png?auth_key=1863723258-5f360e34a7594e39971b143f60f629a5-0-6a53730db5e74695a99fc762c1d847a6"
              alt="Robot Assistant"
              style={{
                position: "absolute",
                bottom: 15,
                right: 15,
                width: 80,
                height: 80,
                objectFit: "contain"
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailSearch;