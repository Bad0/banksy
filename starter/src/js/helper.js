import { TIMEOUT_SEC } from "./config.js";

function timeout(sec) {
  return new Promise(function (_, rej) {
    setTimeout(() => {
      rej(new Error(`Request took too long! Timeout after ${sec} second`));
    }, 1000 * sec);
  });
}

export async function getJSON(url) {
  try {
    const fetchPro = fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (error) {
    throw error;
  }
}
