import axios from "axios";

const classifyNews = (newsHeadlineArray) => {
    const cohereOptions = {
        method: 'POST',
        url: 'https://api.cohere.ai/classify',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer vN4sf6wAW4K9xDDSx0fUNDwz1NqHuYTVgMkj1Wx4'
        },
        data: {
          inputs: newsHeadlineArray,
          examples: [
            {text: 'Dermatologists don\'t like her!', label: 'bad'},
            {text: 'Hello, open to this?', label: 'bad'},
            {text: 'I need help please wire me $1000 right now', label: 'bad'},
            {text: 'Nice to know you ;)', label: 'bad'},
            {text: 'Please help me?', label: 'bad'},
            {text: 'Your parcel will be delivered today', label: 'good'},
            {text: 'Review changes to our Terms and Conditions', label: 'good'},
            {text: 'Weekly sync notes', label: 'good'},
            {text: 'Re: Follow up from today’s meeting', label: 'good'},
            {text: 'Pre-read for tomorrow', label: 'good'}
          ],
          truncate: 'END'
        }
    };

    let value = axios
        .request(cohereOptions)
        .then(async function (response) {
            //console.log(response.data);
            let confidenceArray = await response.data['classifications'].map(item => item['confidence'] * (item['prediction'] === 'good' ? 1 : -1) + (item['prediction'] === 'good' ? 0 : 1) );
            var overall = confidenceArray.reduce((partialSum, a) => partialSum + a, 0);
            return await (overall / newsHeadlineArray.length);
        })
        .catch(function (error) {
            console.error(error);
        });
    return value;
  }

export default classifyNews;