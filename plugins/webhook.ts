import axios from "axios";
import { TestResult } from "../src/functions/watch";
import { webhookConfig } from "./webhook.config";

export interface IPayload {
    token0: string;
    token1: string;
    token0Address: string;
    token1Address: string;
    prices: {
        uniswap: number;
        sushiswap: number;
    }
    pathOfExecution: string[];
    loanTestInput: number[];
    test: number[];
}

export function webhookCall(payload: TestResult[]) {
    axios.post(webhookConfig.webhookEndpoint, {payload: payload} ,{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        
    })
}