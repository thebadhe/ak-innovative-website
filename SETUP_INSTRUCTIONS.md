# AK INNOVATIVE ENTERPRISES - Website Setup Instructions

## 📋 Table of Contents
1. [Google Sheets Integration Setup](#google-sheets-integration-setup)
2. [Email Notification Setup](#email-notification-setup)
3. [Deployment Instructions](#deployment-instructions)
4. [Testing the Website](#testing-the-website)

---

## 🔧 Google Sheets Integration Setup

The contact form is configured to save submissions to Google Sheets AND send email notifications. Follow these steps:

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "AK Innovative - Contact Form Submissions"
4. In the first row, add these column headers:
   - `Timestamp` (Column A)
   - `Name` (Column B)
   - `Company` (Column C)
   - `Phone` (Column D)
   - `Email` (Column E)
   - `Message` (Column F)

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Append data to sheet
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.company,
      data.phone,
      data.email,
      data.message
    ]);
    
    // Send email notification
    sendEmailNotification(data);
    
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendEmailNotification(data) {
  // Email configuration
  var recipientEmail = "thebadhe3p@gmail.com";
  var subject = "New Contact Form Submission - AK INNOVATIVE ENTERPRISES";
  
  // Email body
  var body = "You have received a new contact form submission:\n\n" +
             "Name: " + data.name + "\n" +
             "Company: " + data.company + "\n" +
             "Phone: " + data.phone + "\n" +
             "Email: " + data.email + "\n" +
             "Message: " + data.message + "\n\n" +
             "Submitted on: " + data.timestamp;
  
  // Send email
  MailApp.sendEmail(recipientEmail, subject, body);
}
```

4. Click **Save** (disk icon)
5. Name your project "Contact Form Handler"

### Step 3: Deploy the Script

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - Description: "Contact Form API"
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**
6. **IMPORTANT**: Copy the Web App URL (it will look like: `https://script.google.com/macros/s/...`)
7. Click **Done**

### Step 4: Update the Website Code

1. Open `src/js/main.js`
2. Find this line (around line 137):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL
4. Uncomment the fetch code block (lines 150-163)
5. Comment out or remove the placeholder code (lines 142-147)

### Step 5: Test the Integration

1. Open your website
2. Go to the Contact page
3. Fill out and submit the form
4. Check your Google Sheet - the data should appear
5. Check your email (thebadhe3p@gmail.com) - you should receive a notification

---

## 📧 Alternative: EmailJS Setup (Optional)

If you prefer using EmailJS instead of Google Sheets:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Add EmailJS SDK to your HTML files:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
6. Update the form submission code in `main.js`

---

## 🚀 Deployment Instructions

### Option 1: Deploy to Netlify (Recommended)

1. Create a [Netlify](https://www.netlify.com/) account
2. Drag and drop the `public` folder to Netlify
3. Configure custom domain (optional)
4. Your site is live!

### Option 2: Deploy to GitHub Pages

1. Create a GitHub repository
2. Upload all files from the `public` folder
3. Go to Settings → Pages
4. Select branch and folder
5. Save and wait for deployment

### Option 3: Traditional Web Hosting

1. Get web hosting (e.g., Hostinger, Bluehost, GoDaddy)
2. Upload all files from the `public` folder via FTP
3. Upload the `src` folder as well
4. Configure domain settings
5. Your site is live!

### Important: Update URLs in sitemap.xml

After deployment, update the URLs in `public/sitemap.xml`:
- Replace `https://www.akinnovative.com` with your actual domain

---

## 🧪 Testing the Website

### Local Testing

1. Open `public/index.html` in a web browser
2. Test all navigation links
3. Test the contact form (after Google Sheets setup)
4. Check responsive design (use browser DevTools)
5. Test on different browsers (Chrome, Firefox, Safari, Edge)

### Performance Testing

1. Use [Google PageSpeed Insights](https://pagespeed.web.dev/)
2. Use [GTmetrix](https://gtmetrix.com/)
3. Target: 90+ performance score

### SEO Testing

1. Use [Google Search Console](https://search.google.com/search-console)
2. Submit your sitemap
3. Check for indexing issues

---

## 📝 Customization Notes

### Updating Company Information

- Contact details: Edit in all HTML files (footer section)
- Business hours: Edit in `contact.html`
- Email address: Update in Google Apps Script and HTML files

### Adding More Machinery

1. Generate/add machinery images to `src/assets/images/machinery/`
2. Edit `capabilities.html`
3. Add new machinery cards following the existing pattern

### Changing Colors

1. Edit CSS custom properties in `src/css/main.css`
2. Update the `:root` section with your preferred colors

---

## 🆘 Troubleshooting

### Contact Form Not Working

1. Check browser console for errors
2. Verify Google Apps Script URL is correct
3. Ensure Google Apps Script is deployed with "Anyone" access
4. Check Google Sheet permissions

### Images Not Loading

1. Verify image paths are correct
2. Check file extensions match (case-sensitive)
3. Ensure images are in the correct folders

### Mobile Menu Not Working

1. Check browser console for JavaScript errors
2. Verify `main.js` is loaded correctly
3. Clear browser cache

---

## 📞 Support

For technical issues or questions:
- Email: thebadhe3p@gmail.com
- Phone: +91 9588622951

---

**Last Updated**: January 2026
