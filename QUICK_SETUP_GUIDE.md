# Quick Setup Guide - Google Sheets Integration

## ⚡ Fast Track Setup (10 minutes)

### Step 1: Create Google Sheet (2 minutes)

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank** to create new spreadsheet
3. Name it: **AK Innovative - Contact Forms**
4. In Row 1, add these headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Company`
   - D1: `Phone`
   - E1: `Email`
   - F1: `Message`

### Step 2: Add Google Apps Script (3 minutes)

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.company,
      data.phone,
      data.email,
      data.message
    ]);
    
    // Send email notification
    MailApp.sendEmail({
      to: "thebadhe3p@gmail.com",
      subject: "New Contact Form - AK INNOVATIVE ENTERPRISES",
      body: "New submission:\n\n" +
            "Name: " + data.name + "\n" +
            "Company: " + data.company + "\n" +
            "Phone: " + data.phone + "\n" +
            "Email: " + data.email + "\n" +
            "Message: " + data.message + "\n\n" +
            "Time: " + data.timestamp
    });
    
    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name it: **Contact Form Handler**

### Step 3: Deploy Script (3 minutes)

1. Click **Deploy** → **New deployment**
2. Click ⚙️ gear icon → Select **Web app**
3. Settings:
   - **Description**: Contact Form API
   - **Execute as**: Me
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. **COPY THE WEB APP URL** (looks like: `https://script.google.com/macros/s/...`)
6. Click **Done**

### Step 4: Update Website Code (2 minutes)

1. Open: `src/js/main.js`
2. Find line 199: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';`
3. Replace with your URL: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_URL';`
4. **UNCOMMENT** lines 216-227 (remove the `/*` and `*/`)
5. **COMMENT OUT** or delete lines 204-211 (the placeholder code)
6. Save the file

### Step 5: Test (2 minutes)

1. Open `public/index.html` in browser
2. Go to Contact page
3. Fill and submit form
4. Check:
   - ✅ Google Sheet has new row
   - ✅ Email received at thebadhe3p@gmail.com
   - ✅ Success message on website

---

## 🔧 Troubleshooting

**Error: "Authorization required"**
- Go back to Apps Script
- Click **Run** → Select `doPost`
- Authorize the app
- Redeploy

**Form submits but no data appears**
- Check the Web App URL is correct
- Make sure deployment is set to "Anyone"
- Check browser console for errors (F12)

**No email received**
- Check spam folder
- Verify email address in script is correct: `thebadhe3p@gmail.com`

---

## ✅ You're Done!

Your contact form now:
- ✅ Saves to Google Sheets
- ✅ Sends email to thebadhe3p@gmail.com
- ✅ Shows success message to visitors

**Export to Excel:** File → Download → Microsoft Excel (.xlsx)
