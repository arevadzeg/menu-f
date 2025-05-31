const removeFalseyValues = (obj: Record<string, any>) => Object.fromEntries(
  Object.entries(obj).filter(([, value]) => Boolean(value)),
);

export default removeFalseyValues;
