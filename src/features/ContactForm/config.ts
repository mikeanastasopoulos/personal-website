import { siteConfig } from "@/seo/siteConfig";

export const CONTACT_FORM_CONFIG = {
  // Web3Forms routes mail to the inbox linked to the access key.
  recipientEmail: siteConfig.email,
  accessKey: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "",
  endpoint: "https://api.web3forms.com/submit",
} as const;
