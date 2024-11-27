
export const logout = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_PROTOCOL}://${process.env.NEXT_PUBLIC_BASE_URL}/disconnect`);

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Failed to logout:', error);
    return {success: false};
  }
};