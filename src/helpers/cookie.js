export function getCookie(name) {
    // eslint-disable-next-line no-useless-escape
    const matches = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`));
  
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  
  export function setCookie(cookies) {
    Object.keys(cookies).forEach(key => {
      document.cookie = `${key}=${cookies[key]};path=/`;
    });
  }