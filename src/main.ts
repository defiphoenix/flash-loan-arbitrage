require("dotenv").config();
import { green, reset } from "./constants/colors/console";
import Token from "./constants/Token";
import { watchPair } from "./constants/tokens";
import watch from "./functions/watch";



console.log(green + '[app] starting update prices from Uniswap and Sushiswap in every 15 seconds.', reset);

setInterval(() => {
    console.log("performing tests at", new Date(Date.now()).toLocaleTimeString())
    watchPair.forEach((pair: Token[]) => {
        watch(pair[0], pair[1])
    })
}, 10000);




