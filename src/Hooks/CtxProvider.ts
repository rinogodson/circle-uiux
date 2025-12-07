import useCtx from "./ctxHook";
import ctxSchema from "./schemaAndData";

const useProvider = () => {
  const c = useCtx(ctxSchema);

  return c;
};

export default useProvider;
