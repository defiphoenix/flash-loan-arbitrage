import { cyan, green, magenta, red, reset } from "../constants/colors/console";
import config, { arbitrageConfig } from "../constants/config";
import Exchange from "../constants/Exchange";
import Token from "../constants/Token";
import { BAND, COMP, DAI, FTM, LINK, WETH, YFI } from "../constants/tokens";
import web3 from "../providers/web3";
import Router from "./router";
import { webhookCall, IPayload } from '../../plugins/webhook';
export interface TestResult {
    pass: boolean;
    testcase: number;
    result: number;
    path:  number[];
    tokenPath: string[];
    token0: string,
    token1: string,
    token0Address: string,
    token1Address: string
    time: string
}

async function test(input: number, token0: Token, token1: Token, router0: Router, router1: Router): Promise<TestResult> {
    const Router0PredictionOutput = await router0.getAmountsOut(input, token0.address, token1.address);
    const Router0OutputToken = web3.utils.fromWei(Router0PredictionOutput[1]);
    const Router1PredictionOutput = await router1.getAmountsOut(Router0OutputToken, token1.address, token0.address);
    const Router1OutputToken = web3.utils.fromWei(Router1PredictionOutput[1]);
    const calculatedPrediction = parseFloat(Router1OutputToken) - (input) - (input*arbitrageConfig.flashLoanFee);
    return {
        pass: calculatedPrediction > 0 ? true : false,
        testcase: input,
        result: calculatedPrediction,
        path: [input, parseFloat(Router0OutputToken), parseFloat(Router1OutputToken)],
        tokenPath: [token0.symbol, token1.symbol, token0.symbol],
        token0: token0.symbol,
        token1: token1.symbol,
        token0Address: token0.address,
        token1Address: token1.address,
        time: new Date(Date.now()).toLocaleTimeString()
    }
}

async function watch(Token0: Token, Token1: Token) {

    const Uniswap = new Exchange('Uniswap', config.UniswapV2RouterAddress);
    const Sushiswap = new Exchange('Sushiswap', config.SushiswapRouterAddress);

    let Ex0: Exchange | null = null;
    let Ex1: Exchange | null = null;

    const UniswapV2Router02 = new Router(config.UniswapV2RouterAddress);
    const SushiswapRouter = new Router(config.SushiswapRouterAddress);

    const UniswapOutput = await UniswapV2Router02.priceOf(
        Token1.address,
        Token0.address
    )

    const SushiswapOutput = await SushiswapRouter.priceOf(
        Token1.address,
        Token0.address
    )
    const PriceOfUniswapPair = parseFloat(web3.utils.fromWei(UniswapOutput[1]));
    const PriceOfSushiswapPair = parseFloat(web3.utils.fromWei(SushiswapOutput[1]));

    if (PriceOfUniswapPair > PriceOfSushiswapPair) {
        Ex0 = Sushiswap;
        Ex1 = Uniswap;
    }
    else {
        Ex0 = Uniswap;
        Ex1 = Sushiswap;
    }

    // Arbitrage Prediction 

    const Router0 = new Router(Ex0.address);
    const Router1 = new Router(Ex1.address);

    const results: TestResult[] = []
    const passResult: TestResult[] = []

    for (var i=0; i<arbitrageConfig.loanTest.length; i++) {
        let testResult = await test(arbitrageConfig.loanTest[i], Token0, Token1, Router0, Router1);
        results.push(testResult);
        console.log((testResult.pass ? green : red)+`[${testResult.pass ? '*' : '!'}] ${testResult.tokenPath[0]}/${testResult.tokenPath[1]} ${testResult.pass ? 'pass' : 'fail'}`, reset, testResult.result, testResult.tokenPath[0]);   
        if (testResult.pass) {
            passResult.push(testResult);
            console.log()
            // console.log(passResult);
        }
        else {
            
        }
        if (passResult.length > 0) {
            // webhookCall(passResult);
        }
        // webhookCall(results);
    }

    // console.log();
    // console.log(magenta, '[Uniswap]   ' ,reset ,`1 ${Token1.symbol} = ${PriceOfUniswapPair} ${Token0.symbol}`);
    // console.log(cyan, '[Sushiswap] ' ,reset ,`1 ${Token1.symbol} = ${PriceOfSushiswapPair} ${Token0.symbol}`);
    // console.log();
    // console.log(
    //     `AAVE -> ${Ex0.name} -> ${Ex1.name} -> AAVE`
    // )
    // console.log(results)
    // console.log("========================================================================")
    
    // console.log((arbitrageConfig.loan*arbitrageConfig.flashLoanFee))
    
    // console.log(
    //     `${arbitrageConfig.loan} ${Token0.symbol} -> ${Router0OutputToken} ${Token1.symbol} -> ${Router1OutputToken} ${Token0.symbol}`
    // )
    // console.log(green, `Predicted arbitrage performance is ${calculatedPrediction} ${Token0.symbol}`);
    // console.log();

}
export default watch;