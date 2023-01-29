import axios from "axios";

import classifyNews from './nlp';

const sectorObj = { 'real-estate': [] } // stocks, bonds, crypto, real estate
const subSectorsObj = { 'energy' : ['XOM', 'CVX', 'SHEL', 'COP', 'NEE'], 'materials': ['LIN', 'APD', 'FCX', 'SHW', 'ECL'], 'industrials' : ['HON', 'CAT', 'BA', 'UNP'], 'utilities': ['NEE', 'DTE', 'DUK', 'D', 'ETR'], 'healthcare': ['UNH', 'MCK', 'CVS', 'SGFY', 'CNC'], 'financials': ['GS', 'JPM', 'MA', 'MS', 'V'], 'consumer-discretionary' : ['DIS', 'NKE', 'CMCSA', 'NFLX', 'SONY'], 'consumer-staples': ['PG', 'KO', 'PEP', 'PM', 'DEO'], 'information-technology': ['AAPL', 'MSFT', 'GOOG', 'AMZN'], 'communications': ['TMUS', 'CMCSA', 'VZ', 'TTM'] } // subcategories of stocks

const sentimentByTicker = (ticker) => {
    const newsAPI = {
        method: 'GET',
        url: 'https://fidelity-investments.p.rapidapi.com/news/list-top',
        params: {symbol: ticker},
        headers: {
          'X-RapidAPI-Key': '18da6b6796mshef75c48f2dcd7f8p1dad5djsnd3d4c58dd378',
          'X-RapidAPI-Host': 'fidelity-investments.p.rapidapi.com'
        }
    };
    let value = axios.request(newsAPI).then(async function (newsResponse) {
        // classify news
        let newsArray = newsResponse.data['headlineResults'][0]['headline'].map(item => item['text']);
        var newsScore = await classifyNews(newsArray);
        return newsScore;

    }).catch(function (error) {
        console.error(error);
    });
    return value;
}

const sentimentBySector = async (sector) => {
    let sum = 0;
    for (let i = 0; i < subSectorsObj[sector].length; i++) {
        sum += await sentimentByTicker(subSectorsObj[sector][i])
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    //console.log(sum / subSectorsObj[sector].length)
    return sum / subSectorsObj[sector].length;
}

export default sentimentBySector;