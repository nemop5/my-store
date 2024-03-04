import { DummyProducts, DummyCarts } from "./dummy-server.model";
import { getEnvironmentConfig } from "../../environment/environment.config";

const axios = require("axios");

const { url } = getEnvironmentConfig().dummyServer;

const dummy_product_api_url = `${url}/products?limit=0`;
const dummy_carts_api_url = `${url}/carts?limit=0`;

interface DummyServerRepository {
  getDummyProducts(): Promise<DummyProducts | undefined>;
  getDummyCarts(): Promise<DummyCarts | undefined>;
}

export async function getDummyProducts(): Promise<DummyProducts | undefined> {
  try {
    const { data } = await axios.get(dummy_product_api_url);
    return data;
  } catch (error) {
    console.log("Dummy server API error", error);
    return undefined;
  }
}

export async function getDummyCarts(): Promise<DummyCarts | undefined> {
  try {
    const { data } = await axios.get(dummy_carts_api_url);
    return data;
  } catch (error) {
    console.log("Dummy server API error", error);
    return undefined
  }
}

export const dummyServerRepository: DummyServerRepository = {
  getDummyProducts,
  getDummyCarts,
};
