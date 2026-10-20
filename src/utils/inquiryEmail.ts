/**
 * Centralized Inquiry Email Utility for Zest Enterprises
 * Opens the user's native email client directly addressed to zestenterprises21@gmail.com
 * with structured subject line and body details.
 */

export interface EmailInquiryOptions {
  productTitle?: string;
  sku?: string;
  referencePrice?: number;
  category?: string;
  quantity?: string;
  fullName?: string;
  organization?: string;
  phone?: string;
  customMessage?: string;
  shortlistedItems?: Array<{ title: string; sku: string; price: number }>;
}

export const sendInquiryEmail = (options: EmailInquiryOptions = {}) => {
  const recipient = 'zestenterprises21@gmail.com';

  let subject = 'Wholesale & Supply Inquiry - Zest Enterprises';
  let body = '';

  if (options.shortlistedItems && options.shortlistedItems.length > 0) {
    subject = `Bulk Inquiry for Shortlisted Items (${options.shortlistedItems.length} Products) - Zest Enterprises`;
    const itemsList = options.shortlistedItems
      .map((item, idx) => `${idx + 1}. ${item.title} (SKU: ${item.sku}) - Ref Price: ₹${item.price}`)
      .join('\n');

    body = `Hello Zest Enterprises Team,

I would like to request an itemized quotation, wholesale bulk pricing, and delivery timeline for the following shortlisted products from your catalog:

--- SHORTLISTED PRODUCTS ---
${itemsList}

--- INQUIRER DETAILS ---
Organization / School / Firm: ${options.organization || '[Please enter your organization name]'}
Contact Person: ${options.fullName || '[Your Name]'}
Contact Phone / WhatsApp: ${options.phone || '[Your Phone Number]'}
Estimated Quantity / Order Size: ${options.quantity || '[e.g. 50 units, 200 units, custom batch]'}

Additional Requirements / Custom Branding (Logo printing, engraving, packaging):
${options.customMessage || '[Specify any custom logo branding, GST invoicing, or delivery location requirements]'}

Thank you!`;
  } else if (options.productTitle) {
    subject = `Product Inquiry: ${options.productTitle} (SKU: ${options.sku || 'N/A'}) - Zest Enterprises`;
    body = `Hello Zest Enterprises Team,

I would like to inquire about specifications, wholesale availability, tiered bulk pricing, and sample delivery for the following product:

Product Name: ${options.productTitle}
SKU: ${options.sku || 'N/A'}
${options.referencePrice ? `Reference Price: ₹${options.referencePrice}\n` : ''}${options.category ? `Category: ${options.category}\n` : ''}
--- MY REQUIREMENTS ---
Estimated Quantity: ${options.quantity || '[e.g., 25 units, 100 units, sample piece]'}
Organization / Firm Name: ${options.organization || '[Your company, school, or firm name]'}
Contact Person: ${options.fullName || '[Your Name]'}
Contact Phone / WhatsApp: ${options.phone || '[Your Phone Number]'}

Inquiry Message:
${options.customMessage || 'Please share detailed spec sheets, delivery lead time, and bulk discount slabs.'}

Thank you!`;
  } else {
    subject = 'General Wholesale, Catalog & Corporate Supplies Inquiry - Zest Enterprises';
    body = `Hello Zest Enterprises Team,

I am reaching out regarding institutional procurement and wholesale supply from Zest Enterprises ("For All Your Supply Needs — You name it, We have it").

--- REQUIREMENT OVERVIEW ---
Categories of Interest: [ ] Stationeries  [ ] Office Supplies  [ ] School Supplies  [ ] Art Supplies  [ ] Craft Materials  [ ] Corporate Gifting
Estimated Requirement / Order Size: ${options.quantity || '[e.g., Monthly office supply, Annual school stationery, Corporate onboarding kits]'}
Organization / Institution: ${options.organization || '[Your Company / School / Institution Name]'}
Contact Person: ${options.fullName || '[Your Name]'}
Contact Phone / WhatsApp: ${options.phone || '[Your Phone Number]'}

Specific Items / Query:
${options.customMessage || 'Please share your complete product catalog, wholesale price list, and institutional terms.'}

Thank you!`;
  }

  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Trigger email client directly
  window.location.href = mailtoUrl;
};
