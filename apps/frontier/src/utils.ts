export const sleep = async (time = 1000) =>
  new Promise(resolve => setTimeout(resolve, time));