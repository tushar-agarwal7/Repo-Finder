import React, { useState } from 'react';
import { Octokit } from '@octokit/core';

const App = () => {
  const [language, setLanguage] = useState('JavaScript');
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(false);

  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN, // Using an environment variable for the token
  });

  const fetchRandomRepo = async () => {
    setLoading(true);
    try {
      const response = await octokit.request('GET /search/repositories', {
        q: `language:${language}`,
        sort: 'stars',
        order: 'desc',
      });
      const repos = response.data.items;
      const randomRepo = repos[Math.floor(Math.random() * repos.length)];
      setRepo(randomRepo);
    } catch (error) {
      console.error('Error fetching repository:', error);
    }
    setLoading(false);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 flex justify-center items-center p-6">
      <div className="max-w-4xl w-full bg-white/30 backdrop-blur-lg p-8 shadow-2xl rounded-lg">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8">
          🌟 GitHub Random Repo Finder 🌟
        </h1>
        <div className="flex flex-col items-center mb-6">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="border border-white/50 text-white bg-transparent p-3 rounded-lg w-full max-w-lg mb-4 placeholder-white focus:ring-4 focus:ring-indigo-400 shadow-lg"
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="Ruby">Ruby</option>
            <option value="Go">Go</option>
            <option value="C++">C++</option>
          </select>
          <button
            onClick={fetchRandomRepo}
            className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-lg"
          >
            {loading ? 'Fetching...' : 'Get Random Repo'}
          </button>
        </div>

        {repo && (
          <div className="bg-white/80 p-6 rounded-lg shadow-lg mt-6">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 font-bold text-2xl hover:text-pink-700 transition-colors duration-200"
            >
              {repo.full_name}
            </a>
            <p className="text-gray-700 mt-2">{repo.description}</p>
            <div className="flex justify-between mt-4">
              <p className="text-gray-600">⭐ Stars: {repo.stargazers_count}</p>
              <p className="text-gray-600">🍴 Forks: {repo.forks_count}</p>
              <p className="text-gray-600">🐞 Open Issues: {repo.open_issues_count}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
