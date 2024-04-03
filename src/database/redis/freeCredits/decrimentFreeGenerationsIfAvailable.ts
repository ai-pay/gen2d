import { redis } from "../redisClient";
import { freeCreditsKeyGen } from "./key";

const luaScript = `
local r=tonumber(redis.call('GET', KEYS[1]))
if r and r > 0 then
  redis.call('DECR', KEYS[1])
  return 1
else
  return 0
end
`;

export async function decrementFreeGenerationsIfAvailable(
  userId: string
): Promise<boolean> {

  return await redis.eval(luaScript, [freeCreditsKeyGen(userId)], []) as boolean;
}