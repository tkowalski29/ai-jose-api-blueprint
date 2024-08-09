…nc_id_symbol)]: 8541,
  [Symbol(trigger_async_id_symbol)]: 8539,
  [Symbol(kResourceStore)]: {
    url: URL {
      href: 'https://ai-jose-api.vercel.app/api/mobile/jose',
      origin: 'https://ai-jose-api.vercel.app',
      protocol: 'https:',
      username: '',
      password: '',
      host: 'ai-jose-api.vercel.app',
      hostname: 'ai-jose-api.vercel.app',
      port: '',
      pathname: '/api/mobile/jose',
      search: '',
      searchParams: URLSearchParams {},
      hash: ''
    },
    requestId: '7',
    invocationId: 'a435ada1-c198-4806-821c-1a2f314f71e4',
    serverId: '4f86be93-2356-4c32-8e94-66ade1719f9d',
    n1RequestId: undefined,
    vercelId: 'cdg1::g4s77-1723212523387-4c38cae616df',
    intraSession: '3.dVBBR0N0a2Q2ME5jOXdmcrkFKbQk8+fOVcNOQoF7+jA8/4QvXo4IPUiP0TpSQrno'
  },
  [Symbol(kResourceStore)]: {
    waitUntil: [Function: bound ],
    url: 'https://ai-jose-api.vercel.app/api/mobile/jose',
    flags: {
      getValues: [Function: getValues],
      reportValue: [Function: reportValue]
    },
    headers: {
      'x-vercel-ip-longitude': '-0.7919',
      forwarded: 'for=176.98.215.34;host=ai-jose-api.vercel.app;proto=https;sig=0QmVhcmVyIDY4M2VhMDEwNjIwNzI2ZGM0ODU5Yjk4OTZhNGI1YjYzMDgzMzY5ODJhZTQwYjk1ZDFhOTJiZTcxNjYzMmJjYjI=;exp=1723212823',
      'x-vercel-id': 'cdg1::g4s77-1723212523387-4c38cae616df',
      'x-vercel-ja4-digest': 't13d181200_5d04281c6031_02c8e53ee398',
      'cache-control': 'no-cache',
      'x-vercel-deployment-url': 'ai-jose-eths21j4i-tkowalskis-projects.vercel.app',
      'x-vercel-ip-country-region': 'MC',
      'accept-encoding': 'gzip, deflate, br',
      'x-vercel-ip-as-number': '200845',
      'x-vercel-ip-continent': 'EU',
      'x-vercel-ip-city': 'San%20Pedro%20del%20Pinatar',
      'x-vercel-ip-latitude': '37.8372',
      host: 'ai-jose-api.vercel.app',
      'x-forwarded-proto': 'https',
      'x-vercel-ip-timezone': 'Europe/Madrid',
      'content-length': '1039',
      'x-vercel-forwarded-for': '176.98.215.34',
      accept: '*/*',
      'x-vercel-proxied-for': '176.98.215.34',
      'user-agent': 'PostmanRuntime/7.41.0',
      'x-forwarded-for': '176.98.215.34',
      'x-forwarded-host': 'ai-jose-api.vercel.app',
      'x-vercel-ip-country': 'ES',
      'content-type': 'application/json',
      'postman-token': '46e7d49f-fa78-4ebb-9467-83d84ccb317b',
      'x-real-ip': '176.98.215.34',
      'x-vercel-proxy-signature': 'Bearer 683ea010620726dc4859b9896a4b5b6308336982ae40b95d1a92be716632bcb2',
      'x-vercel-proxy-signature-ts': '1723212823',
      'x-vercel-internal-invocation-id': 'a435ada1-c198-4806-821c-1a2f314f71e4',
      connection: 'close'
    }
  },
  [Symbol(kResourceStore)]: undefined
}
SyntaxError: Unexpected token 'o', "[object Promise]" is not valid JSON
    at JSON.parse (<anonymous>)
    at BinaryLLM.<anonymous> (/vercel/path0/src/internal/ai/llm/binary.ts:40:41)
    at Generator.next (<anonymous>)
    at fulfilled (/var/task/src/internal/ai/llm/binary.js:28:58)
Error processing request: SyntaxError: Unexpected token 'o', "[object Promise]" is not valid JSON
    at JSON.parse (<anonymous>)
    at BinaryLLM.<anonymous> (/vercel/path0/src/internal/ai/llm/binary.ts:40:41)
    at Generator.next (<anonymous>)
    at fulfilled (/var/task/src/internal/ai/llm/binary.js:28:58)
Unhandled Rejection: ReferenceError: exec is not defined
    at BinaryLLM.<anonymous> (/vercel/path0/src/internal/ai/llm/binary.ts:170:34)
    at Generator.next (<anonymous>)
    at /var/task/src/internal/ai/llm/binary.js:31:71
    at new Promise (<anonymous>)
    at __awaiter (/var/task/src/internal/ai/llm/binary.js:27:12)
    at BinaryLLM._BinaryLLM_executeFile (/var/task/src/internal/ai/llm/binary.js:186:12)
    at BinaryLLM.<anonymous> (/vercel/path0/src/internal/ai/llm/binary.ts:37:39)
    at Generator.next (<anonymous>)
    at fulfilled (/var/task/src/internal/ai/llm/binary.js:28:58)