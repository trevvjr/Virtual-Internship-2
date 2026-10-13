Summarist | Book Summary Web Application
Summarist is a responsive book-summary web application built with Next.js, React, TypeScript, and Tailwind CSS. Users can discover and search for books, save titles to a personal library, and read or listen to book summaries. The application integrates Firebase Authentication for Google sign-in, Stripe Checkout for subscription payments, and external book APIs for dynamic content.
I developed interactive reading and audio controls, authentication and guest-access flows, premium-content routing, skeleton loading states, and responsive layouts for mobile and desktop devices.


Technologies Used
- Frontend: Next.js, React, TypeScript, Tailwind CSS
- Authentication: Firebase Authentication (Google sign-in)
- Payments: Stripe (subscription checkout integration)
- Data: External book APIs, asynchronous data fetching, book search, saved-book functionality
- Deployment: Vercel

  
Features I Implemented
Landing Page & Interactive Design
- Built an introductory landing page with benefit-focused sections: Enhance Your Knowledge, Achieve Greater Success, Improve Your Health, Develop Better Parenting Skills, Increase Happiness, and Be the Best Version of Yourself.
- Connected homepage login buttons to a custom login interface.
- Added smooth button hover color transitions, interactive cursor styling, and consistent Tailwind CSS styling.
- Designed an experience that adapts to mobile devices and desktop screens.

Authentication & Account Access
- Integrated Google sign-in through Firebase Authentication.
- Built a custom login interface with Continue as Guest and Continue with Google options.
- Added links to separate Create Account and Forgot Password screens, including an email-entry form for password recovery.
- Implemented a logout button.
- Displayed an animated loading spinner during guest access and Google sign-in, providing feedback until the operation completes or navigation proceeds to For You.

Book Discovery, Search & Details
- Integrated external APIs to retrieve book information dynamically.
- Added a search bar for finding books.
- Created a For You page with recommended and suggested books.
- Built individual book-detail pages connected to the reading experience.
- Added skeleton loading placeholders while book data loads.

  
Saved Books & Library
- Implemented a save-book feature so users can keep books they want to revisit.
- Created a dedicated My Library page to access saved titles.
- Connected saved-book data to the library experience.

Reader Customization & Audio Player
- Built a dedicated page for reading book summaries.
- Added font customization so readers can change the text appearance.
- Implemented audio playback with play, rewind, and forward controls.
- Added a bottom playback bar with a visual progress indicator showing the current position and remaining duration.

Premium Subscriptions & Stripe
- Integrated Stripe into the subscription checkout flow.
- Restricted premium books behind subscription access.
- Routed users attempting to access premium content to the Choose Plan page.
- Created a plan-selection experience that connects to Stripe Checkout.
  
Navigation & Responsive UI
- Built navigation to For You, My Library, and Settings.
- Added a left-side active-page indicator that highlights the currently selected route.
- Applied hover transitions and cursor-pointer feedback to interactive elements.
- Optimized the layout and navigation for both desktop and mobile devices.


My Contribution
I developed Summarist's user-facing features and integrated its primary third-party services. My work includes Firebase Google authentication, guest access, account-related forms, logout, book API integration, search, saved-book functionality, the reader and audio player, and Stripe subscription checkout.
I also implemented the premium-book access flow, responsive layouts, animated loading spinners, skeleton placeholders, active-route styling, hover animations, and customizable reading fonts. These features helped me connect multiple parts of an application into a cohesive experience—from arriving on the homepage to discovering, saving, reading, and listening to books.


Challenges & What I Learned
- API integration: Practiced asynchronous data fetching and presenting dynamic book information in searchable, navigable interfaces.
- Authentication flows: Learned how to connect Google sign-in, guest access, registration and password-recovery interfaces, and logout into a coherent user experience.
- Subscription workflows: Gained experience with premium-access navigation, plan selection, and Stripe's hosted checkout flow.
- Shared book data: Strengthened my understanding of user-selected content and making saved books accessible through a dedicated library.
- Media controls: Built playback interactions and a progress display for book audio while supporting font customization for reading.
- Loading feedback: Used skeleton placeholders for book data and a spinner for authentication to communicate asynchronous progress.
- Responsive design: Improved the layout, navigation, and interactive states for both mobile and desktop users.
  
Responsive Design
Summarist uses Tailwind CSS to adapt its interface across desktop and mobile devices. Responsive work includes the homepage, book browsing layouts, navigation, reader, and interactive buttons. I also used active-page styling, hover feedback, and loading states to make the interface easier to understand and use.

Future Improvements
- Add advanced book-search filtering and sorting.
- Expand audio player settings, such as playback-speed options.
- Add reading-progress history and bookmarks.
- Introduce more ways to organize saved books.
- Add automated tests for authentication, premium access, payments, and book interactions.
- Continue improving accessibility, performance, and mobile usability.


About Me
I'm Trevan Davis Jr., an aspiring software developer pursuing an Associate degree in Information Technology at Florida State College at Jacksonville. Much of my hands-on development experience comes from the Frontend Simplified Bootcamp, where I've worked on responsive interfaces, React applications, APIs, and interactive web projects.
I enjoy building user-friendly applications, solving technical problems, and expanding my skills as a developer.
