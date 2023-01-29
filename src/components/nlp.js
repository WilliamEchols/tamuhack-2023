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
            {text: 'Why This May Be A \'Life Changing\' Market Rally; Apple, Fed Meeting Loom As Tesla Run Hits 75%', label: 'good'},
            {text: 'Amazon, Apple, Alphabet Headline Another Busy Earnings Week', label: 'good'},
            {text: 'Apple Takes The Cake Again In China As Top Smartphone Seller Amid Odds', label: 'good'},
            {text: 'Goldman Sachs’ David Solomon latest CEO hit with pay cut', label: 'bad'},
            {text: 'Apple Stock Climbs Off Lows As Earnings Optimism Builds: 3 Other FAANG Stocks Dominate Earnings Calendar', label: 'bad'},
            {text: 'Apple Avoids Layoffs Hitting the Rest of Tech, for Now', label: 'good'},
            {text: 'Man Who Predicted Lehman Crash Makes New Warning', label: 'bad'},
            {text: 'Apple Could Be Headed for Down Sales Year in Fiscal 2023, Bernstein Analyst Contends', label: 'bad'},
            {text: 'Elon Musk Cautions Fed On Further Interest Rate Hikes: \'Quite A Serious Danger\' Of Crushing Stock Market', label: 'bad'},
            {text: 'Nancy Pelosi Lost Big Money on These Stocks — Here Are The Ones To Avoid', label: 'bad'}
          ],
          truncate: 'END'
        }
    };

    let value = axios
        .request(cohereOptions)
        .then(async function (response) {
            console.log(response.data);
            let confidenceArray = await response.data['classifications'].map(item => item['confidence'] * (item['prediction'] === 'good' ? 1 : -1) + (item['prediction'] === 'good' ? 0 : 1) );
            var overall = confidenceArray.reduce((partialSum, a) => partialSum + a, 0);
            return await (overall / newsHeadlineArray.length) * 200;
        })
        .catch(function (error) {
            console.error(error);
        });
    return value;
  }

export default classifyNews;