import Token from "./Token";

export const WETH = new Token('Wrapped Ether', 18, 'WETH', '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
export const LINK = new Token('Chainlink', 18, 'LINK', '0x514910771af9ca656af840dff83e8264ecf986ca');
export const DAI  = new Token('DAI', 18, 'DAI', '0x6b175474e89094c44da98b954eedeac495271d0f');
export const YFI  = new Token('yearn.finance', 18, 'YFI', '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e');
export const FTM  = new Token('Fantom Token', 18, 'FTM', '0x4e15361fd6b4bb609fa63c81a2be19d873717870');
export const BAND = new Token('Band Token', 18, 'BAND', '0xba11d00c5f74255f56a5e366f4f77f5a186d7f55');
export const COMP = new Token('Compound', 18, 'COMP', '0xc00e94cb662c3520282e6f5717214004a7f26888');
export const AAVE = new Token('AAVE', 18, 'AAVE', '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9');
export const MANA = new Token('Decentraland', 18 ,'MANA', '0x0f5d2fb29fb7d3cfee444a200298f468908cc942');
export const WBTC = new Token('Wrapped BTC', 18, 'WBTC', '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599');
export const UNI  = new Token('Uniswap', 18, 'UNI', '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984');

export const watchPair = [
    [WETH, LINK],
    [WETH, BAND],
    [WETH, DAI],
    [WETH, YFI],
    [WETH, COMP],
    [WETH,AAVE],
    [WETH, MANA],
    [WETH, WBTC],
    [WETH, UNI],
]
