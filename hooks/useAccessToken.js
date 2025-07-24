import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthToken = (key = 'access_token') => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Đặt trạng thái tải thành true khi bắt đầu lấy dữ liệu
        setLoading(true);
        // Xóa lỗi nếu có từ lần trước
        setError(null); 

        // Lấy token từ AsyncStorage
        const storedToken = await AsyncStorage.getItem(key);
        
        // Cập nhật trạng thái token
        setToken(storedToken);
      } catch (e) {
        // Xử lý lỗi nếu có vấn đề trong quá trình lấy dữ liệu
        console.error("Failed to fetch token from AsyncStorage:", e);
        setError(e);
      } finally {
        // Đặt trạng thái tải thành false dù thành công hay thất bại
        setLoading(false);
      }
    };

    fetchToken();
  }, [key]); // Dependency array: chạy lại effect khi 'key' thay đổi

  // Trả về token, trạng thái tải và lỗi để các component có thể sử dụng
  return { token, loading, error };
};

export default useAuthToken;