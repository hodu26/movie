import { useState, useEffect, createContext, useContext } from 'react';
import { fetchData } from 'utils/dataLoad';

const GenreContext = createContext();

export const useGenres = () => useContext(GenreContext);

export const GenreProvider = ({ children }) => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

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
                const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${savedTMDbKey}&language=ko`;
                const data = await fetchData(url, "장르");
            
                if (data !== null) {
                    // 데이터가 성공적으로 로드되었을 때
                    localStorage.setItem('genres', JSON.stringify(data.genres));
                    localStorage.setItem('genresTimestamp', currentTime.toString());
                }
            
                setGenres(data.genres);
                setLoading(false);
            };

            fetchGenres();
        }
    }, []);

    return (
        <GenreContext.Provider value={{ genres, loading }}>
            {children}
        </GenreContext.Provider>
    );
};
