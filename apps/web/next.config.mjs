// import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheMaxMemorySize: 0,


  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
},

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  experimental: {
    serverComponentsExternalPackages: ['pg'],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com' },
      { hostname: 'github.com' },
      { hostname: 'gincana.a72a6f120019167e519d34db3c3c75b5.r2.cloudflarestorage.com' },
      { hostname: 'localhost' },
      { hostname: 'test-scout-portal.a72a6f120019167e519d34db3c3c75b5.r2.cloudflarestorage.com' },
    ],
  },

  /**
   * @param {import('webpack').Configuration} config
   */
  webpack: (config, { isServer }) => {
    /**
     * Suppress warning about not found modules
     */
    config.resolve.fallback = {
      'aws-crt': false,
      encoding: false,
      '@aws-sdk/signature-v4-crt': false,
      bufferutil: false,
      'utf-8-validate': false,
      bcrypt: false,
    }

    // if (isServer) {
    //   config.plugins = [...config.plugins, new PrismaPlugin({
    //     from: 'teste'
    //   })]
    // }

    return config
  },
}

export default nextConfig
