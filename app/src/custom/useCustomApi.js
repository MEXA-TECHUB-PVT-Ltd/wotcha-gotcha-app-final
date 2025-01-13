// import { useState, useEffect, useMemo } from 'react';

// const useCustomApi = ({ url, params = {}, authToken = '', dataKey = 'data' }) => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const apiUrl = useMemo(() => {
//     const queryParams = new URLSearchParams({ page, ...params }).toString();
//     return `${url}?${queryParams}`;
//   }, [url, params, page]);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await fetch(apiUrl, {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP Error: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('result000000000000000000  ', result)
//         const responseData = result[dataKey] || [];

//         if (Array.isArray(responseData)) {
//           setData((prev) => (page === 1 ? responseData : [...prev, ...responseData]));
//           setHasMore(responseData.length > 0);
//         } else {
//           setHasMore(false);
//         }
//       } catch (err) {
//         setError(err.message || 'Something went wrong');
//         setHasMore(false);
//       }

//       setLoading(false);
//     };

//     fetchData();
//   }, [apiUrl]);

//   return { data, loading, error, hasMore, setPage, setData };
// };

// export default useCustomApi;










const apiCall = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
          ...(options.headers || {}),
        },
        body: options.body ? JSON.stringify(options.body) : null,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error(`API call error for ${url}:`, error.message);
      throw error;
    }
  };
  
  export default apiCall;
  