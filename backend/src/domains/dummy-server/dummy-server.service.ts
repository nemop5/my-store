import { DummyCarts, DummyProducts } from "./dummy-server.model";
import { dummyServerRepository } from "./dummy-server.repository";

interface DummyServerService {
  getDummyProducts(skip?: number, limit?: number, search?: string): Promise<DummyProducts | undefined>;
  getDummyCarts(skip?: number, limit?: number, search?: string): Promise<DummyCarts | undefined>;
}
async function getDummyProducts(skip?: number, limit?: number, search?: string) {
  const dummyProducts = await dummyServerRepository.getDummyProducts();
  return dummyProducts;
}

async function getDummyCarts(skip?: number, limit?: number, search?: string) {
  const dummyCarts = await dummyServerRepository.getDummyCarts();
  return dummyCarts;
}


export const dummyServerService: DummyServerService = {
  getDummyProducts,
  getDummyCarts,
};
