export function useCookies() {
  const getAccessToken = () => {
    return document.cookie.split(";").find((cookie) => cookie.includes("access_token"));
  };

  return { getAccessToken };
}
