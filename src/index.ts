export default <T>(
  fn: () => T
): T extends Promise<infer U> ? Promise<U | null> : T | null => {
  try {
    const result = fn();
    if (result && typeof result === 'object' && 'then' in result) {
      const promise = result as never as Promise<never>;
      return promise.then(null, () => null) as never;
    }
    return result as never;
  } catch {
    return null as never;
  }
};
