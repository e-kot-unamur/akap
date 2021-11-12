const {
    PHASE_DEVELOPMENT_SERVER,
    PHASE_PRODUCTION_BUILD,
  } = require('next/constants')

const STRAPI_API_DOMAIN = "<your_domain_name>"
const STRAPI_API_PORT = "<your_api_port>"

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const env = {
    NEXT_PUBLIC_STRAPI_API_URL: (() => {
      if (isDev) return 'http://localhost:' + STRAPI_API_PORT
      if (isProd) {
        return 'http://' + STRAPI_API_DOMAIN + ':' + STRAPI_API_PORT
      }
      if (isStaging) return 'http://localhost:' + STRAPI_API_PORT
      return 'NEXT_PUBLIC_STRAPI_API_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })()
  }

  return {
    env,
    images: {
      domains: ['localhost', 'api-server', STRAPI_API_DOMAIN],
    }
  }
}
