import axios from 'axios';

 
    export const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?unitID=1'
           
        );

        return response.data

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } 