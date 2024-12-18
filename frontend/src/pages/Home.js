// import React, { useState, useEffect } from 'react';
// import { FaPlus, FaBars, FaSearch } from 'react-icons/fa';
// import { useNavigate } from "react-router-dom";
// const API_URL = "http://localhost:5000/api/files";
// const Button = ({ children, className, ...props }) => (
//   <button
//     className={`flex items-center gap-2 p-4 text-left text-sm hover:bg-gray-800 ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const Sidebar = () => {
//   const [expanded, setExpanded] = useState(true);

//   return (
//     <div className={`bg-[#1E1F1F] border-r border-gray-800 flex flex-col ${expanded ? 'w-64' : 'w-16'} transition-all duration-300`}>
//       <Button className="justify-center" onClick={() => setExpanded(!expanded)}>
//         <span className="sr-only">Toggle sidebar</span>
//         <FaBars />
//       </Button>
      
//       <Button>
//         <FaPlus className="h-5 w-5" />
//         {expanded && <span>ACCESS NOTES</span>}
//       </Button>

//       <Button>
//         <FaPlus className="h-5 w-5" />
//         {expanded && <span>PYQS</span>}
//       </Button>

//       <Button>
//         <FaPlus className="h-5 w-5" />
//         {expanded && <span>New chat</span>}
//       </Button>

//       <div className="flex-1" />

//       {expanded && (
//         <div className="p-4 text-xs text-gray-400 border-t border-gray-800">
//           <p>Location information</p>
//           <p className="mt-1">From your IP address • Update location</p>
//         </div>
//       )}
//     </div>
//   );
// };

// // const ChatInterface = () => {
// //     const [input, setInput] = useState('');
// //     const [suggestions, setSuggestions] = useState([]);
// //     const [debounceTimeout, setDebounceTimeout] = useState(null);
  
// //     const handleSubmit = (e) => {
// //       e.preventDefault();
// //       if (input.trim()) {
// //         // Handle submission (e.g., send to API, update state, etc.)
// //         console.log("Submitted:", input);
// //         setInput('');
// //       }
// //     };
  
// //     return (
// //       <div className="flex-1 flex flex-col items-center justify-center p-4">
// //         <h1 className="text-3xl font-bold text-center mb-8">
// //           <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
// //             Hello Homie Which topic are you looking to get assisted with ?
// //           </span>
// //         </h1>
        
// //         <form onSubmit={handleSubmit} className="w-full max-w-2xl">
// //           <div className="relative">
// //             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //             <input
// //               className="w-full bg-[#2A2B2B] border border-gray-700 rounded-md px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               placeholder="Ask STUDYAID....."
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //             />
// //           </div>
// //         </form>
// //       </div>
// //     );
// //   };

// const ChatInterface = () => {
//   const [input, setInput] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [debounceTimeout, setDebounceTimeout] = useState(null);
//   const [previewFile, setPreviewFile] = useState(null); 
//   const [fileType, setFileType] = useState(""); 

//   useEffect(() => {
//     if (debounceTimeout) {
//       clearTimeout(debounceTimeout); // Clear the previous timeout
//     }

//     // Set a new timeout
//     const timeout = setTimeout(() => {
//       if (input.trim()) {
//         fetchSuggestions(input);
//       } else {
//         setSuggestions([]); // Clear suggestions when input is empty
//       }
//     }, 200); // 1 second debounce time

//     setDebounceTimeout(timeout);

//     // Cleanup on unmount or input change
//     return () => clearTimeout(timeout);
//   }, [input]);

//   const fetchSuggestions = async (query) => {
//     try {
//       const response = await fetch(`http://localhost:5000/suggestions?q=${query}`);
//       const data = await response.json();
//       setSuggestions(data);
//       // console.log(response)
//     } catch (error) {
//       console.error('Error fetching suggestions:', error);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) {
//       console.log('Submitted:', input);
//       setInput('');
//       setSuggestions([]); // Clear suggestions on submit
//     }
//   };
//   const navigate = useNavigate();
  
//   const handleSuggestionClick = (suggestion) => {
    
//     if (suggestion.pdfPath) {
//       var fileUrl = `${API_URL}/preview/${encodeURIComponent(suggestion.pdfPath)}`;
//       // setPreviewFile(`${API_URL}${suggestion.pdfPath}`); // Set the PDF for preview
//       // var fileUrl="D:\Projects\StudyAid-AI\backend\uploads\Aashana Certificate AWS skill Builder.pdf"
//       console.log(fileUrl)
//       var pageNumber=suggestion.pageNumber
//       navigate("/result", {
//             state: {
//               fileUrl,
//               fileType: "pdf",
//               pageNumber,
//             },
//           });
//       // console.log(fileUrl)
//     } else {
//       alert(`No PDF available for ${suggestion.topics}`);
//     }
//   };

//   // Open file preview
//   // const handlePreview = (filename) => {
//   //   const fileExtension = filename.split(".").pop().toLowerCase();
//   //   const filePath = currentDir ? `${currentDir}/${filename}` : filename;
//   //   const fileUrl = `${API_URL}/preview/${encodeURIComponent(filePath)}`;
  
//   //   navigate("/result", {
//   //     state: {
//   //       fileUrl,
//   //       fileType: fileExtension,
//   //     },
//   //   });
//   // };
  

//   return (
//     <div className="flex-1 flex flex-col items-center justify-center p-4">
//       <h1 className="text-3xl font-bold text-center mb-8">
//         <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
//           Hello Homie, Which topic are you looking to get assistance with?
//         </span>
//       </h1>

//       <form onSubmit={handleSubmit} className="w-full max-w-2xl">
//         <div className="relative">
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full bg-[#2A2B2B] border border-gray-700 rounded-md px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Ask STUDYAID....."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           {/* {suggestions.length > 0 && (
//             <ul className="absolute left-0 mt-2 w-full bg-[#2A2B2B] border border-gray-700 rounded-md max-h-40 overflow-y-auto">
//               {suggestions.map((suggestion, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleSuggestionClick(suggestion)} // Handle click
//                   className="px-4 py-2 cursor-pointer hover:bg-gray-800"
//                 >
//                   {suggestion}
//                 </li>
//               ))}
//             </ul>
//           )} */}

//             {suggestions.length > 0 && (
//               <ul className="absolute left-0 mt-2 w-full bg-[#2A2B2B] border border-gray-700 rounded-md max-h-40 overflow-y-auto">
//                 {suggestions.map((suggestion, index) => (
//                   <li
//                     key={index}
//                     onClick={() => handleSuggestionClick(suggestion)} // Handle click
//                     className="px-4 py-2 cursor-pointer hover:bg-gray-800"
//                   >
//                     {suggestion.topics} {/* Render the "topics" field */}
//                   </li>
//                 ))}
//               </ul>
//             )}
//         </div>
//       </form>
//     </div>
//   );
// };

// const Home = () => {
//   return (
//     <div className="flex h-screen bg-[#1E1F1F] text-white">
//       <Sidebar />
//       <ChatInterface />

//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import { FaPlus, FaBars, FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import Note from './Note';
const API_URL = "http://localhost:5000/api/files";

// Sidebar Button Component
const Button = ({ children, className, ...props }) => (
  <button
    className={`flex items-center gap-2 p-4 text-left text-sm hover:bg-gray-800 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Sidebar Component
const Sidebar = ({ onSelect }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`bg-[#1E1F1F] border-r border-gray-800 flex flex-col ${expanded ? 'w-64' : 'w-16'} transition-all duration-300`}>
      <Button className="justify-center" onClick={() => setExpanded(!expanded)}>
        <span className="sr-only">Toggle sidebar</span>
        <FaBars />
      </Button>
      
      <Button onClick={() => onSelect('notes')}>
        <FaPlus className="h-5 w-5" />
        {expanded && <span>ACCESS NOTES</span>}
      </Button>

      <Button onClick={() => onSelect('pyqs')}>
        <FaPlus className="h-5 w-5" />
        {expanded && <span>PYQS</span>}
      </Button>

      <Button onClick={() => onSelect('new_chat')}>
        <FaPlus className="h-5 w-5" />
        {expanded && <span>New chat</span>}
      </Button>

      <div className="flex-1" />

      {expanded && (
        <div className="p-4 text-xs text-gray-400 border-t border-gray-800">
          <p>Location information</p>
          <p className="mt-1">From your IP address • Update location</p>
        </div>
      )}
    </div>
  );
};

// ChatInterface Component
const ChatInterface = ({ activeView }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [previewFile, setPreviewFile] = useState(null); 
  const [fileType, setFileType] = useState(""); 

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear the previous timeout
    }

    // Set a new timeout
    const timeout = setTimeout(() => {
      if (input.trim()) {
        fetchSuggestions(input);
      } else {
        setSuggestions([]); // Clear suggestions when input is empty
      }
    }, 200);

    setDebounceTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [input]);

  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/suggestions?q=${query}`);
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      console.log('Submitted:', input);
      setInput('');
      setSuggestions([]);
    }
  };

  const navigate = useNavigate();

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.pdfPath) {
      const fileUrl = `${API_URL}/preview/${encodeURIComponent(suggestion.pdfPath)}`;
      const pageNumber = suggestion.pageNumber;
      navigate("/result", {
        state: {
          fileUrl,
          fileType: "pdf",
          pageNumber,
        },
      });
    } else {
      alert(`No PDF available for ${suggestion.topics}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      {activeView === 'notes' ? (
        <Note />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Hello Homie, Which topic are you looking to get assistance with?
            </span>
          </h1>

          <form onSubmit={handleSubmit} className="w-full max-w-2xl">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                className="w-full bg-[#2A2B2B] border border-gray-700 rounded-md px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask STUDYAID....."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              {suggestions.length > 0 && (
                <ul className="absolute left-0 mt-2 w-full bg-[#2A2B2B] border border-gray-700 rounded-md max-h-40 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-800"
                    >
                      {suggestion.topics}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
};

// Home Component
const Home = () => {
  const [activeView, setActiveView] = useState(null);

  return (
    <div className="flex h-screen bg-[#1E1F1F] text-white">
      <Sidebar onSelect={setActiveView} />
      <ChatInterface activeView={activeView} />
    </div>
  );
};

export default Home;
