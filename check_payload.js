import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CHUNK_SIZE = 16;

export function spliceIntoChunks(arr, chunkSize = CHUNK_SIZE) {
  const res = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, chunkSize);
    res.push(chunk);
  }
  return res;
}

const providerEnv = process.env.NETWORK_PROVIDER || "TestNet";
const tokenB = Number(process.env.TOKEN_B || 1);
const distAmt = Number(process.env.DISTRIBUTION || 1);
const algodEndpoint = process.env.ALGOD || "";
const mn = process.env.MNEMONIC || "";

// ALGO API

let algoexplorerapi_endpoint;
let algoexplorer;
let indexer_endpoint;
if (providerEnv === "MainNet") {
  algoexplorerapi_endpoint = "https://algoexplorerapi.io";
  algoexplorer = "https://algoexplorer.io";
  indexer_endpoint = "https://algoindexer.algoexplorerapi.io";
} else {
  algoexplorerapi_endpoint = "https://testnet.algoexplorerapi.io";
  algoexplorer = "https://testnet.algoexplorer.io";
  indexer_endpoint = "https://algoindexer.testnet.algoexplorerapi.io";
}

export const getHolders = async (assetIndex, params = {}) =>
  (
    await axios.get(`${indexer_endpoint}/v2/accounts`, {
      params: {
        ...params,
        "asset-id": assetIndex,
      },
    })
  )?.data;

export const getTransactions = async (params = {}) =>
  (await axios.get(`${indexer_endpoint}/v2/transactions`, { params }))?.data;

export const getBlock = async (block) =>
  (await axios.get(`${indexer_endpoint}/v2/blocks/${block}`))?.data;

export const getAccountInfo = async (addr) =>
  (await axios.get(`${indexer_endpoint}/v2/accounts/${addr}`))?.data;

export const getAssetInfo = async (assetId) =>
  (await axios.get(`${indexer_endpoint}/v2/assets/${assetId}`))?.data;
