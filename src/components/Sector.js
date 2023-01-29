import classifyNews from './nlp';

const sectorObj = { 'real-estate': [] } // stocks, bonds, crypto, real estate
const subSectorsObj = { 'energy' : ['XOM', 'CVX', 'SHEL', 'COP', 'NEE'], 'materials': ['LIN', 'APD', 'FCX', 'SHW', 'ECL'], 'industrials' : ['HON', 'CAT', 'BA', 'UNP'], 'utilities': ['NEE', 'DTE', 'DUK', 'D', 'ETR'], 'healthcare': ['UNH', 'MCK', 'CVS', 'SGFY', 'CNC'], 'financials': ['GS', 'JPM', 'MA', 'MS', 'V'], 'consumer-discretionary' : ['DIS', 'NKE', 'CMCSA', 'NFLX', 'SONY'], 'consumer-staples': ['PG', 'KO', 'PEP', 'PM', 'DEO'], 'information-technology': ['AAPL', 'MSFT', 'GOOG', 'AMZN'], 'communications': ['TMUS', 'CMCSA', 'VZ', 'TTM'] } // subcategories of stocks

function Sector() {
  return (
    <>
    </>
  );
}

export default Sector;
