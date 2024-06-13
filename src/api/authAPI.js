import axios from "axios";
import { toast } from "react-toastify";


export const api = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
});


const accessToken = localStorage.getItem('accessToken');

export const registerAPI = async ( {id, password, nickname }) => {
  try {
    const response = await api.post('/register', {
      id, 
      password,
      nickname,
    });
  
    return response;
  } catch(error) {
    console.error("Signup error:", error?.response?.data?.message);
   // alert('회원가입에 오류가 발생했습니다. 다시 시도해 주세요');
    toast.error(error?.response?.data?.message )
  }
}

export const loginAPI = async ( {id, password } ) => {
  try {
    const response = await api.post('/login?expiresIn=30m',
      {
        id,
        password,
      }
    );
    
    return response;
  } catch(error) {
    console.error("Signup error:", error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
}

export const getUserInfoAPI = async () => {
  if(accessToken) {
    try {
      const response = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
  
      return response;
    } catch (error) {
      console.error("토큰 확인 오류:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      localStorage.removeItem('accessToken');
    }
  }
}

export const updateProfileAPI = async (formData) => {
  try {
    const response = await api.patch('/profile', formData, {
      headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${accessToken}`
      } 
    })

    return response;
  } catch(error) {
    console.error("프로필 정보 업데이트 오류:", error?.response?.data?.message);
    toast.error(error?.response?.data?.message);
  }
}