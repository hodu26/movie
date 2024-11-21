import { useState, useEffect, createContext, useContext } from 'react';

const GenreContext = createContext();

export const useGenres = () => useContext(GenreContext);

export const GenreProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedTMDbKey = localStorage.getItem('TMDb-Key');

        const savedGenres = localStorage.getItem('genres');
        const savedTime = localStorage.getItem('genresTimestamp');

        // 만약 로컬 스토리지에 데이터가 있고, 저장된 시간 이후 1시간 이상 경과했으면 다시 API 요청
        const currentTime = new Date().getTime();
        const dataIsExpired = savedTime && currentTime - savedTime > 3600000; // 1시간

        if (savedGenres && !dataIsExpired) {
            // 데이터가 유효하면 로컬 스토리지에서 불러옴
            setGenres(JSON.parse(savedGenres));
            setLoading(false);
        } else {
            // 데이터가 없거나 만료되었으면 API 호출
            const fetchGenres = async () => {
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${savedTMDbKey}&language=ko`, {
                        headers: {
                            Accept: 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch genres');
                    }

                    const data = await response.json();
                    const genreData = data.genres;

                    // 로컬 스토리지에 데이터 저장 (만료 시간도 함께 저장)
                    localStorage.setItem('genres', JSON.stringify(genreData));
                    localStorage.setItem('genresTimestamp', currentTime.toString()); // 타임스탬프 저장

                    setGenres(genreData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching genres:', error);
                    setError('장르 정보를 불러오는 데 실패했습니다.');
                    setLoading(false);
                }
            };

            fetchGenres();
        }
    }, []);

    return (
        <GenreContext.Provider value={{ genres, loading, error }}>
            {children}
        </GenreContext.Provider>
    );
};
