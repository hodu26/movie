import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * API 요청을 수행하고 응답 데이터를 반환하는 유틸 함수
 * @param {string} url - 호출할 API의 URL
 * @param {string} tag - tag
 * @returns {Object} - 성공 시 응답 데이터, 실패 시 에러 메시지 포함 객체
 */
export const fetchData = async (url, tag) => {
    let retryApi = Number(localStorage.getItem('retryApi'));

    // retryApi가 3보다 크면 API 요청을 중지
    if (retryApi > 3) {
        return null;
    }

    try {
        console.log(url)
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
                Accept: 'application/json',
            },
        });

        localStorage.setItem('retryApi', 0);
        return response.data; // 성공 응답
    } catch (error) {
        retryApi += 1;
        localStorage.setItem('retryApi', retryApi);

        console.error(`Error fetching data from ${tag}:`, error);
        toast.error(`${tag} 데이터를 가져오는 데 실패했습니다.`)
        return null; // 실패 응답
    }
};
