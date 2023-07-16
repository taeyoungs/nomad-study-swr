type BaseQueryParamType = Record<string, string> | URLSearchParams | string | string[][];

const get = async <QueryParamType extends BaseQueryParamType>(
  url: string,
  queryParams?: QueryParamType
) => {
  const newUrl = queryParams ? `${url}?${new URLSearchParams(queryParams)}` : url;

  const response = await fetch(newUrl, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

const patch = async <BodyType, QueryParamType extends BaseQueryParamType>(
  url: string,
  { body, queryParams }: { body?: BodyType; queryParams?: QueryParamType }
) => {
  const newUrl = queryParams ? `${url}?${new URLSearchParams(queryParams)}` : url;

  const response = await fetch(newUrl, {
    body: JSON.stringify(body),
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { get, patch };
