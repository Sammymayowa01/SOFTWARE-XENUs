/**
 * API Service for Software Xenus
 * Ensures robust data fetching with proper error boundaries
 */

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000/api').replace(/\/$/, '');

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    // Attempt to parse error JSON, fallback to status text
    const errorData = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const fetchPlans = async () => {
  try {
    const res = await fetch(`${API_URL}/plans`, {
      cache: 'no-store', // Ensure fresh data for pricing
    });
    const data = await handleResponse(res);
    // Normalize response: ensure it returns an array
    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    return [];
  } catch (error) {
    console.error('[API] fetchPlans failed:', error);
    return []; // Return safe fallback structure
  }
};

export const submitContact = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error('[API] submitContact failed:', error);
    throw error;
  }
};

export const initiatePayment = async (data: { email: string; planTitle: string }) => {
  try {
    const res = await fetch(`${API_URL}/payment/initiate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error('[API] initiatePayment failed:', error);
    throw error;
  }
};

export const sendMessage = async (data: any) => {
  try {
    const res = await fetch(`${API_URL}/chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await handleResponse(res);
  } catch (error) {
    console.error('[API] sendMessage failed:', error);
    throw error;
  }
};
