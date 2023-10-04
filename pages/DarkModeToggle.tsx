// // DarkModeToggle.tsx
// import { useEffect } from 'react';

// const DarkModeToggle = () => {
//   useEffect(() => {
//     // On page load or when changing themes, best to add inline in `head` to avoid FOUC
//     if (
//       localStorage.getItem('color-theme') === 'dark' ||
//       (!('color-theme' in localStorage) &&
//         window.matchMedia('(prefers-color-scheme: dark)').matches)
//     ) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   const toggleTheme = () => {
//     const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
//     const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

//     // Toggle icons inside the button
//     themeToggleDarkIcon?.classList.toggle('hidden');
//     themeToggleLightIcon?.classList.toggle('hidden');

//     // Toggle the dark mode class on the root HTML element
//     document.documentElement.classList.toggle('dark');

//     // Toggle the theme in local storage
//     const currentTheme = document.documentElement.classList.contains('dark')
//       ? 'dark'
//       : 'light';
//     localStorage.setItem('color-theme', currentTheme);
//   };

//   return (
//     <button
//       id="theme-toggle"
//       type="button"
//       className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
//       onClick={toggleTheme}
//     >
//       {/* Add your SVG icons here */}
//     </button>
//   );
// };

// export default DarkModeToggle;

