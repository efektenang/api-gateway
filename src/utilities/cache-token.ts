interface ICacheToken {
    gateway: { SERVICE_ID: string; };
  }
  
  const cacheToken = {
    gateway: "APIGATEWAY@$SERVICE_ID"
  };
  
  export default function getCacheToken<T extends keyof typeof cacheToken>(
    obj: keyof typeof cacheToken,
    params: ICacheToken[T] | {} = {}
  ) {
    return cacheToken[obj].replace(
      /\$+[a-zA-Z0-9_-]+/g,
      (m) => params[m.replace(/[^a-zA-Z0-9_-]+/g, "")]
    );
  }
  