# Auth.js Sign-In Feature

## Overview
This implementation adds a sign-in feature with a popup menu to the website's top-right corner.

## Features
- **Sign In Button**: Located in the top-right of the header
- **User Display**: Shows username when signed in
- **Popup Modal**: Clean, centered modal form for signing in
- **Sign Out**: Dropdown menu to sign out when user is authenticated
- **Demo Credentials**: 
  - Email: `demo@example.com`, Password: `demo`
  - Email: `test@example.com`, Password: `test`

## Components
- `UserAuthMenu.tsx`: Main authentication UI component with:
  - Sign-in button and modal form
  - User menu with sign-out option
  - Form validation
  - Error handling

## Implementation Details
- **Client-side authentication**: Simple demo implementation with hardcoded credentials
- **Mantine UI**: Uses Mantine components (Button, Modal, Menu, TextInput, PasswordInput)
- **Translations**: Full Czech language support
- **Icons**: Uses lucide-react for LogIn and LogOut icons

## How It Works
1. User clicks "Přihlášení" (Sign In) button in the top-right
2. Modal opens with email and password fields
3. User enters credentials (demo@example.com / demo)
4. On successful login, button shows username and becomes a menu
5. Menu contains user email and "Odhlášení" (Sign Out) option
6. Clicking sign out clears the user session

## Future Enhancements
- Integrate with Auth.js backend (auth.ts, auth.config.ts already prepared)
- Add OAuth providers (Google, GitHub)
- Persist authentication in database
- Add user registration
- Implement password hashing and secure session management
