const removeFalseyValues = (obj: Record<string, any>) => Object.fromEntries(
  Object.entries(obj).filter(([_, value]) => Boolean(value)),
);

export default removeFalseyValues;
