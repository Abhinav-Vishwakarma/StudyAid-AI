import React, { useState } from 'react';
import { FaPlus, FaBars, FaSearch } from 'react-icons/fa';

const Button = ({ children, className, ...props }) => (
  <button
    className={`flex items-center gap-2 p-4 text-left text-sm hover:bg-gray-800 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={`bg-[#1E1F1F] border-r border-gray-800 flex flex-col ${expanded ? 'w-64' : 'w-16'} transition-all duration-300`}>
      <Button className="justify-center" onClick={() => setExpanded(!expanded)}>
        <span className="sr-only">Toggle sidebar</span>
        <FaBars />
      </Button>
      
      <Button>
        <FaPlus className="h-5 w-5" />
        {expanded && <span>ACCESS NOTES</span>}
      </Button>

      <Button>
        <FaPlus className="h-5 w-5" />
        {expanded && <span>PYQS</span>}
      </Button>

      <Button>
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

const ChatInterface = () => {
    const [input, setInput] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (input.trim()) {
        // Handle submission (e.g., send to API, update state, etc.)
        console.log("Submitted:", input);
        setInput('');
      }
    };
  
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
            Hello Homie Which topic are you looking to get assisted with ?
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
          </div>
        </form>
      </div>
    );
  };

const Home = () => {
  return (
    <div className="flex h-screen bg-[#1E1F1F] text-white">
      <Sidebar />
      <ChatInterface />
    </div>
  );
};

export default Home;
