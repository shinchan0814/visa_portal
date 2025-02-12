// utils/hash.js
export async function hashData(data) {
    if (!data) return null; // Handle empty values
  
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data.toLowerCase().trim()); // Normalize
    const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
    
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  