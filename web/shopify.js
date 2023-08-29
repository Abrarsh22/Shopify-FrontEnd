import { LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";
import { MySQLSessionStorage } from "@shopify/shopify-app-session-storage-mysql";
import dotenv from 'dotenv';
dotenv.config();

const sessionStorageMySQL = MySQLSessionStorage.withCredentials(
  "localhost",
  "formdb_stage",
  "formdbstageuser",
  "U49npW7jn^eW"
);

const shopify = shopifyApp({
  api: {
    hostScheme: 'https',
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  sessionStorage: sessionStorageMySQL,
});

export default shopify;