import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

const MovieSearchFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [ratingRange, setRatingRange] = useState({ min: 0, max: 10 });

  // TMDB 장르 목록
  const genres = [
    { id: 28, name: '액션' },
    { id: 12, name: '모험' },
    { id: 16, name: '애니메이션' },
    { id: 35, name: '코미디' },
    { id: 80, name: '범죄' },
    { id: 99, name: '다큐멘터리' },
    { id: 18, name: '드라마' },
    { id: 10751, name: '가족' },
    { id: 14, name: '판타지' },
    { id: 36, name: '역사' },
    { id: 27, name: '공포' },
    { id: 10402, name: '음악' },
    { id: 9648, name: '미스터리' },
    { id: 10749, name: '로맨스' },
    { id: 878, name: 'SF' },
    { id: 53, name: '스릴러' },
    { id: 10752, name: '전쟁' },
    { id: 37, name: '서부' }
  ];

  const handleGenreToggle = (genreId) => {
    setSelectedGenres(prev => 
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId]
    );
  };

  return (
    <div className="w-full bg-gray-900 p-4 rounded-lg shadow-lg">
      {/* 기본 검색바 */}
      <div className="flex items-center gap-2 mb-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="영화 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          필터
        </button>
      </div>

      {/* 확장된 필터 옵션 */}
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* 장르 선택 */}
          <div>
            <h3 className="text-white mb-2">장르</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreToggle(genre.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedGenres.includes(genre.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* 개봉일 범위 */}
          <div>
            <h3 className="text-white mb-2">개봉일</h3>
            <div className="flex gap-4">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="bg-gray-800 text-white px-3 py-2 rounded-lg"
              />
              <span className="text-white self-center">~</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="bg-gray-800 text-white px-3 py-2 rounded-lg"
              />
            </div>
          </div>

          {/* 평점 범위 */}
          <div>
            <h3 className="text-white mb-2">평점 범위</h3>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={ratingRange.min}
                onChange={(e) => setRatingRange(prev => ({ ...prev, min: parseFloat(e.target.value) }))}
                className="flex-1"
              />
              <span className="text-white">{ratingRange.min.toFixed(1)}</span>
              <span className="text-white">~</span>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={ratingRange.max}
                onChange={(e) => setRatingRange(prev => ({ ...prev, max: parseFloat(e.target.value) }))}
                className="flex-1"
              />
              <span className="text-white">{ratingRange.max.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearchFilter;