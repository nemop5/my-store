import { RedisClientType, createClient } from "@redis/client";
import { getEnvironmentConfig } from "../environment/environment.config";

const { expirationTime: defaultExpirationTime, url } = getEnvironmentConfig().redis;

let redisInstance: RedisClientType;

export async function getRedisInstance(): Promise<RedisClientType> {
  if (!redisInstance) {
    redisInstance = createClient({url, password: "redis", socket: { host: 'redis', port: 6379}});

    redisInstance.on("error", (err) => {
      throw new Error(err);
    });
    await redisInstance.connect();
  }

  return redisInstance;
}

export async function cached<T>(key: string, getValue: () => Promise<T>, expirationTime?: number): Promise<T> {
  const cache = await getRedisInstance();
  const data = await cache.get(key);

  if (data !== null) {
    return JSON.parse(data);
  }

  const fetchedData = await getValue();

  await cache.setEx(key, expirationTime || +defaultExpirationTime!, JSON.stringify(fetchedData));
  return fetchedData;
}
