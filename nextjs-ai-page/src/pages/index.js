/**
 * Index page with links to other pages
 */

import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      padding: '2rem'
    }}>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'flex-start'
      }}>
        <Link href="/systemprompt" style={{
          color: '#007bff',
          textDecoration: 'underline',
          fontSize: '0.9rem'
        }}>
          System Prompt Examples
        </Link>
        
        <Link href="/simplerag" style={{
          color: '#007bff',
          textDecoration: 'underline',
          fontSize: '0.9rem'
        }}>
          Simple RAG Chat
        </Link>
      </div>
    </div>
  );
}