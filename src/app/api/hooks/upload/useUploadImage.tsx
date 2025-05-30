import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import apiClient from '../../apiClient';
import API_ENDPOINTS from '../../endpoints';

interface UploadResponse {
  message: string;
  name: string;
  type: string;
  downloadURL: string;
}

interface UploadPayload {
  file: File;
}

const useUploadFile = () => useMutation<UploadResponse, Error, UploadPayload>({
  mutationFn: async ({ file }: UploadPayload) => {
    const formData = new FormData();
    formData.append('filename', file);

    const response = await apiClient.post<
    UploadResponse,
    AxiosResponse<UploadResponse>
    >(API_ENDPOINTS.STORAGE.UPLOAD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
});

export default useUploadFile;
