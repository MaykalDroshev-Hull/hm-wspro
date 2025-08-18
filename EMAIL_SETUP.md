# Email Setup Guide

## Prerequisites
1. Gmail account
2. 2-Step Verification enabled on your Gmail account

## Setup Steps

### 1. Generate App Password
1. Go to [Google Account settings](https://myaccount.google.com/)
2. Navigate to Security > 2-Step Verification
3. Scroll down and click on "App passwords"
4. Select "Mail" as the app and "Other" as the device
5. Click "Generate"
6. Copy the generated 16-character password

### 2. Environment Variables
Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_EMAIL=your-gmail@gmail.com
NEXT_PUBLIC_EMAIL_PASS=your-16-character-app-password
```

### 3. Important Notes
- Never commit `.env.local` to version control
- Use the App Password, not your regular Gmail password
- The App Password is 16 characters long
- Make sure 2-Step Verification is enabled on your Gmail account

### 4. Testing
After setup, the contact form will:
- Send form details to hm.websiteprovisioning@gmail.com (in Bulgarian)
- Send confirmation email to the requestor (in their locale language)
- Show green success toast with 5-second timer
- Show error toast if something goes wrong

## Troubleshooting
- If emails aren't sending, check your App Password
- Ensure your Gmail account allows "less secure app access" or use App Passwords
- Check the console for any error messages
