interface fetchPostProps extends RequestInit {
   parens: string;
}

export function configFetch(obj: RequestInit | undefined = undefined) {
   return {
      headers: obj?.headers ?? { 'Content-Type': 'application/json' },
      credentials: obj?.credentials ?? 'include',
      ...obj,
   };
}
