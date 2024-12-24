// src/screens/Layout/index.jsx
import '../../style/globals.css';

export default function RootLayout({ children }) {
  // Update document title programmatically
  document.title = 'Code On - Online Coding Platform';
  
  // Update meta description programmatically
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Code, collaborate and create on a single platform');
  }

  return (
    <div className="min-h-screen font-inter antialiased">
      {children}
    </div>
  );
}