import React, { useContext,useEffect,useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdNoteAdd } from 'react-icons/md';
import { LuNewspaper } from 'react-icons/lu';
import { FcAbout } from 'react-icons/fc';
import { FaSearchengin } from 'react-icons/fa';
import { MdBatchPrediction } from 'react-icons/md';
import Note from './Note';
import Select_Options from '../components/select_options';
import select_options_styles from '../../src/styles/select_options.module.css';
import AppContext from '../context/AppContext';

const API_URL = 'http://localhost:5000/api/files';

// Sidebar Button Component
const Button = ({ children, className, ...props }) => (
  <button
    className={`flex items-center gap-2 p-4 text-left text-lg hover:bg-gray-800 ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Sidebar Component
const Sidebar = ({ onSelect }) => {
  const { setActiveView } = useContext(AppContext);
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`bg-[#12001f] border-r border-gray-800 flex flex-col ${expanded ? 'w-64' : 'w-16'} transition-all duration-300`}
    >
      <Button className="justify-center" onClick={() => setExpanded(!expanded)}>
        <span className="sr-only">Toggle sidebar</span>
        <FaBars />
      </Button>

      <Button onClick={() => setActiveView('search')}>
        <FaSearchengin />
        {expanded && <span>Search</span>}
      </Button>

      <Button onClick={() => setActiveView('notes')}>
        <MdNoteAdd />
        {expanded && <span>Access Notes</span>}
      </Button>

      <Button onClick={() => setActiveView('pyqs')}>
        <LuNewspaper />
        {expanded && <span>PYQs</span>}
      </Button>
      <Button onClick={() => setActiveView('predicte_paper')}>
        <MdBatchPrediction />
        {expanded && <span>Predict Paper</span>}
      </Button>
      <Button onClick={() => setActiveView('about')}>
        <FcAbout />
        {expanded && <span>About</span>}
      </Button>

      <div className="flex-1" />

      {expanded && (
        <div className="p-4 text-xs text-gray-400 border-t border-gray-800">
          <p>Developed by</p>
          <p className="mt-1">Team "NextGen Nirmaam" ✨</p>
          <p className="mt-1">For more details ➡️ Go to About Section</p>
        </div>
      )}
    </div>
  );
};

// ChatInterface Component
const ChatInterface = ({ selectedSem }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const { setActiveView } = useContext(AppContext);
  const navigate = useNavigate();

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

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.pdfPath) {
      const fileUrl = `${API_URL}/preview/${encodeURIComponent(`${selectedSem}/${suggestion.pdfPath}`)}`;
      const pageNumber = suggestion.pageNumber;
      navigate('/result', {
        state: {
          fileUrl,
          fileType: 'pdf',
          pageNumber,
        },
      });
    } else {
      alert(`No PDF available for ${suggestion.topics}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
          Hello Homie, Which topic are you looking to get assistance with?
        </span>
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            className="w-full bg-[#130121] border border-gray-700 rounded-md px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask StudyAid....."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="absolute left-0 mt-2 w-full bg-[#130121] border border-gray-700 rounded-md max-h-40 overflow-y-auto">
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
    </div>
  );
};

// Home Component
const Home = () => {
  const { activeView, setActiveView, selectedSem, setSelectedSem } = useContext(AppContext);

  const handleSelectSemChange = (value) => {
    setSelectedSem(value);
  };

  const Sem_options = [
    { value: 'SEM_1', label: 'SEM 1' },
    { value: 'SEM_2', label: 'SEM 2' },
    { value: 'SEM_3', label: 'SEM 3' },
  ];

  const renderComponent = () => {
    if (activeView === 'search') {
      return (
        <>
          <Select_Options
            initialValue={selectedSem}
            label="Sem"
            options={Sem_options}
            onChange={handleSelectSemChange}
            sx={{ color: 'white' }}
          />
          <ChatInterface selectedSem={selectedSem} />
        </>
      );
    } else if (activeView === 'notes') {
      return <Note selectedSem={selectedSem} />;
    } else if (activeView === 'pyqs') {
      return <div>pyqs</div>;
    } else if (activeView === 'predicte_paper') {
      return <div>predict_paper</div>;
    } else if (activeView === 'about') {
      return <div>About</div>;
    } else {
      return (
        <>
          <Select_Options
            initialValue={selectedSem}
            label="Sem"
            options={Sem_options}
            onChange={handleSelectSemChange}
            sx={{ color: 'white' }}
          />
          <ChatInterface selectedSem={selectedSem} />
        </>
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#1e0233] text-white">
      <Sidebar onSelect={setActiveView} />
      {selectedSem === '' ? (
        <div className={select_options_styles.container}>
          <h1 className={select_options_styles.heading}>Select Semester</h1>
          <Select_Options
            initialValue=""
            label="Sem"
            options={Sem_options}
            onChange={handleSelectSemChange}
            sx={{ color: 'white' }}
          />
        </div>
      ) : (
        renderComponent()
      )}
    </div>
  );
};

export default Home;


