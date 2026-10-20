# Lifedrop Blood Donation

Create a new pBuild a modern, professional, responsive Blood Donation Web Application frontend called "LifeDrop".

## Project Goal
LifeDrop is a community-driven blood donation platform that connects blood donors with people who urgently need blood. The platform should feel trustworthy, compassionate, modern, accessible, and easy to use.

For this phase, focus ONLY on frontend UI/UX. Do not implement a backend, database, real authentication, or external API integrations.

## 1. Design Direction
Create a premium healthcare-tech interface with:
- Primary color: deep red (#D62839)
- Secondary color: dark burgundy (#8B1525)
- Background: white (#FFFFFF) and soft gray (#F8FAFC)
- Text: dark navy (#172033)
- Success states: accessible green
- Emergency states: accessible red with clear labels

Use a modern sans-serif font such as Inter, generous whitespace, rounded cards, subtle shadows, clean borders, consistent spacing, and high-quality relevant imagery.

Avoid excessive gradients, excessive animations, cluttered layouts, and generic template styling.

## 2. Global Navigation
Create a responsive navbar with:
- LifeDrop logo and a simple blood-drop symbol
- Home
- Find Donors
- Blood Requests
- Donate Blood
- News
- Login
- A prominent "Request Blood" CTA button

On mobile, use a functional hamburger menu.

## 3. Landing Page Hero
Create a visually engaging hero section with:
- Headline: "Every Drop Can Save a Life"
- Supporting text explaining how LifeDrop connects donors with people in need
- Primary CTA: "Request Blood"
- Secondary CTA: "Become a Donor"
- A relevant, tasteful blood donation/healthcare image or illustration
- A small trust indicator such as "Connecting communities through blood donation"

## 4. Statistics Section
Create four statistic cards:
- Registered Donors
- Blood Requests Fulfilled
- Active Blood Requests
- Lives Impacted

Use clearly labeled demo numbers and make it possible to replace them with real data later. Do not present demo statistics as verified real-world facts.

## 5. How It Works
Create three simple steps:
1. Find a Donor
2. Request or Donate Blood
3. Help Save a Life

Use icons, short descriptions, and clear visual hierarchy.

## 6. Urgent Blood Requests Preview
Create a section displaying three sample blood request cards.

Each card should include:
- Blood group
- Required units
- Hospital name
- City/location
- Required date
- Urgency label
- View Details button

Use fictional sample data and clearly structure the cards so they can later receive data from an API.

Add a "View All Requests" button.

## 7. Become a Donor Section
Create a compelling section encouraging users to register as donors, with a short description, benefits, and a "Register as Donor" CTA.

## 8. News and Awareness Preview
Display three editorial cards with:
- Image
- Category
- Article title
- Short excerpt
- Publication date
- Read More link

Use placeholder content, not fabricated medical claims.

## 9. Trust and Safety Section
Highlight:
- Community-driven donations
- Privacy-conscious donor discovery
- Report suspicious requests
- Responsible donation practices

Do not claim that users or requests are verified unless verification actually exists.

## 10. Footer
Include:
- Logo and short mission statement
- Quick navigation
- Donation resources
- Contact placeholder
- Privacy Policy
- Terms of Service
- Social media placeholders
- Copyright

## 11. Functional Frontend Requirements
- All navigation links should lead to the appropriate page or clearly defined placeholder route.
- CTA buttons must have meaningful actions.
- Use reusable components for navbar, footer, cards, badges, and buttons.
- Add hover, focus, loading, empty, and error states where relevant.
- Use accessible labels, semantic HTML, keyboard navigation, and sufficient color contrast.
- Ensure responsive layouts for mobile, tablet, and desktop.
- Use realistic but fictional sample content.
- Keep the design consistent across all sections.

## 12. Technical Constraints
Use the existing default frontend stack supported by Lovable, preferably React, TypeScript, and Tailwind CSS.
Organize the UI into reusable components.
Do not connect Supabase or any backend yet.
Do not implement real login, registration, donor matching, or blood request submission.
Keep the project easy to extend with future pages and API integration.

Start by building the complete landing page and its reusable design system. Prioritize visual quality, usability, consistency, and responsive behavior.roject with Cloud enabled.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://lifedrop-blood-donation.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/49878810-2e13-49f6-8abb-89c7fcb9e58c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
