import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * API 요청을 수행하고 응답 데이터를 반환하는 유틸 함수
 * @param {string} url - 호출할 API의 URL
 * @param {string} tag - tag
 * @returns {Object} - 성공 시 응답 데이터, 실패 시 에러 메시지 포함 객체
 */
export const fetchData = async (url, tag) => {
    try {
        console.log(url)
        const response = await axios.get(url, {
            headers: {
                Accept: 'application/json',
            },
        });
        return response.data; // 성공 응답
    } catch (error) {
        console.error(`Error fetching data from ${tag}:`, error);
        toast.error(`${tag} 데이터를 가져오는 데 실패했습니다.`)
        return null; // 실패 응답
    }
};
